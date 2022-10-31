const contacts = require('./contacts')

const { Command } = require('commander');
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      console.table(contactList)
      break;

    case "get":
      const getContactById = await contacts.getContactById(id);
      if (!getContactById) {
        throw new Error(`Contact with id:${id} not founded `)
      }
      console.table(getContactById);
      break;

    case "add":
      const newContact = await contacts.addContact(name,email,phone);
      console.log(`contact with name: ${name} email: ${email} phone: ${phone} successfully added`);
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id, name);
      console.log(`contact with ${removedContact.name} are deleted`);
      console.table(removedContact);

      
      break;

    default:
      console.warn("\x1B[31m Unknown action type");
  }
}

invokeAction(argv);
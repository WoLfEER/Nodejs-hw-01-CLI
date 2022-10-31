const path = require("path");
const fs = require("fs/promises");

const { v4: uuidv4 } = require("uuid");
// uuidv4();

const contactsPath = path.resolve("db/contacts.json");
const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const getContact = contacts.find((item) => item.id === contactId);
  return getContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return contacts;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id)
  if (index === -1) {
    return null
  }
contacts[index] = {id, ...data}
updateContacts(contacts)
return contacts[index]
}

module.exports = {
  addContact,
  removeContact,
  listContacts,
  getContactById,
  // updateById
};

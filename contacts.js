const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (id) => {
    const contactId = String(id);
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === contactId);
    return contact ? contact : null;
}

const removeContact = async (id) => {
    const contactId = String(id);
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId);
    const deletedContact = allContacts[index];

    if (index !== -1) {
        allContacts.splice(index, 1);
        
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    }
    return deletedContact ? deletedContact : null;
}

const addContact = async (name, email, phone) => {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone
    };
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
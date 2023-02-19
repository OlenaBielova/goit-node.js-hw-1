
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const contactsOperations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "listContacts":
            const contacts = await contactsOperations.listContacts();
            console.log('listContacts', contacts);
            break;
        case "getContactById":
            const contact = await contactsOperations.getContactById(id);
            console.log('getById', contact);
            break;
        case "addContact":
            await contactsOperations.addContact(name, email, phone);
            console.log();
            break;
        case "removeContact":
            await contactsOperations.removeContact(id);
            console.log('removeContact');
            break;
        default:
            console.log("Unknown action");
    }
}
// invokeAction({action: "listContacts"});
// invokeAction({ action: "getContactById", id: "1" });
// invokeAction({ action: "addContact", name: "Paul", email: "paul@nmail.com", phone: "009-33-44"})
// invokeAction({action:"removeContact", id: "2"});
    
const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);
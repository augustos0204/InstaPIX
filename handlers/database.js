const db = require("quick.db");
const tblAccounts = new db.table("accounts");

module.exports = {
    tblAccounts
}
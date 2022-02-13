const tblAccounts = require('../handlers/database').tblAccounts;

module.exports = {
    start: (clientSwitch, Instagram, spinnies) => {
        let failures = 0;
        spinnies.update('main', {text: "CARREGANDO CONTAS: 0/0"});
        if(!tblAccounts.has('users')) {
            tblAccounts.set('users', []);
            tblAccounts.set('passwords', []);
        } else {
            const users = tblAccounts.get('users');
            const passwords = tblAccounts.get('passwords');

            users.forEach(async (user, index) => {
                const client = new Instagram({username: user, password: passwords[index]});
                
            });
        }
    }
}
const tblAccounts = require('../handlers/database').tblAccounts;

const execute = (clientSwitch, args, Instagram, spinnies) => {
    try {
        if(args.length < 2) return spinnies.fail('command', {text: "PARÂMETROS INVÁLIDOS", failColor: "redBright"});
        const client = new Instagram({username: args[0], password: args[1]});
        client.login().then(() => {
            client.getProfile().then((profile) => {
                if(profile === undefined) return spinnies.fail('command', {text: "NÃO FOI POSSÍVEL SE CONECTAR", failColor: "redBright"});
                const users = tblAccounts.get('users');
                if(users.indexOf(args[0]) == -1){
                    tblAccounts.push('users', args[0]);
                    tblAccounts.push('passwords', args[1]);
                    clientSwitch.add(client);
                }
                return spinnies.succeed('command', {text: `LOGADO EM: ${profile.username} ${profile.is_email_confirmed?"✉️":""} ${profile.is_phone_confirmed?"📞":""}`, succeedColor: "greenBright"});
            });
        }).catch(() => {
            return spinnies.fail('command', {text: "NÃO FOI POSSÍVEL SE CONECTAR", failColor: "redBright"});
        });
    } catch (error) {
        return spinnies.fail('command', {text: "IMPOSSÍVEL REALIZAR UM LOGIN", failColor: "redBright"});
    }
}

module.exports = {
    name: 'login',
    help: 'login [username] [password]',
    execute
}
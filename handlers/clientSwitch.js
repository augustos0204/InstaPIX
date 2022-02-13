const clientSwitch = [];

module.exports = {
    add: (client) => {
        clientSwitch.push(client);
        return true;
    },
    get: (index) => {
        return clientSwitch[index]
    }
}
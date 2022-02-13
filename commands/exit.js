const execute = (clientSwitch, args, Instagram, spinnies, rl) => {
    rl.close();
    spinnies.succeed('command', {text: "SUCESSS STOPED", succeedColor: "greenBright"});
    process.exit();
}

module.exports = {
    name: "exit",
    help: "exit the application",
    execute
}
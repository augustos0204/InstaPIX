const Instagram = require('instagram-web-api');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const clientSwitch = require('./handlers/clientSwitch');
const figlet = require('figlet');
const Spinnies = require('spinnies');
const start = require('./events/start').start;

const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt: 'IG> '});
const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(filename => filename.endsWith(".js"));
const spinner = {interval: 80, frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']}
const spinnies = new Spinnies({ color: 'red', succeedColor: 'red', spinner});

figlet('InstaPIX', (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.clear();
    const risk = "----------------------------------------";
    console.log(risk);
    console.log(data);
    console.log(risk);
    spinnies.add('main', { text: 'INICIALIZANDO O INSTAPIX...', spinnerColor: 'yellow', color: 'yellow'});

    start(clientSwitch, Instagram, spinnies);

    let counter = 0

    for(let filename of commandFiles){
        const command = require(`./commands/${filename}`);
        commands[command.name] = command;
        counter++
        spinnies.update('main', {text: `CARREGANDO COMANDOS [${counter}/${commandFiles.length}]`});
    }
    spinnies.succeed('main', {text: "INSTAPIX ONLINE", succeedColor: "greenBright"});

    rl.on('line', (input) => {
        rl.pause();
        spinnies.add('command', {text: "EXECUTANDO O COMANDO", color: "orange"});
        const args = input.split(' ');
        const command = args.shift();
        process.stdout.write('\033[1A');
        try {
            commands[command].execute(clientSwitch, args, Instagram, spinnies, rl);
        } catch (error) {
            spinnies.fail('command', {text: "COMANDO INDEFINIDO", failColor: "redBright"});
        }
        rl.resume();
    });
});

import tmi from 'tmi.js';
import {
  OAUTH_PASSWORD,
	ADMIN_USERNAME,
	FORTNITE_ID,
	DISCORD_LINK
} from '../../config';

const client = new tmi.Client({
	connection: {
		reconnect: true,
		secure: true
	},
  identity: {
    username: ADMIN_USERNAME,
    password: OAUTH_PASSWORD
  },
	channels: [ ADMIN_USERNAME ]
});

client.connect().catch(console.error);

const say = (message) => {
  client.say(ADMIN_USERNAME, message);
}

export const triggerCommand = (commandx) => {
  const { command } = commandx;
  switch(command) {
    case '!discord':
      say(`Discord link: ${DISCORD_LINK}`);
      break;
    case '!id':
      say(`Fortnite ID: ${FORTNITE_ID}`);
      break;
    case '!setup':
      say(`
      Grafica: RTX 2081 SUPER 
      Memoria: 32GB RAM 
      Procesador: AMD Ryzen 7 3700X 
      Monitor: AOC Q27G2G4 144hz 
      Mouse: HyperX hx-mc002b 
      Camara: Sony A7II 
      Luz: Aputure AL-MX 
      `);
      break;
    case '!region':
      say('WEST / OESTE');
      break;
    default:
  }
}

export const parseCommand = (message) => {
  const PREFIX = "!";
  let [command, ...args] = message.slice(PREFIX.length).split(/ +/g);
  return {
    command,
    args
  }
}

export default client;
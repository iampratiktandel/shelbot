/* eslint-disable brace-style */
const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const { prefix } = require('./config.json');
const client = new Discord.Client();
let bScore = 0, uScore = 0;

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		message.channel.send(`
		Rock | Paper | Scissors | Lizard | Spock
		Scissors cuts Paper
		Paper covers Rock
		Rock crushes Lizard
		Lizard poisons Spock
		Spock smashes Scissors
		Scissors decapitates Lizard
		Lizard eats Paper
		Paper disproves Spock
		Spock vaporizes Rock
		Rock crushes Scissors`);
	}

	if (command === 'rps') {
		const acceptedReplies = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
		const random = Math.floor((Math.random() * acceptedReplies.length));
		const botReply = acceptedReplies[random];

		const userReply = args[0];
		if (!userReply) return message.channel.send(`How to play: \`${prefix}rps <rock|paper|scissors|lizard|spock>\``);
		if (!acceptedReplies.includes(userReply)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);

		// console.log('User Reply:', userReply);
		// console.log('Bot Reply:', botReply);

		if (botReply === userReply) return message.reply('It\'s a tie!');

		if (userReply === 'rock') {
			if (botReply === 'paper') {
				message.reply('\n Bot covered your rock with paper\n Bot won!');
				bScore += 1;
			} else if (botReply === 'spock') {
				message.reply('\n Bot\'s spock vaporised your rock\n Bot won!');
				bScore += 1;
			} else if (botReply === 'scissors') {
				message.reply('\n You crushed Bot\'s scissors with rock\n You won!');
				uScore += 1;
			} else {
				message.reply('\n You crushed Bot\'s lizard with rock\n You won!');
				uScore += 1;
			}
		}
		else if (userReply === 'paper') {
			if (botReply === 'scissors') {
				message.reply('\n Bot cut your paper with scissors\n Bot won!');
				bScore += 1;
			} else if (botReply === 'lizard') {
				message.reply('\n Bot\'s lizard ate your paper\n Bot won!');
				bScore += 1;
			} else if (botReply === 'rock') {
				message.reply('\n You covered Bot\'s rock with paper\n You won!');
				uScore += 1;
			} else {
				message.reply('\n Your paper disproved Bot\'s spock\n You won!');
				uScore += 1;
			}
		}
		else if (userReply === 'scissors') {
			if (botReply === 'rock') {
				message.reply('\n Bot crushed your scissors with rock\n Bot won!');
				bScore += 1;
			} else if (botReply === 'spock') {
				message.reply('\n Bot\'s spock smashed your scissors\n Bot won!');
				bScore += 1;
			} else if (botReply === 'paper') {
				message.reply('\n You cut Bot\'s paper with scissors\n You won!');
				uScore += 1;
			} else {
				message.reply('\n You decapitated Bot\'s lizard with scissors\n You won!');
				uScore += 1;
			}
		}
		else if (userReply === 'lizard') {
			if (botReply === 'rock') {
				message.reply('\n Bot crushed your lizard with rock\n Bot won!');
				bScore += 1;
			} else if (botReply === 'scissors') {
				message.reply('\n Bot decapitated your lizard with scissors\n Bot won!');
				bScore += 1;
			} else if (botReply === 'paper') {
				message.reply('\n Your lizard ate Bot\'s paper\n You won!');
				uScore += 1;
			} else {
				message.reply('\n Your lizard poisoned Bot\'s spock\n You won!');
				uScore += 1;
			}
		}
		else if (userReply === 'spock') {
			if (botReply === 'paper') {
				message.reply('\n Bot\'s paper disproved your spock\n Bot won!');
				bScore += 1;
			} else if (botReply === 'lizard') {
				message.reply('\n Bot\'s lizard poisoned your spock\n Bot won!');
				bScore += 1;
			} else if (botReply === 'rock') {
				message.reply('\n Your spock vaporised Bot\'s rock\n You won!');
				uScore += 1;
			} else {
				message.reply('\n Your spock smashed Bot\'s scissors\n You won!');
				uScore += 1;
			}
		}
		else {
			message.reply(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
		}

		message.channel.send(`------SCORECARD------\n  Bot: ${bScore}\n  User: ${uScore}\n---------------------------`);
		if (bScore == 5) {
			message.reply('Bot won the match');
			bScore = 0;
			uScore = 0;
		} else if (uScore == 5) {
			message.reply('You won the match');
			bScore = 0;
			uScore = 0;
		}
	}
});

client.on('ready', () => console.log('Logged In'));

const tryLogin = () => {
	console.log('Login failed. Trying again');
	setTimeout(() => client.login(token).catch(tryLogin), 1000);
};

client.login(token).catch(tryLogin);
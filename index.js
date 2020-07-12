/* eslint-disable brace-style */
const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const { prefix } = require('./config.json');
const client = new Discord.Client();

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

		switch (userReply) {
		case 'rock': {
			if (botReply === 'paper' || botReply === 'spock') return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n Bot won!`);
			else return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n You won!`);
		}
		case 'paper': {
			if (botReply === 'scissors' || botReply === 'lizard') return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n Bot won!`);
			else return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n You won!`);
		}
		case 'scissors': {
			if (botReply === 'rock' || botReply === 'spock') return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n Bot won!`);
			else return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n You won!`);
		}
		case 'lizard': {
			if (botReply === 'rock' || botReply === 'scissors') return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n Bot won!`);
			else return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n You won!`);
		}
		case 'spock': {
			if (botReply === 'lizard' || botReply === 'paper') return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n Bot won!`);
			else return message.reply(`\n Your Choice : ${userReply}\n Bot's Choice : ${botReply}\n You won!`);
		}
		default: {
			return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
		}
		}
	}
});

client.on('ready', () => console.log('Logged In'));

const tryLogin = () => {
	console.log('Login failed. Trying again');
	setTimeout(() => client.login(token).catch(tryLogin), 1000);
};

client.login(token).catch(tryLogin);
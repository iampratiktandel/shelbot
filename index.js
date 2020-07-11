/* eslint-disable brace-style */
const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const { prefix } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'rps') {
		const acceptedReplies = ['rock', 'paper', 'scissors'];
		const random = Math.floor((Math.random() * acceptedReplies.length));
		const botReply = acceptedReplies[random];

		const userReply = args[0];
		if (!userReply) return message.channel.send(`How to play: \`${prefix}rps <rock|paper|scissors>\``);
		if (!acceptedReplies.includes(userReply)) return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);

		console.log('User Reply:', userReply);
		console.log('Bot Reply:', botReply);

		if (botReply === userReply) return message.reply('It\'s a tie! We had the same choice.');

		switch (userReply) {
		case 'rock': {
			if (botReply === 'paper') return message.reply('I won!');
			else return message.reply('You won!');
		}
		case 'paper': {
			if (botReply === 'scissors') return message.reply('I won!');
			else return message.reply('You won!');
		}
		case 'scissors': {
			if (botReply === 'rock') return message.reply('I won!');
			else return message.reply('You won!');
		}
		default: {
			return message.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
		}
		}
	}
});

client.login(token);
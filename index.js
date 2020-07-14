/* eslint-disable brace-style */
const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const { prefix } = require('./config.json');
const client = new Discord.Client();
let bScore = 0, uScore = 0;

const rules = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('How to play')
	.setAuthor('Rock Paper Scissors Lizard Spock',
		'https://github.com/iampratiktandel/rock-paper-scissor-bot/blob/master/logo/shelbot-logo.png?raw=true',
		'https://github.com/iampratiktandel/rock-paper-scissor-bot')
	.setDescription('Player can type any choice from [rock, paper, scissors, lizard, spock]. The bot will generate a random choice. Player and Bot\'s choice will be compared and the one with the advantage will win the round. More info about the choices are displayed below.\nThe first one to scores 3 points will win the match.')
	.setThumbnail('https://github.com/iampratiktandel/rock-paper-scissor-bot/blob/master/logo/shelbot-logo.png?raw=true')
	.addFields(
		{ name: 'Command', value: `${prefix}rps [choice]\nExample: !rps rock\n\nAvailable Choices : rock, paper, scissors, lizard, spock\n` },
		{ name: 'Game Rules', value:
		'>> Scissors cuts Paper\n>> Paper covers Rock\n>> Rock crushes Lizard\n>> Lizard poisons Spock\n>> Spock smashes Scissors \n>> Scissors decapitates Lizard\n>> Lizard eats Paper\n>> Paper disproves Spock\n>> Spock vaporizes Rock\n>> Rock crushes Scissors' },
	)
	.setTimestamp()
	.setFooter('Shelbot Guide');

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

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

		const scores = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Scorecard')
			.setThumbnail('https://github.com/iampratiktandel/rock-paper-scissor-bot/blob/master/logo/shelbot-logo.png?raw=true')
			.addFields(
				{ name: 'Bot', value: `${bScore}`, inline: true },
				{ name: 'User', value: `${uScore}`, inline: true },
			)
			.setTimestamp()
			.setFooter('Game Score');

		message.channel.send({ embed: scores });
		if (bScore == 3) {
			message.reply('Bot won the match');
			bScore = 0;
			uScore = 0;
		} else if (uScore == 3) {
			message.reply('You won the match');
			bScore = 0;
			uScore = 0;
		}
	}

	if (command === 'shelbot-help') {
		message.channel.send({ embed: rules });
	}
});

client.on('ready', () => console.log('Logged In'));

const tryLogin = () => {
	console.log('Login failed. Trying again');
	setTimeout(() => client.login(token).catch(tryLogin), 1000);
};

client.login(token).catch(tryLogin);
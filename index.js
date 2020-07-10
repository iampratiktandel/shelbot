const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);
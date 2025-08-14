require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    if (message.content === '!ping') {
        message.reply('🏓 Pong!');
    }
});

client.on('messageCreate', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    if (message.content === '!chloe') {
        message.reply('is a minge licker and a large slag (also an alcoholic)');
    }
});

client.on('messageCreate', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    if (message.content === '!diva') {
        message.reply('## na na na diva is a diva ');

    }
});

client.on('messageCreate', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    if (message.content === '!test') {
        message.reply('## na na na diva is a diva ');

    }
});
client.on('messageCreate', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    if (message.content === '!test') {
        message.reply('Heyyy ${message.author.username thank you for testing me bro. 💪👊}!');

    }
});

client.login(process.env.DISCORD_TOKEN);

require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 1. Define a slash command
const commands = [
    new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with a greeting!')
].map(cmd => cmd.toJSON());

// 2. Register the slash command globally
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Registering commands...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log('Commands registered ✅');
    } catch (err) {
        console.error(err);
    }
})();

// 3. Handle the command interaction
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply(`Hello, ${interaction.user.username}! 👋`);
    }
});

client.login(TOKEN);

require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// Create client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register global slash command
const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('⏳ Registering global commands...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
        console.log('✅ Global commands registered.');
    } catch (error) {
        console.error(error);
    }
})();

// Handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'accept') {
        await interaction.reply('Pong! 🏓');
    }
});


const command = new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot repeat a message')
    .addStringOption(option =>
        option.setName('message')
              .setDescription('The message to repeat')
              .setRequired(true)
    )
    .addUserOption(option =>
        option.setName('user')
              .setDescription('This has no use')
              .setRequired(true)
    );



// Log in
client.login(TOKEN);

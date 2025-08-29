require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
    console.error('❌ DISCORD_TOKEN or CLIENT_ID not set in .env');
    process.exit(1);
}

// Create the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define slash commands
const commands = [
    new SlashCommandBuilder()
        .setName('pastoral-team')
        .setDescription('Displays the pastoral team information'),
].map(cmd => cmd.toJSON());

// Register global commands
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('⏳ Registering global commands...');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        console.log('✅ Global commands registered.');
    } catch (error) {
        console.error(error);
    }
})();

// Bot ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'frp') {
        const frpMessage = {
            content: `Fail Roleplay is when a student does something that is deemed a) innopropriate b) unsuitable for roleplay purposes c) unrealistic and d) not appropriate for staff to deal with due to our age group

Fail Roleplay **should** be ignored but isnt always avoidable. If you have problems with students' FRP, you should speak to the highest member of the pastoral team on site. 

1. **Bladed Objects**; students are not permitted to roleplay with bladed objects, this is only suitable for roleplays in which are specific and approved by a senior leader
2. **Self Harm or Suicide**; being honest here, we are all teenagers at the end of the day, so we **do not expect you to deal with either of these**. (Staff that encounter this should direct the student to a helpline and if serious enough to the Designated Safeguarding Lead)
3. **Diagnosis**; the pastoral team **will not** diagnose students (students that ask for a diagnosis -> you should follow FRP protocol)
4. **Real-Life Situations**; once again, we're all teenagers, we aren't here to deal with real life problems of students as much as we would like to.

__What is FRP Protocol?__
FRP protocol should be taken into account when you encounter FRP. You should do the following:
1. Tell the student that what they are doing is FRP and you can either avoid the situation and move along **with a different roleplay type moving forward e.g. a change in story** or **dismiss the incident entirely** at the student's discretion
2. If they still do it, you should get the most senior member of the pastoral team to support. They will add a hub sanction if necessary.

-# For further questions regarding this, please speak to the Designated Safeguarding Lead`,
            embeds: [],
            components: []
        };

        await interaction.reply(frpMessage);
    }
});

// Log in the bot
client.login(TOKEN);

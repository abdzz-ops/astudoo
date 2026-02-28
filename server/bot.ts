import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { storage } from './storage';

const TOKEN = process.env.DISCORD_BOT_TOKEN || 'MTQ3NzIyMTcxMzMxNjk0MTk3Ng.GL6LZk.6tBWB9kiAlvRnHWH6o0XV3t33twi5REY-C1AEs';

export async function setupBot() {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('ready', async () => {
    console.log(`Discord bot logged in as ${client.user?.tag}!`);
    
    if (client.user) {
      const rest = new REST({ version: '10' }).setToken(TOKEN);
      try {
        await rest.put(
          Routes.applicationCommands(client.user.id),
          { 
            body: [
              new SlashCommandBuilder()
                .setName('add-upload')
                .setDescription('Upload a preview to the portfolio')
                .addAttachmentOption(option => 
                  option.setName('file')
                    .setDescription('The image or video file')
                    .setRequired(true))
                .addStringOption(option =>
                  option.setName('text')
                    .setDescription('Text to display')
                    .setRequired(true))
                .addStringOption(option =>
                  option.setName('size')
                    .setDescription('Size: Huge, Big, Mid, Small')
                    .addChoices(
                      { name: 'Huge', value: 'Huge' },
                      { name: 'Big', value: 'Big' },
                      { name: 'Mid', value: 'Mid' },
                      { name: 'Small', value: 'Small' }
                    )
                    .setRequired(false))
                .addBooleanOption(option =>
                  option.setName('blur')
                    .setDescription('Blur effect')
                    .setRequired(false))
            ] 
          },
        );
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error('Error reloading commands:', error);
      }
    }
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add-upload') {
      const file = interaction.options.getAttachment('file');
      const text = interaction.options.getString('text') || '';
      const size = interaction.options.getString('size') || 'Mid';
      const blur = interaction.options.getBoolean('blur') || false;

      if (!file) {
        await interaction.reply('No file provided!');
        return;
      }

      try {
        await storage.createPreview({
          url: file.url,
          description: text,
          size: size,
          blur: blur
        });

        await interaction.reply(`Site updated with this preview!\n**Text:** ${text}\n**File:** ${file.url}\n**Size:** ${size}, **Blur:** ${blur}`);
      } catch (e) {
        await interaction.reply('Error saving to database.');
      }
    }
  });

  await client.login(TOKEN).catch(err => {
    console.error("Failed to start Discord bot (Invalid token?)", err);
  });
}

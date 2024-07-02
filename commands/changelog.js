require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("changelog").setDescription("Check what changes are made to the bot!"),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Bot Changelog**",
          description: "Date: July 3, 2024",
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "Added `/define` command",
              value:
                "The `/define` command was added to the bot, allowing you to define a word with the help of Merriam-Webster!",
            },
            {
              name: "Added `/translate` command",
              value:
                "The `/translate` command was added to the bot, allowing you to translate text between different languages with the help of Google Translate!",
            },
            {
              name: "Major command enhancements",
              value:
                "Many commands have been rewritten due to many outdated APIs in use, and to improve the overall consistency of the bot!",
            },
          ],
        },
      ],
    });
  },
};

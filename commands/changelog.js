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
          description: "Date: August 7, 2024",
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "Added `/encrypt` and `/decrypt` command",
              value:
                "The following 2 commands were added to the bot, allowing you to encrypt and decrypt text using Base64 encoding!",
            },
            {
              name: "Minor command enhancements",
              value:
                "Some commands have been improved for the overall consistency of the bot!",
            },
          ],
        },
      ],
    });
  },
};

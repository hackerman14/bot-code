const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Check what changes are made to the bot!"),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Bot Changelog**",
          description: "Date: `April 15, 2026`",
          fields: [
            {
              name: "Added `/yes` command",
              value:
                "In addition to the `/no` command, you can now use `/yes` to get a meaningful reason for saying yes!",
            },
            {
              name: "Minor enhancements",
              value:
                "Some code has been improved for the overall consistency of the bot!",
            },
          ],
        },
      ],
    });
  },
};

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
          description: "Date: April 1, 2026",
          fields: [
            {
              name: "Updated `/gif` command",
              value:
                "Changed the API provider from Tenor to KLIPY since Tenor API is getting terminated soon.",
            },
          //   {
          //     name: "Minor enhancements",
          //     value:
          //       "Some code has been improved for the overall consistency of the bot!",
          //   },
          ],
        },
      ],
    });
  },
};

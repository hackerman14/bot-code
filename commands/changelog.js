require("dotenv").config();
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
          description: "Date: January 10, 2026",
          fields: [
            {
              name: "Added `/feedback` command",
              value:
                "Now you can send me feedbacks about the bot directly through Discord!",
            },
            {
              name: "Added `/no` command",
              value: "Send people a `no` response using No-as-a-Service!",
            },
            {
              name: "Added `/gender` command",
              value: "Determine the gender of a name response using Genderize!",
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

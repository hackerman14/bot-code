require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Check what changes are made to the bot!"),
  async execute(interaction) {
    const botOwner = `${process.env.BOTOWNER}`;
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Bot Changelog**",
          description: "Date: June 21, 2024",
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "Removed `/covid` command",
              value:
                "`/covid` was removed due to COVID-19 being unrevalent now, and the API that was being used reached its end of life on 2023.",
            },
            {
              name: "Removed `/btcabuse` command",
              value:
                "`/btc` was removed due to the updated API being too strict on rate limits.",
            },
            {
              name: "Command enhancements",
              value: "A few commands error have been fixed and code improved!",
            },
          ],
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

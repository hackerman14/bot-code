require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Check how long the bot has stayed on!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get(process.env.OWNERID).tag;
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let roundedSeconds = Math.round(seconds);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${roundedSeconds} seconds`;
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Time Tracker**",
          description: `The bot has stayed on for ${uptime}!`,
          timestamp: new Date().toISOString(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

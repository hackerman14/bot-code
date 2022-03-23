const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Check how long the bot has stayed on!"),
  async execute(interaction) {
    const { client } = interaction;
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
          color: "RANDOM",
          title: "**Time Tracker**",
          description: `The bot has stayed on for ${uptime}!`,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
  },
};

const moment = require("moment")
const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows you the info about the bot!"),
  async execute(interaction) {
    const { client } = interaction;
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**About This Bot**",
          description: "The information about this bot!",
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          fields: [
            {
              name: "Bot Version",
              value: "hackerman14 (Private Beta)",
            },
            {
              name: "Bot Since",
              value: `<t:${client.user.createdTimestamp}:R>`,
            },
            {
              name: "Bot Website",
              value: "[https://hackerman14.tk](https://hackerman14.github.io/)",
            },
            {
              name: "Creator",
              value: "[" + owner + "](https://raymond-1227.github.io/)",
            },
            {
              name: "Host",
              value: "[Glitch](https://glitch.com/)",
            },
            {
              name: "Always Online",
              value: "Disabled (i'm too poor to buy boosted app plan)",
            },
            {
              name: "Source Codes",
              value: "[GitHub/hackerman14](https://github.com/hackerman14)",
            },
            {
              name: "Library",
              value: "[Discord.js](https://discord.js.org/) (v13.6.0)",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
  },
};

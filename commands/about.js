require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows you the info about the bot!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = `${process.env.BOTOWNER}`; 
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**About This Bot**",
          description: "The information about this bot!",
          thumbnail: {
            url: client.user.displayAvatarURL,
          },
          fields: [
            {
              name: "Bot Edition",
              value: "NotSoStable",
            },
            {
              name: "Bot Since",
              value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
            },
            {
              name: "Bot Website",
              value: "[https://hackerman14.tk](https://hackerman14.github.io/)",
            },
            {
              name: "Creator",
              value: "[Raymond#2829](https://raymond-1227.github.io/)",
            },
            {
              name: "Host",
              value:
                "[Oracle Cloud Infrastructure](https://www.oracle.com/cloud/)",
            },
            {
              name: "Open Source",
              value: "[hackerman14/bot-codes](https://github.com/hackerman14/bot-codes)",
            },
            {
              name: "Library",
              value: "[discord.js](https://discord.js.org/)",
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Shows you the info about the bot!"),
  async execute(interaction) {
    const { client } = interaction;

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
              value: "NotSoStable (Build 2026.05.06)",
            },
            {
              name: "Bot Since",
              value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`,
            },
            {
              name: "Bot Website",
              value: "<https://hackerman14.github.io/>",
            },
            {
              name: "Creator",
              value: "[rhsu](https://raymond-1227.github.io/)",
            },
            {
              name: "Host Provider",
              value:
                "[Google Cloud](https://cloud.google.com/)",
            },
            {
              name: "Open Source",
              value:
                "[hackerman14/bot-code](https://github.com/hackerman14/bot-code)",
            },
            {
              name: "Library",
              value: "[discord.js](https://discord.js.org/)",
            },
          ],
          footer: {
            text: `Made with ❤️ created by ${process.env.BOT_OWNER}`,
          },
        },
      ],
    });
  },
};

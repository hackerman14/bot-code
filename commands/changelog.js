const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Check what changes are made to the bot!"),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Bot Changelog**",
          description: "Date: March 23, 2022",
          timestamp: new Date(),
          fields: [
            {
              name: "COMMAND HANDLER! (even in slash commands woohoo)",
              value:
                "Prefix calling (formerly known as `h!`) has now been deprecated for the slash commands handler!",
            },
            {
              name: "New command",
              value:
                "`/discordtips` shows all Discord app startup pro tips randomly!",
            },
            {
              name: "Known issues",
              value:
                "Will be fixing commands like `/uptime` or `/server` later! Stay tuned!",
            },
          ],
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
  },
};

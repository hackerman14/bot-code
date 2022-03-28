const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Check what changes are made to the bot!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    await interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Bot Changelog**",
          description: "Date: March 27, 2022",
          timestamp: new Date(),
          fields: [
            {
              name: "New command",
              value:
                "Added `/covid` command (I don't even know when I accidentally removed this...)",
            },
            {
              name: "Command enhancements",
              value:
                "A few commands error have been patched, will continue to add & fix more commands!",
            },
          ],
          footer: {
            text: "Made with ❤️ created by " + botOwner,
          },
        },
      ],
    });
    await interaction.followUp({
      embeds: [
        {
          color: "RANDOM",
          title: "**Previous Bot Changelog**",
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
            text: "Made with ❤️ created by " + botOwner,
          },
        },
      ],
    });
  },
};

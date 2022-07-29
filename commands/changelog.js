const { SlashCommandBuilder } = require("discord.js");

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
          color: 0x0ccab6,
          title: "**Bot Changelog**",
          description: "Date: July 20, 2022",
          timestamp: new Date(),
          fields: [
            {
              name: "discord.js v14!",
              value:
                "Implenmented the new discord.js v14!",
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
    await interaction.followUp({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Previous Bot Changelog**",
          description: "Date: May 21, 2022",
          timestamp: new Date(),
          fields: [
            {
              name: "New command",
              value:
                "Added `/selfpunish` command to punish yourself!",
            },
            {
              name: "Command enhancements",
              value:
                "A few commands error have been patched, will continue to add & fix more commands!",
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

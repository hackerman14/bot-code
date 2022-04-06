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
          description: "Date: March 28, 2022",
          timestamp: new Date(),
          fields: [
            {
              name: "New bot hosting",
              value:
                "Changed hosting from Glitch to Oracle Cloud Infrastructure, should now run 24/7!",
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
          description: "Date: March 28, 2022",
          timestamp: new Date(),
          fields: [
            {
              name: "New command",
              value:
                "Added `/hack` command (it's just a Dank Memer `hack` command but I made it better)",
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
  },
};

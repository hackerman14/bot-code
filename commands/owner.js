const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("owner")
    .setDescription("Check if you own the hackerman14 bot!"),
  async execute(interaction) {
    const { client } = interaction;
    let botOwner = client.users.cache.get("410839910204047360").tag;
    if (interaction.user.id !== "410839910204047360")
      return interaction.reply({
        embeds: [
          {
            color: "#db564f",
            title: "**Bot Ownership Verification**",
            description: "Well sadly you don't own the bot... :/",
            timestamp: new Date(),
            footer: {
              text: `Made with ❤️ created by ${botOwner}`,
            },
          },
        ],
      });
    interaction.reply({
      embeds: [
        {
          color: "#64ab80",
          title: "**Bot Ownership Verification**",
          description: "Congratulations, you own the bot! WOOHOO!11!!!11!!",
          timestamp: new Date(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

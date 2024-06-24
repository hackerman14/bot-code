require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("owner").setDescription("Check if you own the hackerman14 bot!"),
  async execute(interaction) {
    const { client } = interaction;
    let botOwner = client.users.cache.get(process.env.OWNERID).tag;
    if (interaction.user.id !== process.env.OWNERID)
      return interaction.reply({
        embeds: [
          {
            color: "#db564f",
            title: "**Bot Ownership Verification**",
            description: "Well sadly you don't own the bot... :/",
            timestamp: new Date().toISOString(),
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
          timestamp: new Date().toISOString(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

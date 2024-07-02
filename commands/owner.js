require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("owner").setDescription("Check if you own the hackerman14 bot!"),
  async execute(interaction) {
    if (interaction.user.id !== process.env.OWNERID)
      return interaction.reply({
        embeds: [
          {
            color: 0xdb564f,
            title: "**Bot Ownership Verification**",
            description: "Well sadly you don't own the bot... :/",
          },
        ],
      });
    interaction.reply({
      embeds: [
        {
          color: 0x64ab80,
          title: "**Bot Ownership Verification**",
          description: "Congratulations, you own the bot! WOOHOO!11!!!11!!",
        },
      ],
    });
  },
};

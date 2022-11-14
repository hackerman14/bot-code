require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Check what changes are made to the bot!"),
  async execute(interaction) {
    const botOwner = `${process.env.BOTOWNER}`;
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Bot Changelog**",
          description: "Date: November 15, 2022",
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "Redefined /lawsuit into /sue",
              value:
                "Redesigned the /lawsuit command into /sue now in order to make it more logical and fun!",
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
  },
};

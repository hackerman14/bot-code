require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get(process.env.OWNERID).tag;
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Lag Machine**",
          description: "Ping?",
          timestamp: new Date().toISOString(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
    await interaction.editReply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Lag Machine**",
          description: "Pong!",
          fields: [
            {
              name: "Latency",
              value: `${Math.abs(Date.now() - interaction.createdTimestamp)}ms`,
            },
            {
              name: "API Latency",
              value: `${Math.round(client.ws.ping)}ms`,
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

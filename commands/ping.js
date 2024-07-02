require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
  async execute(interaction) {
    const { client } = interaction;
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Lag Machine**",
          description: "Ping?",
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
        },
      ],
    });
  },
};

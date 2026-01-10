require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("no")
    .setDescription("Say no with a meaningful reason!"),
  async execute(interaction) {
    const response = await axios.get("https://naas.isalman.dev/no");
    const reason = response.data.reason;

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**No.**",
          description: reason,
          footer: {
            text: `Powered by No-as-a-Service`,
          },
        },
      ],
    });
  },
};

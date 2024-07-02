require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder().setName("joke").setDescription("Tells you a dad joke!"),
  async execute(interaction) {
    const response = await axios.get("https://icanhazdadjoke.com", {
      headers: {
        Accept: "application/json",
      },
    });
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Dad Joke**",
          description: response.data.joke,
          footer: {
            text: "Powered by icanhazdadjoke API",
          },
        },
      ],
    });
  },
};

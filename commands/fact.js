require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder().setName("fact").setDescription("Tells you a boring fact!"),
  async execute(interaction) {
    const APIs = [
      { url: "https://useless-facts.sameerkumar.website/api", name: "Sameer Kumar's Useless Facts API" },
      { url: "https://uselessfacts.jsph.pl/api/v2/facts/random", name: "Joseph Paul's uselessfacts API" },
    ];
    const randomAPI = APIs[Math.floor(Math.random() * APIs.length)];
    const response = await axios.get(randomAPI.url);
    const fact = randomAPI.url.includes("sameerkumar") ? response.data.data : response.data.text;

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Boring Facts**",
          description: fact,
          footer: {
            text: `Powered by ${randomAPI.name}`,
          },
        },
      ],
    });
  },
};

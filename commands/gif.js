require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder().setName("gif").setDescription("Sends you a random GIF!"),
  async execute(interaction) {
    const APIs = [
      {
        name: "GIPHY",
        url: "http://api.giphy.com/v1/gifs/random",
        params: {
          api_key: process.env.GIPHY,
          rating: "pg",
        },
        extractUrl: (data) => data.data.images.original.url,
      },
      {
        name: "Tenor",
        url: "https://tenor.googleapis.com/v2/search",
        params: {
          q: "gif",
          key: process.env.TENOR,
          media_filter: "gif",
          content_filter: "medium",
          random: "true",
          limit: 1,
        },
        extractUrl: (data) => data.results[0].media_formats.gif.url,
      },
    ];
    const randomAPI = APIs[Math.floor(Math.random() * APIs.length)];
    const response = await axios.get(randomAPI.url, { params: randomAPI.params });

    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Random GIF**",
          description: "Here's your GIF!",
          image: {
            url: randomAPI.extractUrl(response.data),
          },
          footer: {
            text: `Powered by ${randomAPI.name}`,
          },
        },
      ],
    });
  },
};

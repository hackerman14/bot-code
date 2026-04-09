const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends you a random GIF!"),
  async execute(interaction) {
    const APIs = [
      {
        name: "Giphy",
        url: "https://api.giphy.com/v1/gifs/random",
        params: {
          api_key: process.env.GIPHY_API_KEY,
          rating: "pg",
        },
        extractUrl: (data) => data.data.images.original.url,
      },
      {
        name: "KLIPY",
        url: `https://api.klipy.com/api/v1/${process.env.KLIPY_API_KEY}/gifs/trending`,
        params: {
          page: Math.floor(Math.random() * 50) + 1,
          customer_id: "hackerman14",
        },
        extractUrl: (data) => data.data.data[Math.floor(Math.random() * 24)]?.file?.hd?.gif?.url,
      },
    ];
    const randomAPI = APIs[Math.floor(Math.random() * APIs.length)];
    const response = await axios.get(randomAPI.url, {
      params: randomAPI.params,
    });

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

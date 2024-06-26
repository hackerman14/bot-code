require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder().setName("gif").setDescription("Sends you a random GIF!"),
  async execute(interaction) {
    fetch(`http://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY}&rating=g`)
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Random GIF**",
              description: "Here's your GIF!",
              timestamp: new Date().toISOString(),
              image: {
                url: body.data.images.original.url,
              },
              footer: {
                text: "Powered by GIPHY",
              },
            },
          ],
        });
      });
  },
};

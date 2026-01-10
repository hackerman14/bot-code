require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tells you a dad joke!"),
  async execute(interaction) {
    const APIs = [
      {
        url: "https://icanhazdadjoke.com",
        name: "icanhazdadjoke",
        headers: {
          Accept: "application/json",
        },
      },
      {
        url: "https://official-joke-api.appspot.com/random_joke",
        name: "Official Joke API",
        headers: {},
      },
    ];
    const randomAPI = APIs[Math.floor(Math.random() * APIs.length)];
    const response = await axios.get(randomAPI.url, {
      headers: randomAPI.headers,
    });
    const joke = randomAPI.url.includes("icanhazdadjoke")
      ? response.data.joke
      : `${response.data.setup} ${response.data.punchline}`;

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Dad Joke**",
          description: joke,
          footer: {
            text: `Powered by ${randomAPI.name}`,
          },
        },
      ],
    });
  },
};

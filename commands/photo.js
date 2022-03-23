const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("photo")
    .setDescription("Sends you an HD stock photo from Unsplash!"),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Random HD Photo**",
          description: "Here's your HD photo!",
          timestamp: new Date(),
          image: {
            url: "https://source.unsplash.com/random?sig=" + Math.random(),
          },
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
  },
};

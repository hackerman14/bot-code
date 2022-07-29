const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("photo")
    .setDescription("Sends you an HD stock photo from Unsplash!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Random HD Photo**",
          description: "Here's your HD photo!",
          timestamp: new Date(),
          image: {
            url: "https://source.unsplash.com/random?sig=" + Math.random(),
          },
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

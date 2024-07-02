require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("photo").setDescription("Sends you an HD stock photo!"),
  async execute(interaction) {
    fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH}`)
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Random Stock Photo**",
              description: "Here's your HD photo!",
              fields: [
                {
                  name: "Photographer",
                  value: `[${body.user.name}](${body.user.links.html}?utm_source=hackerman14&utm_medium=referral)`,
                },
                {
                  name: "Original URL",
                  value: body.links.html,
                },
                {
                  name: "Download",
                  value: `[Click here to download!](${body.links.download})`,
                }
              ],
              image: {
                url: body.urls.raw,
              },
              footer: {
                text: "Powered by Unsplash",
              },
            },
          ],
        });
      });
  },
};

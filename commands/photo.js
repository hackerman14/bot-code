require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("photo").setDescription("Sends you an HD stock photo from Unsplash!"),
  async execute(interaction) {
    const botOwner = `${process.env.BOTOWNER}`;
    fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH}`)
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Random Stock Photo**",
              description: "Here's your photo from Unsplash!",
              fields: [
                {
                  name: "Photographer",
                  value: `[${body.user.name}](${body.user.links.html})`,
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
              timestamp: new Date(),
              footer: {
                text: `Made with ❤️ created by ${botOwner}`,
              },
            },
          ],
        });
      });
  },
};

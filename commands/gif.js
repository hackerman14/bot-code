const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends you a random GIF!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    fetch(process.env.GIPHY)
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: "RANDOM",
              title: "**Random GIF**",
              description: "Here's your GIF!",
              timestamp: new Date(),
              image: {
                url: body.data.images.original.url,
              },
              footer: {
                text: "Made with ❤️ created by " + botOwner,
              },
            },
          ],
        });
      });
  },
};

const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tells you a joke!"),
  async execute(interaction) {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: "RANDOM",
              title: "**Dumb Jokes**",
              description: body.data,
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner,
              },
            },
          ],
        });
      });
  },
};

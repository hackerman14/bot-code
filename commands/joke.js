const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tells you a joke!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
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
                text: `Made with ❤️ created by ${botOwner}`,
              },
            },
          ],
        });
      });
  },
};

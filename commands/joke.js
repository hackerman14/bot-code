require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tells you a joke!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get(process.env.OWNERID).tag;
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Dumb Jokes**",
              description: body.data,
              timestamp: new Date().toISOString(),
              footer: {
                text: `Made with ❤️ created by ${botOwner}`,
              },
            },
          ],
        });
      });
  },
};

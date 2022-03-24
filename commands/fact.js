const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Tells you a boring fact!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    fetch("https://useless-facts.sameerkumar.website/api")
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: "RANDOM",
              title: "**Boring Facts**",
              description: body.data,
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + botOwner,
              },
            },
          ],
        });
      });
  },
};

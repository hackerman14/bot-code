require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder().setName("fact").setDescription("Tells you a boring fact!"),
  async execute(interaction) {
    fetch("https://useless-facts.sameerkumar.website/api")
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Boring Facts**",
              description: body.data,
              footer: {
                text: "Powered by useless-facts API",
              },
            },
          ],
        });
      });
  },
};

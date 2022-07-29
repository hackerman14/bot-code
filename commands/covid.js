const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("covid")
    .setDescription("Tells you summary details of COVID-19 information!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then((body) => {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**COVID-19 Information**",
              description: "Here's the summary details!",
              fields: [
                {
                  name: "New Comfirmed Cases",
                  value: body.Global.NewConfirmed.toString(),
                },
                {
                  name: "New Death Cases",
                  value: body.Global.NewDeaths.toString(),
                },
                {
                  name: "Total Comfirmed Cases",
                  value: body.Global.TotalConfirmed.toString(),
                },
                {
                  name: "Total Death Cases",
                  value: body.Global.TotalDeaths.toString(),
                },
              ],
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

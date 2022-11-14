require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("covid")
    .setDescription("Tells you summary details of COVID-19 information!"),
  async execute(interaction) {
    const botOwner = `${process.env.BOTOWNER}`;
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

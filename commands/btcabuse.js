require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("btcabuse")
    .setDescription("Check if a Bitcoin address is on BitcoinAbuse!")
    .addStringOption((option) =>
      option
        .setName("address")
        .setDescription("The Bitcoin address you're searching for")
        .setRequired(true)
    ),
  async execute(interaction) {
    const botOwner = `${process.env.BOTOWNER}`;
    let address = interaction.options.getString("address");
    fetch(
      `https://www.bitcoinabuse.com/api/reports/check?address=${address}&api_token=${process.env.BTCABUSE}`
    )
      .then((res) => res.json())
      .then((body) => {
        if (body.first_seen === null)
          return interaction.reply({
            embeds: [
              {
                color: 0x0ccab6,
                title: "**BTC Address Checkup**",
                description: "This address is not on Bitcoin Abuse Database!",
                timestamp: new Date(),
                footer: {
                  text: `Made with ❤️ created by ${botOwner}`,
                },
              },
            ],
          });

        let firstSeen = moment(body.first_seen, "YYYY-MM-DD HH:mm:ss").unix();
        let lastSeen = moment(body.last_seen, "YYYY-MM-DD HH:mm:ss").unix();

        console.log(firstSeen);
        console.log(lastSeen);

        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**BTC Address Checkup**",
              description: "This doesn't seem good man...",
              fields: [
                {
                  name: "Address",
                  value: body.address,
                },
                {
                  name: "First Seen",
                  value: `<t:${firstSeen}:R>`,
                },
                {
                  name: "Last Seen",
                  value: `<t:${lastSeen}:R>`,
                },
                {
                  name: "Report Count",
                  value: body.count,
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

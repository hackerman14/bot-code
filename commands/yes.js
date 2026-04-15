const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yes")
    .setDescription("Say yes with a meaningful reason!"),
  async execute(interaction) {
    const response = await axios.get("https://yes.lavx.hu/yes");
    let reason = response.data.reason;

    if (reason.endsWith(" Yes!")) {
      reason = reason.slice(0, -5);
    }

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Yes.**",
          description: reason,
          footer: {
            text: `Powered by Yes-as-a-Service`,
          },
        },
      ],
    });
  },
};

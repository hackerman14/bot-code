require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("define")
    .setDescription("Defines a given word or something")
    .addStringOption((option) =>
      option.setName("something").setDescription("The word or phrase to define").setRequired(true)
    ),
  async execute(interaction) {
    const something = interaction.options.getString("something");

    const response = await axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${something}?key=${process.env.MW}`
    );

    if (response.data.length === 0) {
      await interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**Dictionary**",
            description: `No definition found for "${something}"!`,
          },
        ],
      });
    } else if (typeof response.data[0] === "string") {
      const suggestions = response.data.join(", ");
      await interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**Dictionary**",
            description: `No definition found for "${something}"! Did you mean: \`${suggestions}\`?`,
          },
        ],
      });
    } else {
      const definition = response.data[0].shortdef.join("; ");

      await interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**Dictionary**",
            description: `Here is the definition!`,
            fields: [
              {
                name: "Word or Phrase",
                value: something,
              },
              {
                name: "Definition",
                value: definition,
              },
            ],
            footer: {
              text: `Powered by Merriam-Webster's Collegiate Dictionary`,
            },
          },
        ],
      });
    }
  },
};

require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translates a given text to the user's specified language!")
    .addStringOption((option) =>
      option.setName("language").setDescription("The target language code (e.g. en, es, fr)").setRequired(true)
    )
    .addStringOption((option) => option.setName("text").setDescription("The text to translate").setRequired(true)),
  async execute(interaction) {
    const targetLanguage = interaction.options.getString("language");
    const textToTranslate = interaction.options.getString("text");

    const response = await axios.post("https://translate.googleapis.com/translate_a/single", null, {
      params: {
        client: "gtx",
        sl: "auto",
        tl: targetLanguage,
        dt: "t",
        q: textToTranslate,
      },
    });

    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "Translation Result",
          description: "Here is the translation of your text",
          fields: [
            {
              name: "Original Text",
              value: textToTranslate,
            },
            {
              name: "Detected Language",
              value: response.data[2],
            },
            {
              name: "Translated Text",
              value: response.data[0].map((item) => item[0]).join(""),
            },
          ],
          footer: {
            text: "Powered by Google Translate",
          },
        },
      ],
    });
  },
};

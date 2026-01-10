require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gender")
    .setDescription("Predict the gender of a person given their name!")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name to predict the gender for")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = await axios.get(
      `https://api.genderize.io?name=${interaction.options.getString("name")}`
    );
    const gender = response.data;

    const GENDER_TYPE_MAP = {
      male: "Male",
      female: "Female",
      null: "Unidentifiable",
    };

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Gender Detector**",
          description: "Here's the predicted gender information!",
          fields: [
            {
              name: "Name",
              value: gender.name,
            },
            {
              name: "Gender",
              value: GENDER_TYPE_MAP[gender.gender],
            },
            {
              name: "Probability",
              value: Math.round(gender.probability * 100) + "%",
            },
          ],
          footer: {
            text: "Powered by Genderize",
          },
        },
      ],
    });
  },
};

const { Util } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("The copy fax machine!")
    .addStringOption((option) =>
      option
        .setName("something")
        .setDescription("Type the word you want the bot to say")
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply(
      Util.cleanContent(interaction.options.getString("something"), interaction)
    );
  },
};

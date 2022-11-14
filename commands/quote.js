const { Util } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Turn your words into a quote!")
    .addStringOption((option) =>
      option
        .setName("something")
        .setDescription("Type the word you want the bot to quote")
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply(
      Util.cleanContent(`> ${interaction.options.getString("something")}\n- ${interaction.user.tag}`, interaction)
    );
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Replies with pong!")
    .addStringOption((option) =>
      option
        .setName("something")
        .setDescription("Type the word you want the bot to say")
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply(interaction.options.getString("something").cleanContent);
  },
};

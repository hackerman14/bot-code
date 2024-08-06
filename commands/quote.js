const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Turn your words into a quote!")
    .addStringOption((option) =>
      option.setName("something").setDescription("The text you want the bot to quote").setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Quote Machine**",
          description: `*${interaction.options.getString("something")}*\n\u2013 ${interaction.user.displayName}`,
        },
      ],
    });
  },
};

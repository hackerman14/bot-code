const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("encrypt")
    .setDescription("Encrypt your text in Base64!")
    .addStringOption((option) =>
      option.setName("something").setDescription("The text you want to encrypt").setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Base64 Encoding**",
          description: "Here's your encrypted text!",
          fields: [
            {
              name: "Original Text",
              value: interaction.options.getString("something"),
            },
            {
              name: "Encrypted Text",
              value: `\`\`\`${Buffer.from(interaction.options.getString("something"), "utf-8").toString("base64")}\`\`\``,
            },
          ],
        },
      ],
    });
  },
};

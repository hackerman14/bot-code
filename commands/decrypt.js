const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("decrypt")
    .setDescription("Decrypt your text from Base64 to readable text!")
    .addStringOption((option) =>
      option.setName("something").setDescription("The text you want to decrypt").setRequired(true)
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
              name: "Encrypted Text",
              value: `\`\`\`${interaction.options.getString("something")}\`\`\``,
            },
            {
              name: "Decrypted Text",
              value: Buffer.from(interaction.options.getString("something"), "base64").toString("utf-8"),
            },
          ],
        },
      ],
    });
  },
};

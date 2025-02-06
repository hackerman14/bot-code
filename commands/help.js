require("dotenv").config();
const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("How to check my available commands!"),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Need Command Help?**",
          description:
            "Type `/` in the message box and select my avatar on the sidebar to check all my available commands!",
          fields: [
            {
              name: "Have any questions?",
              value: "You can check out the bot FAQ first by [clicking here!](https://hackerman14.github.io/faq)",
            },
          ],
        },
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("How to check my available commands!"),
  async execute(interaction) {
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Need Command Help?**",
          description:
            "Type `/` in the message box and select my avatar on the sidebar to check all my available commands!",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
      ephemeral: true,
    });
  },
};

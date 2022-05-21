const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("How to check my available commands!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Need Command Help?**",
          description:
            "Type `/` in the message box and select my avatar on the sidebar to check all my available commands!",
          fields: [
            {
              name: "Have any questions?",
              value:
                "You can check out the bot FAQ first by [clicking here!](https://hackerman14.github.io/faq)",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + botOwner,
          },
        },
      ],
      ephemeral: true,
    });
  },
};

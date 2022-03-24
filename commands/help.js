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
              name: "Commands not showing up?",
              value:
                "Kick the bot first, then re-invite the bot to the server! \n Be sure to at least give the bot `View Channels`, `Send Messages`, and most importantly `Use Application Commands` via `Server Settings > Roles > hackerman14 (The role name is called it by default)`",
            },
            {
              name: "Have other questions?",
              value: "You can check out the bot FAQ first by [clicking here!](https://hackerman14.github.io/faq)"
            }
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

require("dotenv").config();
module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    // Supposedly this works, but due to Discord not permitting me to use Message Intent API,
    // the bot cannot read any message content and thus won't respond to any message.
    // Oh well, at least it can still respond to slash commands and pings!
    if (message.mentions.has(process.env.CLIENT_ID)) {
      message.reply({
        embeds: [
          {
            color: 0x0ccab6,
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
                value:
                  "You can check out the bot FAQ first by [clicking here!](https://hackerman14.github.io/faq)",
              },
            ],
          },
        ],
      });
    }
  },
};

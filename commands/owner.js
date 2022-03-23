const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("owner")
    .setDescription("Check if you own the hackerman14 bot!"),
  async execute(interaction) {
    if (interaction.user.id !== "410839910204047360")
        return interaction.reply({
          embeds: [
            {
              color: "#db564f",
              title: "**Bot Ownership Verification**",
              description: "You're not the owner tho!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner,
              },
            },
          ],
        });
      interaction.reply({
        embeds: [
          {
            color: "#64ab80",
            title: "**Bot Ownership Verification**",
            description:
              "Congratulations, you're the owner of the bot! (Verified by Professor DumbGuy123)",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner,
            },
          },
        ],
      });
  },
};

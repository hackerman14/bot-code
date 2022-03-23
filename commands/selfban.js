const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selfban")
    .setDescription("Ban yourself! (r/realme Community Discord exclusive)"),
  async execute(interaction) {
    const { client } = interaction;
    let emoji = client.emojis.cache.get("955822873245790238");
    let member = interaction.user;
    if (interaction.guild.id !== "457611176558460948")
      return interaction.reply({
        embeds: [
          {
            color: "#db564f",
            title: "**Self Ban System**",
            description: "This command only works in r/realme Community!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner,
            },
          },
        ],
      });
    interaction.channel.send({
      embeds: [
        {
          color: "#64ab80",
          title: "**Self Ban System**",
          description: `${emoji} ***${member.tag} was banned*** | You asked for a ban, so here you go.`,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
    member.send(
      "You were banned from r/realme Community | You asked for a ban, so here you go."
    );
  },
};

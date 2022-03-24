const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selfban")
    .setDescription("Ban yourself! (r/realme Community Discord exclusive)"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    let emoji = client.emojis.cache.get("955822873245790238");
    let member = interaction.user;
    if (interaction.guild.id !== "633535718559580179")
      return interaction.reply({
        embeds: [
          {
            color: "#db564f",
            title: "**Self Ban System**",
            description: "This command only works in r/realme Community!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + botOwner,
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
            text: "Made with ❤️ created by " + botOwner,
          },
        },
      ],
    });
    member.send(
      "You were banned from r/realme Community | You asked for a ban, so here you go."
    );
  },
};

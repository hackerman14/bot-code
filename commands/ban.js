const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription(
      "Ban people (r/realme Community Discord & bot developer exclusive)"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason why you are banning the user")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    let emoji = client.emojis.cache.get("955822873245790238");
    let member = await interaction.options.getUser("user").fetch(true);
    let reason = interaction.options.getString("reason");
    if (interaction.guild.id !== "633535718559580179")
      return interaction.reply({
        embeds: [
          {
            color: "#db574f",
            title: "**Fake Ban System**",
            description:
              "This command is exclusively on the r/realme Community Discord!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + botOwner,
            },
          },
        ],
        ephemeral: true,
      });

    if (interaction.user.id !== "410839910204047360")
      return interaction.reply({
        embeds: [
          {
            color: "#db574f",
            title: "**Fake Ban System**",
            description: "Only the bot owner can perform this action!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + botOwner,
            },
          },
        ],
        ephemeral: true,
      });

    interaction.reply({
      embeds: [
        {
          color: "#68b386",
          description: `<:hSuccess:956980119086465124> ***${member.tag} was banned*** | ${reason}`,
        },
      ],
    });
    member.send({
      embeds: [
        {
          color: "#db574f",
          description: `You were banned from r/realme Community | ${reason}`,
        },
      ],
    });
  },
};

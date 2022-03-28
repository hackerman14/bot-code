const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selfpunish")
    .setDescription("Punish yourself! (r/realme Community Discord exclusive)")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("warn")
        .setDescription("Warn yourself from the server!")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mute")
        .setDescription("Mute yourself from the server!")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("kick")
        .setDescription("Kick yourself from the server!")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ban").setDescription("Ban yourself from the server!")
    ),

  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    let emoji = client.emojis.cache.get("955822873245790238");
    let member = interaction.user;
    if (interaction.guild.id !== "633535718559580179")
      return interaction.reply({
        embeds: [
          {
            color: "#db574f",
            title: "**Self Ban System**",
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
    if (interaction.options.getSubcommand() === "warn") {
      interaction.reply({
        embeds: [
          {
            color: "#68b386",
            description: `<:hSuccess:956980119086465124> ***${member.tag} has been warned.*** | You asked for a warning, so here you go.`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: "#db574f",
            description:
              "You were warned in r/realme Community | You asked for a warning, so here you go.",
          },
        ],
      });
    } else if (interaction.options.getSubcommand() === "mute") {
      interaction.reply({
        embeds: [
          {
            color: "#68b386",
            description: `<:hSuccess:956980119086465124> ***${member.tag} was muted*** | You asked for a mute, so here you go.`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: "#db574f",
            description:
              "You were muted in r/realme Community | You asked for a mute, so here you go.",
          },
        ],
      });
    } else if (interaction.options.getSubcommand() === "kick") {
      interaction.reply({
        embeds: [
          {
            color: "#68b386",
            description: `<:hSuccess:956980119086465124> ***${member.tag} was kicked*** | You asked for a kick, so here you go.`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: "#db574f",
            description:
              "You were kicked from r/realme Community | You asked for a kick, so here you go.",
          },
        ],
      });
    } else if (interaction.options.getSubcommand() === "ban") {
      interaction.reply({
        embeds: [
          {
            color: "#68b386",
            description: `<:hSuccess:956980119086465124> ***${member.tag} was banned*** | You asked for a ban, so here you go.`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: "#db574f",
            description:
              "You were banned from r/realme Community | You asked for a ban, so here you go.",
          },
        ],
      });
    }
  },
};

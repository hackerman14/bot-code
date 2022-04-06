const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selfpunish")
    .setDescription("Punish yourself! (fake Dyno bot punishments)")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Select a type you want to be punished")
        .addChoice("Warn", "warn")
        .addChoice("Mute", "mute")
        .addChoice("Kick", "kick")
        .addChoice("Ban", "ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason why you are banning the user")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { client, guild } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    let choice = interaction.options.getString("type");
    let reason = interaction.options.getString("reason");
    let emoji = client.emojis.cache.get("955822873245790238");
    let member = interaction.user;
    if (choice === "warn") {
      interaction.reply({
        embeds: [
          {
            color: "#68b386",
            description: `<:hSuccess:956980119086465124> ***${member.tag} has been warned. || ${reason}***`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: "#db574f",
            description: `You were warned in ${guild.name} for: ${reason}`,
          },
        ],
      });
    } else if (choice === "mute") {
      interaction.reply({
        embeds: [
          {
            color: "#68b386",
            description: `<:hSuccess:956980119086465124> ***${member.tag} was muted*** | ${reason}`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: "#db574f",
            description: `You were muted in ${guild.name} | ${reason}`,
          },
        ],
      });
    } else if (choice === "kick") {
      interaction.reply({
        embeds: [
          {
            color: "#68b386",
            description: `<:hSuccess:956980119086465124> ***${member.tag} was kicked*** | ${reason}`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: "#db574f",
            description: `You were kicked from ${guild.name} | ${reason}`,
          },
        ],
      });
    } else if (choice === "ban") {
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
            description: `You were banned from ${guild.name} | ${reason}`,
          },
        ],
      });
    }
  },
};

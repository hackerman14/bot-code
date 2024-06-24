const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selfpunish")
    .setDescription("Dyno punishments replica but to fake punish yourself!")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Select a type you want to be punished")
        .addChoices({ name: "Warn", value: "warn" })
        .addChoices({ name: "Mute", value: "mute" })
        .addChoices({ name: "Kick", value: "kick" })
        .addChoices({ name: "Ban", value: "ban" })
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason why you are punishing yourself").setRequired(true)
    ),

  async execute(interaction) {
    const { guild } = interaction;
    let choice = interaction.options.getString("type");
    let reason = interaction.options.getString("reason");
    let member = interaction.user;
    if (choice === "warn") {
      interaction.reply({
        embeds: [
          {
            color: 0x43b582,
            description: `<:botSuccess:956980119086465124> ***${member.tag} has been warned. || ${reason}***`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `You were warned in ${guild.name} for: ${reason}`,
          },
        ],
      });
    } else if (choice === "mute") {
      interaction.reply({
        embeds: [
          {
            color: 0x43b582,
            description: `<:botSuccess:956980119086465124> ***${member.tag} was muted*** | ${reason}`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `You were muted in ${guild.name} | ${reason}`,
          },
        ],
      });
    } else if (choice === "kick") {
      interaction.reply({
        embeds: [
          {
            color: 0x43b582,
            description: `<:botSuccess:956980119086465124> ***${member.tag} was kicked*** | ${reason}`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `You were kicked from ${guild.name} | ${reason}`,
          },
        ],
      });
    } else if (choice === "ban") {
      interaction.reply({
        embeds: [
          {
            color: 0x43b582,
            description: `<:botSuccess:956980119086465124> ***${member.tag} was banned*** | ${reason}`,
          },
        ],
      });
      member.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `You were banned from ${guild.name} | ${reason}`,
          },
        ],
      });
    }
  },
};

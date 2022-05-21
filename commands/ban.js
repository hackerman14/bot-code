const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription(
      "Fake bans people (r/realme Community Discord & bot developer exclusive)"
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
    const { client, guild } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    let user = await interaction.options.getUser("user").fetch(true);
    let member = await interaction.options.getMember("user");
    let reason = interaction.options.getString("reason");
    let role = await guild.roles.fetch("964481713269002251");
    if (interaction.guild.id !== "633535718559580179")
      return interaction.reply({
        embeds: [
          {
            color: "#db574f",
            title: "**Fake Ban System**",
            description:
              "This command is exclusively on [r/realme Community](https://discord.gg/wJYkea7Rdv)!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + botOwner,
            },
          },
        ],
        ephemeral: true,
      });

    if (!interaction.member.permissions.has("BAN_MEMBERS"))
      return interaction.reply({
        embeds: [
          {
            color: "#db574f",
            title: "**Fake Ban System**",
            description: "Only the moderators can perform this action!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + botOwner,
            },
          },
        ],
        ephemeral: true,
      });
    await interaction.reply({
      embeds: [
        {
          color: "#68b386",
          description: `<:hSuccess:956980119086465124> ***${user.tag} was banned*** | ${reason}`,
        },
      ],
    });
    await user.send({
      embeds: [
        {
          color: "#db574f",
          description: `You were banned from r/realme Community | ${reason}`,
        },
      ],
    });
    await user.send({
      embeds: [
        {
          color: "#db574f",
          description: `Just kidding, this isn't an actual ban.`,
        },
      ],
    });
    if (user.nickname === null) {
      await member.roles.add(role);
      await wait(5000);
      await member.roles.remove(role);
    }
    if (user.nickname !== null) {
      let originalNickname = member.nickname;
      await member.setNickname("");
      await member.roles.add(role);
      await wait(5000);
      await member.roles.remove(role);
      await member.setNickname(originalNickname);
    }
  },
};

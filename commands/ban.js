require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Fake bans people!")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption((option) => option.setName("user").setDescription("The user you want to ban").setRequired(true))
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason why you are banning the user").setRequired(true)
    ),
  async execute(interaction) {
    const { guild } = interaction;
    let user = await interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    await interaction.reply({
      embeds: [
        {
          color: 0x43b582,
          description: `<:botSuccess:1279325617476735098> ***${user.tag} was banned*** | ${reason}`,
        },
      ],
    });

    try {
      await user.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `You were banned from ${guild.name} | ${reason}`,
          },
        ],
      });
      wait(5000);
      await user.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `Just kidding, this isn't an actual ban.`,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }

    if (guild.id === "633535718559580179") {
      let member = await interaction.options.getMember("user");
      let role = await guild.roles.fetch("964481713269002251");
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
    }
  },
};

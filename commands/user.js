require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Look up someone's Discord profile information!")
    .addUserOption((option) => option.setName("user").setDescription("The user you want to look up").setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**User Information**",
          description: "Here's the user information!",
          thumbnail: {
            url: member.user.displayAvatarURL({ size: 2048, dynamic: true }),
          },
          fields: [
            {
              name: "Username",
              value: member.user.tag,
              inline: true,
            },
            {
              name: "Nickname",
              value: member.nickname || "None",
              inline: true,
            },
            {
              name: "User ID",
              value: `\`\`\`${member.user.id}\`\`\``,
            },
            {
              name: "Roles",
              value: member.roles.cache.map((role) => role.toString()).join(", "),
            },
            {
              name: "Account Creation Date",
              value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`,
            },
            {
              name: "Joined Server",
              value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
            },
          ],
        },
      ],
    });
  },
};

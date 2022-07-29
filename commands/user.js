require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Look up someone's Discord profile information!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to look up")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get(process.env.OWNERID).tag;
    let member = await interaction.options.getUser("user").fetch(true);
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**User Information**",
          description: "Here's the user information!",
          thumbnail: {
            url: member.displayAvatarURL({ size: 2048, dynamic: true }),
          },
          fields: [
            {
              name: "Username + Tag",
              value: member.tag,
            },
            {
              name: "User ID",
              value: member.id,
            },
            {
              name: "Account Creation Date",
              value: `<t:${parseInt(member.createdTimestamp / 1000)}:R>`,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

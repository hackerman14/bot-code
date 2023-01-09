require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDescription("Restarts the bot! (Bot developer exclusive)"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = `${process.env.BOTOWNER}`;
    if (interaction.user.id !== process.env.OWNERID)
      return interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**iReboot**",
            description: "Only the bot owner can perform this action!",
            timestamp: new Date().toISOString(),
            footer: {
              text: `Made with ❤️ created by ${botOwner}`,
            },
          },
        ],
        ephemeral: true,
      });
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**iReboot**",
          description: "Bot is now rebooting!",
          timestamp: new Date().toISOString(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
      ephemeral: true,
    });
    await client.destroy();
    return process.exit(0);
  },
};

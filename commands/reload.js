require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers) // You don't want most of the people to see this command
    .setDescription("Restarts the bot! (Bot developer exclusive)"),
  async execute(interaction) {
    const { client } = interaction;
    if (interaction.user.id !== process.env.OWNERID)
      return interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**iReboot**",
            description: "Only the bot owner can perform this action!",
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
        },
      ],
      ephemeral: true,
    });
    await client.destroy();
    return process.exit(0);
  },
};

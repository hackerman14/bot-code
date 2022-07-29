const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Restarts the bot! (Bot developer exclusive)"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    if (interaction.user.id !== "410839910204047360")
      return interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**iReboot**",
            description: "Only the bot owner can perform this action!",
            timestamp: new Date(),
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
          timestamp: new Date(),
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

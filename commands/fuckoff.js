require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fuckoff")
    .setDescription("A fancy way to kick this bot! >:(")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  async execute(interaction) {
    const { guild } = interaction;
    
    const actionRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("cancel").setLabel("Cancel").setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId("leaveNow").setLabel("Leave Now").setStyle(ButtonStyle.Danger)
    );
    
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({
        embeds: [
          {
            color: "#db574f",
            title: "**You Hate Me™**",
            description: "Only the moderators can perform this action!",
          },
        ],
        ephemeral: true,
      });
    }

    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**You Hate Me™**",
          description:
            "Sorry to see you go, the bot will leave within 30 seconds after executing the command.\n**To cancel the action or leave immediately, click on the buttons below.**",
        },
      ],
      components: [actionRow],
    });

    const filter = (i) => ["cancel", "leaveNow"].includes(i.customId) && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 30000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "cancel") {
        actionRow.components.forEach(component => component.setDisabled(true));
        await i.update({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**You Hate Me™**",
              description: "Action cancelled!",
            },
          ],
          components: [actionRow],
          ephemeral: true,
        });
        collector.stop();
      } else if (i.customId === "leaveNow") {
        actionRow.components.forEach(component => component.setDisabled(true));
        await i.update({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**You Hate Me™**",
              description: "Leaving now! Thank you for using hackerman14 bot, have a nice day!",
            },
          ],
          components: [actionRow],
          ephemeral: true,
        });
        collector.stop();
        guild.leave();
      }
    });

    collector.on("end", async (collection, reason) => {
      if (reason === 'time' && collection.size === 0) {
        actionRow.components.forEach(component => component.setDisabled(true));
        await interaction.editReply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**You Hate Me™**",
              description: "Thank you for using hackerman14 bot, have a nice day!",
            },
          ],
          components: [actionRow],
          ephemeral: true,
        });
        guild.leave();
      }
    });
  },
};

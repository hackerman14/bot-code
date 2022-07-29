require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fuckoff")
    .setDescription("A fancy way to kick this bot! >:(")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  async execute(interaction) {
    const { client, guild } = interaction;
    const botOwner = client.users.cache.get(process.env.OWNERID).tag;
    const cancelAction = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("cancel")
        .setLabel("Cancel")
        .setStyle("DANGER")
    );
    if (!interaction.member.permissions.has("KICK_MEMBERS"))
      return interaction.reply({
        embeds: [
          {
            color: "#db574f",
            title: "**You Hate Me™**",
            description: "Only the moderators can perform this action!",
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
          title: "**You Hate Me™**",
          description:
            "Sorry to see you go, the bot will leave within 60 seconds after executing the command.\n**To cancel the action, click on the button below.**",
          timestamp: new Date().toISOString(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
      components: [cancelAction],
    });
    const filter = (i) => i.customId === "cancel";
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 600000,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "cancel") {
        cancelAction.components[0].setDisabled(true)
        await i.update({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**You Hate Me™**",
              description: "Action cancelled!",
              timestamp: new Date().toISOString(),
              footer: {
                text: `Made with ❤️ created by ${botOwner}`,
              },
            },
          ],
          components: [cancelAction],
          ephemeral: true,
        });
      }
    });
    collector.on("end", (collection) => {
      if (collection.first()?.customId === "cancel") {
        return
      } else {
        cancelAction.components[0].setDisabled(true)
        interaction.editReply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**You Hate Me™**",
              description:
                "Thank you for using hackerman14 bot, have a nice day!",
              timestamp: new Date().toISOString(),
              footer: {
                text: `Made with ❤️ created by ${botOwner}`,
              },
            },
          ],
          components: [cancelAction],
          ephemeral: true,
        });
        guild.leave();
      }
    });
  },
};
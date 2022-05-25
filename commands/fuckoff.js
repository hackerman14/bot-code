const { MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fuckoff")
    .setDescription("A fancy way to kick this bot! >:("),
  async execute(interaction) {
    const { client, guild } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    const cancelAction = new MessageActionRow().addComponents(
      new MessageButton()
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
          color: "RANDOM",
          title: "**You Hate Me™**",
          description:
            "Sorry to see you go, the bot will leave within 60 seconds after executing the command.\n**To cancel the action, click on the button below.**",
          timestamp: new Date(),
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
              color: "RANDOM",
              title: "**You Hate Me™**",
              description: "Action cancelled!",
              timestamp: new Date(),
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
              color: "RANDOM",
              title: "**You Hate Me™**",
              description:
                "Thank you for using hackerman14 bot, have a nice day!",
              timestamp: new Date(),
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
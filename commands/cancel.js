require("dotenv").config();
const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cancel")
    .setDescription("Cancels people!")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setContexts(InteractionContextType.Guild)
    .addUserOption((option) => option.setName("user").setDescription("The user you want to cancel").setRequired(true))
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason why you are cancelling the user").setRequired(true)
    ),
  async execute(interaction) {
    const { guild } = interaction;
    let user = await interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    await interaction.reply({
      embeds: [
        {
          color: 0x43b582,
          description: `<:botSuccess:1279325617476735098> ***${user.tag} was cancelled.***`,
        },
      ],
    });

    try {
      await user.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `You were cancelled from ${guild.name} for ${reason}. \n You'll also be cancelled on twitter and posted on r/discordapp & 4chan.`,
          },
        ],
      });
      wait(5000);
      await user.send({
        embeds: [
          {
            color: 0xf04a47,
            description: `Just kidding, you didn't actually get cancelled.`,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  },
};

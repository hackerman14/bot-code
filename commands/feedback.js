require("dotenv").config();
const { SlashCommandBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("feedback").setDescription("Send some feedback to the bot developer! (This doesn't work at the moment)"),
  async execute(interaction) {
    const { client } = interaction;
    const modal = new ModalBuilder().setCustomId("sendFeedback").setTitle("Send Feedback");
    const subjectInput = new TextInputBuilder()
      .setCustomId("subjectInput")
      .setLabel("Subject")
      .setPlaceholder("Bug Report")
      .setStyle(TextInputStyle.Short)
      .setMinLength(5)
      .setMaxLength(100)
      .setRequired(true);
    const feedbackInput = new TextInputBuilder()
      .setCustomId("feedbackInput")
      .setLabel("Your Feedback")
      .setPlaceholder("Hello, I'm having a problem with the bot!")
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(10)
      .setMaxLength(1000)
      .setRequired(true);
    const subject = new ActionRowBuilder().addComponents(subjectInput);
    const feedback = new ActionRowBuilder().addComponents(feedbackInput);
    modal.addComponents(subject, feedback);
    await interaction.showModal(modal);

    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isModalSubmit()) return;

      const userSubject = interaction.fields.getTextInputValue("subjectInput");
      const userFeedback = interaction.fields.getTextInputValue("feedbackInput");
      console.log({ userSubject, userFeedback });

      if (interaction.customId === "sendFeedback") {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Feedback**",
              description: "Successfully sent feedback!",
            },
          ],
          flags: MessageFlags.Ephemeral,
        });
      }
    });
  },
};

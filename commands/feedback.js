require("dotenv").config();
const {
  MessageActionRow,
  MessageSelectMenu,
  Modal,
  TextInputComponent,
} = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("Send some feedback to the bot developer!"),
  async execute(interaction) {
    const modal = new Modal().setCustomId("sendFeedback").setTitle("Send Feedback");
    const subjectInput = new TextInputComponent()
      .setCustomId("subjectInput")
      .setLabel("Subject")
      .setPlaceholder("Bug Report")
      .setStyle("SHORT")
      .setRequired(true);
    const feedbackInput = new TextInputComponent()
      .setCustomId("feedbackInput")
      .setLabel("Your Feedback")
      .setPlaceholder("Hello, I'm having a problem with the bot!")
      .setStyle("PARAGRAPH")
      .setRequired(true);
    const subject = new MessageActionRow().addComponents(subjectInput);
    const feedback = new MessageActionRow().addComponents(feedbackInput);
    modal.addComponents(subject, feedback);
    await interaction.showModal(modal);
    const userSubject = interaction.fields.getTextInputValue("subjectInput");
    const userFeedback = interaction.fields.getTextInputValue("feedbackInput");
    console.log({ userSubject, userFeedback });
  },
};

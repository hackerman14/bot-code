require("dotenv").config();
const {
  SlashCommandBuilder,
  Events,
  LabelBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  MessageFlags,
} = require("discord.js");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription(
      "Send some feedback to the bot developer! (This doesn't work at the moment)"
    ),
  async execute(interaction) {
    const { client } = interaction;
    const modal = new ModalBuilder()
      .setCustomId("sendFeedback")
      .setTitle("Send Feedback");

    const feedbackTypeSelect = new StringSelectMenuBuilder()
      .setCustomId("feedbackType")
      .setPlaceholder("Make a selection!")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Bug Report")
          .setDescription("Report a bug or issue with the bot.")
          .setValue("bugReport"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Feature Request")
          .setDescription("Suggest a new feature or UX improvement.")
          .setValue("featureRequest"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Other")
          .setDescription("Other types of feedback.")
          .setValue("other")
      );
    const feedbackTypeLabel = new LabelBuilder()
      .setLabel("Feedback Type")
      .setStringSelectMenuComponent(feedbackTypeSelect);

    const subjectInput = new TextInputBuilder()
      .setCustomId("subjectInput")
      .setPlaceholder("/something command is broken")
      .setStyle(TextInputStyle.Short)
      .setMinLength(5)
      .setMaxLength(100)
      .setRequired(true);
    const subjectLabel = new LabelBuilder()
      .setLabel("Subject")
      .setTextInputComponent(subjectInput);

    const feedbackInput = new TextInputBuilder()
      .setCustomId("feedbackInput")
      .setPlaceholder("When I use /something, it gives me an error...")
      .setStyle(TextInputStyle.Paragraph)
      .setMinLength(10)
      .setMaxLength(1000)
      .setRequired(true);
    const feedbackLabel = new LabelBuilder()
      .setLabel("Feedback")
      .setTextInputComponent(feedbackInput);

    modal.addLabelComponents(feedbackTypeLabel, subjectLabel, feedbackLabel);
    await interaction.showModal(modal);

    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isModalSubmit()) return;

      const FEEDBACK_TYPE_MAP = {
        bugReport: "Bug Report",
        featureRequest: "Feature Request",
        other: "Other",
      };

      const username = interaction.user.username;
      const rawFeedbackType =
        interaction.fields.getStringSelectValues("feedbackType")[0];
      const userFeedbackType = FEEDBACK_TYPE_MAP[rawFeedbackType];
      const userSubject = interaction.fields.getTextInputValue("subjectInput");
      const userFeedback =
        interaction.fields.getTextInputValue("feedbackInput");

      await resend.emails.send({
        from: `hackerman14 Bot Feedback <${process.env.EMAIL_SENDER}>`,
        to: process.env.EMAIL_RECEIVER,
        template: {
          id: "hackerman14-bot-feedback",
          variables: {
            FEEDBACK_TYPE: userFeedbackType,
            FEEDBACK_SUBJECT: userSubject,
            FEEDBACK_CONTENT: userFeedback,
            USERNAME: username,
          },
        },
      });

      if (interaction.customId === "sendFeedback") {
        interaction.reply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Feedback**",
              description: "Thanks for your feedback!",
            },
          ],
          flags: MessageFlags.Ephemeral,
        });
      }
    });
  },
};

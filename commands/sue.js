require("dotenv").config();
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionContextType,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sue")
    .setDescription("Fake lawsuits to sue anyone!")
    .setContexts(InteractionContextType.Guild)
    .addUserOption((option) =>
      option.setName("user").setDescription("The user you want to start a lawsuit against").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("details").setDescription("Details what the user violated").setRequired(true)
    ),
  async execute(interaction) {
    let user = await interaction.options.getUser("user");
    let details = interaction.options.getString("details");
    let sentence;
    let additionalFooterNote;

    const convertBtn = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("convert").setLabel("Convert to Verdict").setStyle(ButtonStyle.Primary)
    );

    if (user.id === interaction.user.id)
      return interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**Lawsuit Generator**",
            description: "Why would you sue yourself?",
          },
        ],
        flags: MessageFlags.Ephemeral,
      });

    if (user.bot === true && interaction.user.id === process.env.OWNERID) {
      sentence = "Defendant needs to pay the plaintiff $10M USD\nDefendant sentenced to death";
      additionalFooterNote = "";
    } else if (user.id === process.env.OWNERID) {
      sentence = "Plaintiff needs to pay the defendant $10M USD\nPlaintiff sentenced to death";
      additionalFooterNote = "imagine suing the owner lol, i own this court dude";
    } else if (user.bot === true) {
      sentence = "Defendant is not guilty\nPlaintiff needs to pay the defendant $1M USD";
      additionalFooterNote = "imagine suing a bot lol";
    } else {
      sentence = "Death Penalty";
      additionalFooterNote = "";
    }

    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Lawsuit Generator**",
          description: "Sucessfully generated your *totally real* complaint!",
          fields: [
            {
              name: "Plaintiff",
              value: interaction.user.displayName,
            },
            {
              name: "Defendant",
              value: user.displayName,
            },
            {
              name: "Details",
              value: details,
            },
          ],
          footer: {
            text: `Disclaimer: It's not real.` || `Disclaimer: It's not real. also ${additionalFooterNote}`,
          },
        },
      ],
      components: [convertBtn],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 15000,
    });

    collector.on("ignore", (i) =>
      i.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**Lawsuit Generator**",
            description: "You're not the author of the lawsuit!",
          },
        ],
        flags: MessageFlags.Ephemeral,
      })
    );
    collector.on("collect", async (i) => {
      if (i.customId === "convert") {
        await i.deferUpdate();
        await i.editReply({
          embeds: [
            {
              color: 0x0ccab6,
              title: "**Lawsuit Generator**",
              description: "Here's your *totally real* verdict!",
              fields: [
                {
                  name: "Plaintiff",
                  value: interaction.user.tag,
                },
                {
                  name: "Defendant",
                  value: user.tag,
                },
                {
                  name: "Original Details",
                  value: details,
                },
                {
                  name: "Law Violated",
                  value: `hackerman14 Law Chapter ${Math.floor(Math.random() * 100)} Section ${Math.floor(
                    Math.random() * 100
                  )}, Article ${Math.floor(Math.random() * 100)}, Paragraph ${Math.floor(
                    Math.random() * 100
                  )}, Subparagraph ${Math.floor(Math.random() * 100)}, Item ${Math.floor(Math.random() * 100)}`,
                },
                {
                  name: "Sentence",
                  value: sentence,
                },
              ],
              footer: {
                text:
                  additionalFooterNote === ""
                    ? `Disclaimer: It's not real.`
                    : `Disclaimer: It's not real. also ${additionalFooterNote}`,
              },
            },
          ],
          components: [],
        });
      }
    });
  },
};

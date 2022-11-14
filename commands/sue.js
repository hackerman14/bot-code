require("dotenv").config();
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sue")
    .setDescription("Fake lawsuits to sue anyone!")
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to start a lawsuit against")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("details")
        .setDescription("Details what the user violated")
        .setRequired(true)
    ),
  async execute(interaction) {
    const botOwner = `${process.env.BOTOWNER}`;
    let user = await interaction.options.getUser("user");
    let details = interaction.options.getString("details");
    let sentence;
    let additionalFooterNote;

    const convertBtn = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("convert")
        .setLabel("Convert to Verdict")
        .setStyle(ButtonStyle.Primary)
    );

    if (user.id === interaction.user.id)
      return interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "**Lawsuit Generator**",
            description: "Why would you sue yourself?",
            footer: {
              text: `Made with ❤️ created by ${botOwner}`,
            },
          },
        ],
        ephemeral: true,
      });

    if (user.id === process.env.OWNERID) {
      sentence =
        "Plaintiff needs to pay the defendant $10M USD\nPlaintiff sentenced to death";
      additionalFooterNote =
        "imagine suing the owner lol, i own this court dude";
    } else if (user.bot === true) {
      sentence =
        "Defendant is not guilty\nPlaintiff needs to pay the defendant $1M USD";
      additionalFooterNote = "imagine suing a bot lol";
    } else {
      sentence = "Death Penalty";
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
              value: interaction.user.tag,
            },
            {
              name: "Defendant",
              value: user.tag,
            },
            {
              name: "Details",
              value: details,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text:
              `Disclaimer: It's not real.\nMade with ❤️ created by ${botOwner}` ||
              `Disclaimer: It's not real. also ${additionalFooterNote}\nMade with ❤️ created by ${botOwner}`,
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
        ephemeral: true,
        embeds: [
          new EmbedBuilder({
            title: "**Lawsuit Generator**",
            description: "You're not the author of the lawsuit!",
          }),
        ],
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
              description: "Sucessfully generated your *totally real* verdict!",
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
                  value: `hackerman14 Law Chapter ${Math.floor(
                    Math.random() * 100
                  )} Section ${Math.floor(
                    Math.random() * 100
                  )}, Article ${Math.floor(
                    Math.random() * 100
                  )}, Paragraph ${Math.floor(
                    Math.random() * 100
                  )}, Subparagraph ${Math.floor(
                    Math.random() * 100
                  )}, Item ${Math.floor(Math.random() * 100)}`,
                },
                {
                  name: "Sentence",
                  value: sentence,
                },
              ],
              timestamp: new Date().toISOString(),
              footer: {
                text:
                  `Disclaimer: It's not real.\nMade with ❤️ created by ${botOwner}` ||
                  `Disclaimer: It's not real. also ${additionalFooterNote}\nMade with ❤️ created by ${botOwner}`,
              },
            },
          ],
          components: [],
        });
      }
    });
  },
};

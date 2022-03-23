const { client } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8")
    .setDescription("Ask any yes/no question, and it will answer you something!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Yes/No questions only")
        .setRequired(true)
    ),

  async execute(interaction) {
    var answers = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    await interaction.deferReply();
    await wait(1500);
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: "**The Legendary 8 Ball**",
          description: "This smart ball has something to tell you.",
          fields: [
            {
              name: "Your Question",
              value: interaction.options.getString("question"),
            },
            {
              name: "The 8 Ball's Big Words",
              value: randomAnswer,
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
  },
};

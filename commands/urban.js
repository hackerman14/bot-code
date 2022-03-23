const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("urban")
    .setDescription("Look up a word or phrase on Urban Dictionary!")
    .addStringOption((option) =>
      option
        .setName("word_or_phrase")
        .setDescription(
          "Type the word or phrase you want to look up on Urban Dictionary"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    let search = interaction.options.getString("word_or_phrase");
    let link = "https://api.urbandictionary.com/v0/define?term=";
    let fetch = await axios(link + encodeURI(search));
    fetch = fetch.data.list;

    if (!interaction.channel.nsfw)
      return interaction.reply({
        embeds: [
          {
            color: "RANDOM",
            title: "**Urban Dictionary**",
            description:
              "Due to NSFW topic definitions so please run this command in an age restricted channel!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner,
            },
          },
        ],
        ephemeral: true,
      });
    if (fetch === 0)
      return interaction.reply({
        embeds: [
          {
            color: "RANDOM",
            title: "**Urban Dictionary**",
            description:
              "What you're looking for doesn't exist on Urban Dictionary!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner,
            },
          },
        ],
        ephemeral: true,
      });
    let data = fetch[0];
    let definition = data.definition;
    let example = data.example;
    let permalink = data.permalink;
    let thumbsUp = data.thumbs_up;
    let thumbsDown = data.thumbs_down;
    let title = data.word;

    definition =
      definition.length >= 1024
        ? definition.slice(0, 1020) + "..."
        : definition;
    example = example.length >= 1024 ? example.slice(0, 1020) + "..." : example;

    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Urban Dictionary**",
          description:
            "What you're looking for doesn't exist on Urban Dictionary!",
          fields: [
            {
              name: "Word / Phrase",
              value: `[${title}](${permalink})`,
            },
            {
              name: "Definition",
              value: definition,
            },
            {
              name: "Usage Example",
              value: example,
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

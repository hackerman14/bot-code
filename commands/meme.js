const randomPuppy = require("random-puppy");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Replies with pong!"),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    let subReddits = [
      "dankmeme",
      "memes",
      "me_irl",
      "AdviceAnimals",
      "MemeEconomy",
      "ComedyCemetery",
      "PrequelMemes",
      "terriblefacebookmemes",
      "PewdiepieSubmissions",
      "funny",
      "teenagers",
    ];
    let random = subReddits[Math.floor(Math.random() * subReddits.length)];
    let meme = await randomPuppy(random);
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Reddit Memes**",
          description: `A meme from {/r/${random}}`,
          timestamp: new Date(),
          image: {
            url: meme,
          },
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

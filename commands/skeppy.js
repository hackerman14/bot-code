require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skeppy")
    .setDescription("Tells you a random Skeppy quotes according to Wikitubia!"),
  async execute(interaction) {
    const botOwner = `${process.env.BOTOWNER}`;
    var quotes = [
      "like or die tmr",
      "YOOO how's it going guys! welkom back to another video!",
      "i love you guys, i fucking love you guys",
      "ALRIGHT! so in today's video...",
      "NOOOO!",
      "m",
      "QUIT GAME",
      "hanyah hanyah HANYAAHHHH!!!!",
      "BadBoyHalo is a potato",
      "today i'm joined here by BaldBoyNoob",
      "BaldBoyHalo",
      "french man",
      "the bisectors of the perpendicularity of the vectors",
      "uh oh spaghettio",
      "...it's 'cause everyone knows I'm a dog",
      "shut up halo",
      "oh shoot there's a mod on",
      "*eagle loud screaming especially when he eats the spicy sauce*",
      "i was testing",
      "I JUST WANTED SANDDDD!!!",
      "i'm a little police man/boi",
      "if it's not worth it don't do it",
      "if it's worth it do it",
      "14",
      "WHY DID YOU DO IT!?!?",
      "do not do this or u will see",
      "quack",
      "quork",
      "FACE ID BITCH",
      "flip flop",
      "skippy",
      "ping spoofing",
      "turtle",
      "daddy",
      "magnifying glass tilted left/right",
      "jif",
      "cheesy fries",
      "ding",
      "oh my goodness",
      "idot",
      "SOTP",
      "pine cone",
      "thin-crust pizza",
      "slash slash undo",
      "candad",
      "japanese symbol for beginner",
      "cursed",
      "wee woo",
      "kids trapped in the basement",
      "mobile heal pool",
      "simp pool",
      "bisector",
      "diameter",
      "photosynthesis",
      "perpendicularity",
      "mr. squeegy",
      "trapping 100 kids",
      "hot dog strategy",
    ];
    var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Skeppy Meme**",
          description: randomQuote,
          timestamp: new Date().toISOString(),
          footer: {
            text: `Made with ❤️ created by ${botOwner}`,
          },
        },
      ],
    });
  },
};

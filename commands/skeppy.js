require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skeppy")
    .setDescription("Tells you a random Skeppy (or related) quote along with its meaning!"),
  async execute(interaction) {

    var quotes = [
      {
        quote: "like or die tmr",
        meaning: "Typical Skeppy's outro text",
      },
      {
        quote: "YOOO how's it going guys! welkom back to another video!",
        meaning: "Typical Skeppy's intro sentence",
      },
      {
        quote: "i love you guys, i fucking love you guys",
        meaning: "Some quote from a stream",
      },
      {
        quote: "ALRIGHT! so in today's video...",
        meaning: "Typical Skeppy's intro sentence",
      },
      {
        quote: "NOOOO!",
        meaning: "When Skeppy messes up something",
      },
      {
        quote: "m",
        meaning: 'That one time when Skeppy accidentally typed "m" in his server\'s global chat',
      },
      {
        quote: "QUIT GAME",
        meaning: "He's done with a video and tries to end it at a random point",
      },
      {
        quote: "hanyah hanyah HANYAAHHHH!!!!",
        meaning: "Noise Skeppy usually makes during fights",
      },
      {
        quote: "BadBoyHalo is a potato",
        meaning: "A rhyme to piss BadBoyHalo off",
      },
      {
        quote: "today i'm joined here by BaldBoyNoob",
        meaning: "A name to piss BadBoyHalo off",
      },
      {
        quote: "BaldBoyHalo",
        meaning:
          "BadBoyHalo wasn't actually bald but Skeppy calls him bald due to a photo of BadBoyHalo he found online",
      },
      {
        quote: "BitchBoyHalo",
        meaning: "A name to piss BadBoyHalo off",
      },
      {
        quote: "french man",
        meaning: "A funny way to call a6d",
      },
      {
        quote: "the bisectors of the perpendicularity of the vectors",
        meaning: "Nonsense words to mess with people",
      },
      {
        quote: "uh oh spaghettio",
        meaning: "Probably something BadBoyHalo said",
      },
      {
        quote: "...it's 'cause everyone knows I'm a dog",
        meaning: "i don't actually know what this quote is",
      },
      {
        quote: "shut up halo",
        meaning: "Telling BadBoyHalo to shut up",
      },
      {
        quote: "oh shoot there's a mod on",
        meaning: "Skeppy finds out there's other staff member on a Minecraft server",
      },
      {
        quote: "*eagle loud screaming especially when he eats the spicy sauce*",
        meaning: "[Beautiful voice during a SkyWars hot sauce challenge](https://youtu.be/dZV5YxTYX1Q&t=75)",
      },
      {
        quote: "i was testing",
        meaning:
          "Something Skeppy said when he griefed BadBoyHalo's server when he found out there was a glitch where the staff can unban themselves",
      },
      {
        quote: "I JUST WANTED SANDDDD!!!",
        meaning: "Some quote from a stream",
      },
      {
        quote: "i'm a little police man/boi",
        meaning: "Some quote from a stream",
      },
      {
        quote: "if it's not worth it don't do it",
        meaning: "Trashtalking",
      },
      {
        quote: "if it's worth it do it",
        meaning: "Trashtalking",
      },
      {
        quote: "14",
        meaning: "A random number that Skeppy made a6d say repeatedly to piss BadBoyHalo off",
      },
      {
        quote: "WHY DID YOU DO IT!?!?",
        meaning: "BadBoyHalo gets mad",
      },
      {
        quote: "do not do this or u will see",
        meaning: "Something to intimidate people",
      },
      {
        quote: "quack",
        meaning: "Duck",
      },
      {
        quote: "quork",
        meaning: "Duck",
      },
      {
        quote: "FACE ID BITCH",
        meaning: "Some quote from a steam",
      },
      {
        quote: "flip flop",
        meaning: "Really old meme that no one remembers",
      },
      {
        quote: "skippy",
        meaning:
          'Peanut butter brand that sounds like Skeppy\'s username, but Skeppy actually got his username from the word "skeptical"',
      },
      {
        quote: "ping spoofing",
        meaning: "A type of hack that Skeppy keeps mentioning to piss BadBoyHalo off",
      },
      {
        quote: "turtle",
        meaning: "Random bits of words",
      },
      {
        quote: "daddy",
        meaning: "Random bits of words",
      },
      {
        quote: "magnifying glass tilted left/right",
        meaning:
          "Two random emojis that triggers BadBoyHalo's stream donation TTS which is a pretty long sentence, and people used to send their donation messages with over tens of emojis, making the stream sound filled with name of these two emojis",
      },
      {
        quote: "jif",
        meaning: "A user on InvadedLands that pisses Skeppy off",
      },
      {
        quote: "cheesy fries",
        meaning: "Something BadBoyHalo eats",
      },
      {
        quote: "ding",
        meaning: 'BadBoyHalo\'s "ding ding ding ding ding, ding ding ding ding ding ding ding"',
      },
      {
        quote: "oh my goodness",
        meaning: "Something BadBoyHalo says all the time",
      },
      {
        quote: "idot",
        meaning: '"Idiot" misspelled',
      },
      {
        quote: "SOTP",
        meaning: '"Stop" misspelled',
      },
      {
        quote: "pine cone",
        meaning: "A random thing that Skeppy looked up on Google that BadBoyHalo is confused about",
      },
      {
        quote: "thin-crust pizza",
        meaning: "A kind of pizza that Skeppy sent 72 of them to BadBoyHalo for a video",
      },
      {
        quote: "slash slash undo",
        meaning:
          'WorldEdit command "//undo" which will undo what you performed recently with WorldEdit, and Skeppy instead types out the text to piss BadBoyHalo off',
      },
      {
        quote: "candad",
        meaning: '"Canada" misspelled',
      },
      {
        quote: "japanese symbol for beginner",
        meaning:
          "A random emoji that triggers BadBoyHalo's stream donation TTS which is a pretty long sentence, and people used to send their donation messages with over tens of emojis, making the stream sound filled with name of the emoji",
      },
      {
        quote: "cursed",
        meaning: "Cursed Minecraft events",
      },
      {
        quote: "wee woo",
        meaning: "Random bits of words",
      },
      {
        quote: "kids trapped in the basement",
        meaning: "Skeppy's events",
      },
      {
        quote: "mobile heal pool",
        meaning: "Alternative name of Golden Apples created by BadBoyHalo",
      },
      {
        quote: "simp pool",
        meaning: "Heal pool but for simps",
      },
      {
        quote: "bisector",
        meaning: "Nonsense word to mess with people",
      },
      {
        quote: "diameter",
        meaning: "Nonsense word to mess with people",
      },
      {
        quote: "photosynthesis",
        meaning: "Nonsense word to mess with people",
      },
      {
        quote: "perpendicularity",
        meaning: "Nonsense word to mess with people",
      },
      {
        quote: "mr. squeegy",
        meaning: "The name of BadBoyHalo's Minecraft pet fish",
      },
      {
        quote: "trapping 100 kids",
        meaning: "Skeppy's events series",
      },
      {
        quote: "hot dog strategy",
        meaning: "A BedWars defense strategy that BadBoyHalo frequently uses",
      },
    ];

    var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Skeppy Quotes**",
          description: "Another day, another Skeppy's (and related) classic quote.",
          fields: [
            {
              name: "Quote",
              value: randomQuote.quote,
            },
            {
              name: "Meaning",
              value: randomQuote.meaning,
            },
          ],
          
        },
      ],
    });
  },
};

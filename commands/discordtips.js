const { SlashCommandBuilder } = require("@discordjs/builders");

let owner = "Raymond#2829";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("discordtips")
    .setDescription('Tells you a random Discord "Did you know" text upon the app startup!'),
  async execute(interaction) {
    var tips = [
      "Discord's official birthday is May 13, 2015.",
      "`CTRL` `K` / `CMD` `K` to quickly find a previous conversation or channel.",
      "We came up with the idea of Discord Nitro over morning beakfast potatoes.",
      "`ALT` `CLICK` a message to mark it as unread.",
      "Discord started as a game company making a mobile game called Fates Forever.",
      "Click a server name in the emoji picker to hide that server's emoji.",
      "Discord was almost called Wyvern before we picked our name. Not too proud of that one. ",
      "Drag and drop servers on top of each other to create server folders.",
      "Group DMs can have up to ten members.",
      "Discord was almost called Bonfire before we picked our name. It was meant to be nice and cozy.",
      "You can type /tableflip and /unflip to spice up your messages.",
      "You can temporarily mute a server or channel by right-clicking it.",
      "Customize Discord's appearance in the user setings menu.",
      "There's a very small—and we mean small— chance you can get a secret ringtone when calling someone. Good luck! ",
      "A red mic icon means that person has been muted by a server admin.",
      "`SHIFT` `ENTER` to make a new line without sending your message.",
      "You can play our versione of the Snake game on our 404 page by pressing a ~secret~ button.",
      "Hover a GIF and click the star to save it to your) favorites.",
      "`SHIFT` `ALT` `↑` or `↓` will navigate between unread channels.",
      "The charcter on our 404 page is a robot hamster named Nelly.",
      "Highlight text in your chat bar to bold, use iltalics, and more.",
      "Click your avatar in the lower-left corner to set a custom status.",
      "Holding `SHIFT` while clicking emoji allows you to send multiple emoji.",
      "Our old Partener mascot was an elf named Springle. He recently retired.",
      "You can type /nick to quickly change your nickname in a server.",
      "Right click to pin messages in a channel or DM to save them for later.",
      
    ];
    var randomTip = tips[Math.floor(Math.random() * tips.length)];
    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Discord Tips**",
          description: randomTip,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
    });
  },
};

// Main Code Rules

const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBTOKEN, client);
const db = require("quick.db");
const fetch = require("node-fetch");
const queue = new Map();
const prefix = "rh!";
const emojiNext = "➡"; // Unicodes are auto identified in Discord, so it's fine!
const emojiPrevious = "⬅";
const reactionArrow = [emojiPrevious, emojiNext];
const time = 600000; // Menu Timeout: 10 Minutes
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);

let cooldown = new Set();
let cdseconds = 5;

// Console Logging

client.once("ready", () => {
  console.log("Ready!");
  console.log(
    "The bot is currently on " +
      client.guilds.size +
      " severs, and will be serving " +
      client.users.size +
      " users!"
  );
  client.user
    .setActivity("Type 'rh!help' for help!", {
      type: "PLAYING"
    })
    .then(presence =>
      console.log(
        `Activity set to "${presence.game ? presence.game.name : "none"}"`
      )
    )
    .catch(console.error);

  client.user.setStatus("dnd");
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

dbl.on("posted", () => {
  console.log("Server count is posted on TOP.gg!");
});
dbl.on("error", e => {
  console.log(`An error occurred to TOP.gg! ${e}`);
});

// Client Codes

client.on("message", async message => {
  // Client Rules

  let msg = message.content.toLowerCase();
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  const channel = message.channel;
  const args = message.content.substring(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  // Commands Cooldown & All Commands
  if (cooldown.has(message.author.id)) {
    message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Command Cooldown**",
        description:
          "Dude you have to wait 1 seconds before you can do another command!",
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  } else {
    // Every commands goes here!

    // Set Custom Prefix

    if (msg.startsWith(`${prefix}setprefix`)) {
      let fetched = await db.fetch(`prefix_${message.guild.id}`);
      if (!fetched === null) prefix = "rh!";
      else prefix = fetched;

      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Prefix Changer**",
            description: "No, you aren't allowed to change my prefix! HA!",
            fields: [],
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by Raymond#1725"
            }
          }
        });

      db.set(`prefix_${message.guild.id}`, args.join(" ")).then(i => {
        message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Prefix Changer**",
            description: "Sucessfully set the prefix!",
            fields: [],
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by Raymond#1725"
            }
          }
        });
      });
    }

    // DM

    if (message.channel.type == "dm") {
      message.author.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Bruh Moment**",
          description: "You realise that I don't work in DMs...",
          fields: [],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
      return;
    }

    // Commands

    if (msg.startsWith(`${prefix}help`)) {
      sendList(channel, getList);
      return;
    }

    if (msg.startsWith(`${prefix}about`)) {
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**About This Bot**",
          description: "The information about this bot!",
          fields: [
            {
              name: "Bot Name",
              value: "hackerman14"
            },
            {
              name: "Creator",
              value: "[Raymond#1725](https://raymond-1227.github.io)"
            },
            {
              name: "Host",
              value: "[Glitch.com](https://glitch.com)"
            },
            {
              name: "Always Online",
              value: "[UptimeRobot](https://uptimerobot.com)"
            },
            {
              name: "Code Sources",
              value:
                "[GitHub/raymond-1227/hackerman14-bot](https://github.com/raymond-1227/hackerman14-bot)"
            },
            {
              name: "Library",
              value: "[Discord.js](https://discord.js.org)"
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}facts`)) {
      fetch("https://useless-facts.sameerkumar.website/api")
        .then(res => res.json())
        .then(body => {
          message.channel.send({
            embed: {
              color: Math.floor(Math.random() * 16777214) + 1,
              title: "**Boring Facts**",
              description: body.data,
              fields: [],
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by Raymond#1725"
              }
            }
          });
        });
    }
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Useless Fact Machine**",
        description: randomAnswer,
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  }

  if (msg.startsWith(`${prefix}skeppy`)) {
    var answers = [
      "flip flop",
      "14",
      "ping spoofing",
      "turtle",
      "daddy",
      "BadBoyHalo",
      "BadBoyHalo is a potato",
      "Jif",
      "I was testing",
      "cheesy fries",
      "slash slash undo",
      "idot",
      "sotp",
      "pine cone",
      "thin crust pizza",
      "ding",
      "oh my godness",
      "candad",
      "muffintop",
      "muffin",
      "bisector",
      "photosynthesis",
      "slash slash sudo",
      "CryBoyHalo",
      "muffin time",
      "uh oh spaghettios",
      "japenese symbol for beginner",
      "diameter",
      "perpendicularity"
    ];
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Skeppy Meme Machine**",
        description: randomAnswer,
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  }

  if (msg.startsWith(`${prefix}ping`)) {
    message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Lag Machine**",
        description: "Your ping is " + Math.round(client.ping) + " ms!",
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  }

  if (msg.startsWith(`${prefix}8`)) {
    const sayMessage = args.join(" ");
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
      "Very doubtful."
    ];
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**8 Ball Machine**",
        description: "OH! IT ANSWERS YOU SOMETHING!",
        fields: [
          {
            name: "Your Question",
            value: sayMessage
          },
          {
            name: "The 8 Ball's Answer",
            value: randomAnswer
          }
        ],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  }

  if (msg.startsWith(`${prefix}gif`)) {
    fetch(process.env.GIPHY)
      .then(res => res.json())
      .then(body => {
        message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**GIF Machine**",
            description: "Here's your GIF!",
            fields: [],
            timestamp: new Date(),
            image: {
              url: body.data.image_original_url
            },
            footer: {
              text: "Made with ❤️ created by Raymond#1725"
            }
          }
        });
      });
  }

  if (msg.startsWith(`${prefix}sample`)) {
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Some title",
      url: "https://discord.js.org",
      author: {
        name: "Some name",
        icon_url: "https://i.imgur.com/wSTFkRM.png",
        url: "https://discord.js.org"
      },
      description: "Some description here",
      thumbnail: {
        url: "https://i.imgur.com/wSTFkRM.png"
      },
      fields: [
        {
          name: "Regular field title",
          value: "Some value here"
        },
        {
          name: "\u200b",
          value: "\u200b"
        },
        {
          name: "Inline field title",
          value: "Some value here",
          inline: true
        },
        {
          name: "Inline field title",
          value: "Some value here",
          inline: true
        },
        {
          name: "Inline field title",
          value: "Some value here",
          inline: true
        }
      ],
      image: {
        url: "https://i.imgur.com/wSTFkRM.png"
      },
      timestamp: new Date(),
      footer: {
        text: "Some footer text here",
        icon_url: "https://i.imgur.com/wSTFkRM.png"
      }
    };

    message.channel.send({ embed: exampleEmbed });
  }

  if (msg.startsWith(`${prefix}user`)) {
    const user = message.mentions.users.first() || message.author;
    message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**User Information**",
        description: "Here's the user's information!",
        thumbnail: {
          url: user.avatarURL
        },
        fields: [
          {
            name: "Username",
            value: message.author.username
          },
          {
            name: "User ID",
            value: message.author.id
          }
        ],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  }

  if (msg.startsWith(`${prefix}say`)) {
    const sayMessage = args.join(" ");
    if (!args[1])
      return message.channel
        .send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Action Copy Cat**",
            description: "You need to say something for the bot to say!",
            fields: [],
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by Raymond#1725"
            }
          }
        })
        .then(msg => {
          msg.delete(10000);
        });
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage);
  }

  // Music Commands

  const serverQueue = queue.get(message.guild.id);

  if (msg.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  }

  if (msg.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  }

  if (msg.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
  }

  // Adds the user to the set so that they can't talk for a minute
  cooldown.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    cooldown.delete(message.author.id);
  }, 1000);
});

// Async Functions

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Windows Media Player**",
        description:
          "Dude you have to be in a channel so I can play music for you OK?",
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Windows Media Player**",
        description: "Dude I don't have permissions to `Connect` or `Speak`!",
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Windows Media Player**",
        description: `${song.title} has been added to the queue!`,
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  }
}

function skip(message, serverQueue) {
  if (!message.member.voiceChannel)
    return message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Windows Media Player**",
        description: "You have to be in a voice channel to stop the music!",
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  if (!serverQueue)
    return message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Windows Media Player**",
        description: "There isn't any songs I could skip!",
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voiceChannel)
    return message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Windows Media Player**",
        description: "You have to be in a voice channel to stop the music!",
        fields: [],
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by Raymond#1725"
        }
      }
    });
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  return;
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", () => {
      console.log("Music ended!");
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => {
      console.error(error);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

const embed1 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: "**Commands List**",
    description:
      "Here's all the available commands! (Menu timeout is set to 10 minutes!)",
    fields: [
      {
        name: ":robot: Bot Prefix",
        value: "`rh!`",
        inline: "true"
      },
      {
        name: ":keyboard: Placeholder Requirements",
        value: "`<>` = REQUIRED, `[]` = OPTIONAL",
        inline: "true"
      },
      {
        name: ":information_source: Basic Commands",
        value: "Page 2"
      },
      {
        name: ":8ball: Fun Commands",
        value: "Page 3"
      },
      {
        name: ":cd: Misc Conmmands",
        value: "Page 4"
      },
      {
        name: ":musical_note: Music Commands",
        value: "Page 5"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 1 · Made with ❤️ created by Raymond#1725"
    }
  });

const embed2 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":information_source: **Basic Commands**",
    description: "Basic commands of the bot!",
    fields: [
      {
        name: "`rh!help`",
        value: "Shows this command list!"
      },
      {
        name: "`rh!about`",
        value: "Shows you the info about the bot!"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 2 · Made with ❤️ created by Raymond#1725"
    }
  });

const embed3 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":8ball: **Fun Commands**",
    description: "Some fun commands you can play with!",
    fields: [
      {
        name: "`rh!facts",
        value: "Tells you a boring fact!"
      },
      {
        name: "`rh!skeppy`",
        value: "Tells you a random Skeppy meme!"
      },
      {
        name: "`rh!8`",
        value: "Ask any yes/no question, and it will answer you something!"
      },
      {
        name: "`rh!gif`",
        value: "Sends you a random GIF!"
      },
      {
        name: "`rh!say <Message>`",
        value: "Says something what you say!"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 3 · Made with ❤️ created by Raymond#1725"
    }
  });

const embed4 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":cd: **Misc Commands**",
    description: "Just some boring commands!",
    fields: [
      {
        name: "`rh!ping`",
        value: "Replies you the respond time of the bot!"
      },
      {
        name: "`rh!user [Other Users]`",
        value: "Send's your/other's Discord profile information!"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 3 · Made with ❤️ created by Raymond#1725"
    }
  });

const embed5 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":musical_note: **Music Commands**",
    description:
      "Some commands let's you listen to music in Discord voice channels!",
    fields: [
      {
        name: "`rh!play <YouTube Video URL>`",
        value:
          "Plays music through Windows Media Player! *(Note: The bot usually lags, please wait a few seconds for the bot to load song.)*"
      },
      {
        name: "`rh!skip`",
        value:
          "Skips a song from the playlist! *(Note: If there's no more queued songs left, the bot will disconnect from the channel that the bot is in.)*"
      },
      {
        name: "`rh!stop`",
        value: "Stops the music player!"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Made with ❤️ created by Raymond#1725"
    }
  });

const list = [embed1, embed2, embed3, embed4, embed5];

function getList(i) {
  return list[i]()
    .setTimestamp()
    .setFooter(`Page ${i + 1}`); // i+1 because we start at 0
}

function filter(reaction, user) {
  return !user.bot && reactionArrow.includes(reaction.emoji.name); // check if the emoji is inside the list of emojis, and if the user is not a bot
}

function onCollect(emoji, message, i, getList) {
  if (emoji.name === emojiPrevious && i > 0) {
    message.edit(getList(--i));
  } else if (emoji.name === emojiNext && i < list.length - 1) {
    message.edit(getList(++i));
  }
  return i;
}

function createCollectorMessage(message, getList) {
  let i = 0;
  const collector = message.createReactionCollector(filter, { time });
  collector.on("collect", r => {
    i = onCollect(r.emoji, message, i, getList);
  });
  collector.on("end", collected => message.clearReactions());
}

function sendList(channel, getList) {
  channel
    .send(getList(0))
    .then(msg => msg.react(emojiPrevious))
    .then(msgReaction => msgReaction.message.react(emojiNext))
    .then(msgReaction => createCollectorMessage(msgReaction.message, getList));
}

client.login(process.env.TOKEN);

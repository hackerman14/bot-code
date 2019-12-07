// Global Definitions

const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const moment = require("moment");
const randomPuppy = require("random-puppy");
const ffmpeg = require("ffmpeg");
const weather = require("weather-js");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBTOKEN, client);
const fetch = require("node-fetch");
const queue = new Map();
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
const prefix = "rh!";
const { stripIndents } = require("common-tags");
const owner = "Raymond#7846";
const joinedAt = require("moment");

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
  setInterval(() => {
    client.user
      .setActivity("rh!help | hackerman14.tk", {
        type: "PLAYING"
      })
      .then(presence =>
        console.log(
          `Activity set to "${presence.game ? presence.game.name : "none"}"`
        )
      )
      .catch(console.error);
  }, 100000);

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
  const serverQueue = queue.get(message.guild.id);
  var args = message.content.split(" ").slice(1);

  // Commands Cooldown & All Commands
  if (cooldown.has(message.author.id)) {
    message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        title: "**Command Cooldown**",
        description:
          "Dude you have to wait 1 seconds before you can do another command!",
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by " + owner
        }
      }
    });
  } else {
    // Every commands goes here!

    // DM

    if (message.channel.type == "dm") {
      message.author.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Bruh Moment**",
          description: "You realise that I don't work in DMs...",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by" + owner
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
              value: "[" + owner + "](https://raymond-1227.github.io)"
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
            text: "Made with ❤️ created by " + owner
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
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          });
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
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
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
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
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
          description: "This smart ball has something to tell you.",
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
            text: "Made with ❤️ created by " + owner
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
              timestamp: new Date(),
              image: {
                url: body.data.image_original_url
              },
              footer: {
                text: "Made with ❤️ created by " + owner
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
      var member = message.mentions.members.first() || message.author;
      var userCreated = member.createdAt.toString().split(" ");
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**User Information**",
          description: "Here's the user information!",
          thumbnail: {
            url: member.avatarURL
          },
          fields: [
            {
              name: "Username + Tag",
              value: member.tag
            },
            {
              name: "User ID",
              value: member.id
            },
            {
              name: "Account Since",
              value:
                userCreated[1] + ", " + userCreated[2] + " " + userCreated[3]
            },
            {
              name: "Game Presence",
              value: member.presence.game ? member.presence.game.name : "none",
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}server`)) {
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Server Information**",
          description: "Here's the server information!",
          fields: [
            {
              name: "Server Name",
              value: message.guild.name
            },
            {
              name: "Server ID",
              value: message.guild.id
            },
            {
              name: "Server Since",
              value: message.guild.createdAt
            },
            {
              name: "Server Owner",
              value: message.guild.owner.user
            },
            {
              name: "Server Owner's User ID",
              value: message.guild.owner.id
            },
            {
              name: "Server Region",
              value: message.guild.region
            },
            {
              name: "Total Members",
              value: message.guild.memberCount
            },
            {
              name: "Total Channels",
              value: message.guild.channels.size
            },
            {
              name: "AFK Channel",
              value: message.guild.afkchannel
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}say`)) {
      const sayMessage = args.join(" ");
      if (!args[0])
        return message.channel
          .send({
            embed: {
              color: Math.floor(Math.random() * 16777214) + 1,
              title: "**Action Copy Cat**",
              description: "You need to say something for the bot to say!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          })
          .then(msg => {
            msg.delete(10000);
          });
      message.delete().catch(O_o => {});
      message.channel.send(sayMessage);
    }

    if (msg.startsWith(`${prefix}meme`)) {
      const subReddits = [
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
        "teenagers"
      ];
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];
      const meme = await randomPuppy(random);
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Reddit Memes**",
          description: `A meme from /r/${random}`,
          timestamp: new Date(),
          image: {
            url: meme
          },
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}weather`)) {
      weather.find({ search: args.join(" "), degreeType: "F" }),
        function(err, result) {
          if (err) console.log(err);
          if (!args[0]) return;
          console.log(JSON.stringify(result, null, 2));

          var location = result[0].location;
          var current = result[0].current;

          message.channel.send({
            embed: {
              color: Math.floor(Math.random() * 16777214) + 1,
              title: "**Weather Forecast**",
              description: `{current.skytext}`,
              author: { name: `Weather for ${current.observationpoint}` },
              thumbnail: current.imageUrl,
              fields: [
                {
                  name: "Timezone",
                  value: `UTC${current.timezone}`,
                  inline: true
                },
                {
                  name: "Degree Type",
                  value: location.degreeType,
                  inline: true
                },
                {
                  name: "Temperature",
                  value: `${current.temperature} Degrees`,
                  inline: true
                },
                {
                  name: "Feels Like",
                  value: `${current.feelslike} Degrees`,
                  inline: true
                },
                {
                  name: "Winds",
                  value: current.winddisplay,
                  inline: true
                },
                {
                  name: "Humidity",
                  value: `${current.humidity}%`,
                  inline: true
                }
              ],
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          });
        };
    }

    if (msg.startsWith(`${prefix}uptime`))
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Time Tracker**",
          description: secondsToString(process.uptime()),
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });

    // Music Commands

    if (msg.startsWith(`${prefix}play`)) {
      const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) return;
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT")) return;
      if (!permissions.has("SPEAK")) return;

      const songInfo = await ytdl.getInfo(args[0]);

      const song = {
        title: songInfo.title,
        url: songInfo.video_url
      };

      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };
        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(
            `I was unable to join the voice channel ${voiceChannel}, the error is : ${error}`
          );
          return;
        }
      } else {
        serverQueue.songs.push(song);
        return;
      }

      return;
    } else if (msg.startsWith(`${prefix}skip`)) {
      if (!serverQueue)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "I couldn't skip anything!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });

      serverQueue.connection.dispatcher.end();
      return;
    } else if (msg.startsWith(`${prefix}stop`)) {
      if (!message.member.voiceChannel) return;
      message.member.voiceChannel.leave();
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: "Player has stopped!",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    // Adds the user to the set so that they can't talk for a minute
    cooldown.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      cooldown.delete(message.author.id);
    }, 1000);
  }
});

// Functions

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", () => {
      console.log(`song ended`);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
      return;
    })
    .on("error", error => console.error(error));

  dispatcher.setVolumeLogarithmic(5 / 5);
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
        inline: true
      },
      {
        name: ":keyboard: Placeholder Requirements",
        value: "`<>` = REQUIRED, `[]` = OPTIONAL",
        inline: true
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
      text: "Page 1 · Made with ❤️ created by Raymond#7846"
    }
  });

const embed2 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":information_source: **Basic Commands**",
    fields: [
      {
        name: "`rh!help`",
        value: "Shows this command list!"
      },
      {
        name: "`rh!about`",
        value: "Shows you the info about the bot!"
      },
      {
        name: "`rh!uptime`",
        value: "Shows you the uptime of the bot!"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 2 · Made with ❤️ created by Raymond#7846"
    }
  });

const embed3 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":8ball: **Fun Commands**",
    fields: [
      {
        name: "`rh!facts`",
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
      },
      {
        name: "`rh!meme`",
        value: "Tells you a meme from Subreddits!"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 3 · Made with ❤️ created by Raymond#7846"
    }
  });

const embed4 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":cd: **Misc Commands**",
    fields: [
      {
        name: "`rh!ping`",
        value: "Replies you the respond time of the bot!"
      },
      {
        name: "`rh!user ~~[Other Users]~~`",
        value: "Send's your/other's Discord profile information! (Currently search for other users is broken...)"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 3 · Made with ❤️ created by Raymond#7846"
    }
  });

const embed5 = () =>
  new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":musical_note: **Music Commands**",
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
      text: "Made with ❤️ created by Raymond#7846"
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

function secondsToString(seconds) {
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor((seconds % 86400) / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var seconds = Math.floor(seconds % 60);

  var str = "";

  if (days > 0) {
    str += days + ":";
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  str += hours + ":";
  str += minutes + ":";
  str += seconds;

  return str;
}

client.login(process.env.TOKEN);

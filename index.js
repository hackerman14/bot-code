// Global Definitions

const Util = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const fs = require("fs");
const YouTube = require("simple-youtube-api");
const randomPuppy = require("random-puppy");
const urban = require("urban");
const Keyv = require("keyv");
const prefixes = new Keyv("sqlite://db.sqlite");
const weather = require("weather-js");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBTOKEN, client);
const fetch = require("node-fetch");
const queue = new Map();
const youtube = new YouTube(process.env.GOOGLEAPI);
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
const opts = {
  maxResults: 25,
  key: process.env.YOUTUBE,
  type: "video"
};
const globalPrefix = "rh!";
const owner = "Raymond#2829";
client.commands = new Discord.Collection();

let cooldown = new Set();
// Console Logging

client.once("ready", () => {
  console.log("Ready!");
  console.log(
    `The bot is currently serviing ${client.users.cache.size} users, in ${client.guilds.cache.size} servers.`
  );
  client.user
    .setPresence({
      activity: {
        name: "rh!help | hackerman14.tk | SITE REVAMPED!!",
        url: "https://hackerman14.tk"
      },
      status: "dnd"
    })
    .then(console.log)
    .catch(console.error);
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});
client.on("warn", console.warn);
client.on("error", console.error);
client.on("uncaughtException", err => {
  console.log(err);
  process.exit(1);
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
  if (!message.content.startsWith(globalPrefix)) return;
  var args = message.content.split(" ").slice(1);
  const channel = message.channel;
  const args1 = message.content.split(" ");
  const searchString = args1.slice(1).join(" ");
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(message.guild.id);

  // Custom Prefix

  let gArgs;
  // handle messages in a guild
  if (message.guild) {
    let prefix;

    if (message.content.startsWith(globalPrefix)) {
      prefix = globalPrefix;
    } else {
      // check the guild-level prefix
      const guildPrefix = await prefixes.get(message.guild.id);
      if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
    }

    // if we found a prefix, setup args; otherwise, this isn't a command
    if (!prefix) return;
    gArgs = message.content.slice(prefix.length).split(/\s+/);
  } else {
    // handle DMs
    const slice = message.content.startsWith(globalPrefix)
      ? globalPrefix.length
      : 0;
    gArgs = message.content.slice(slice).split(/\s+/);
  }

  // get the first space-delimited argument after the prefix as the command
  const command = gArgs.shift().toLowerCase();

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
    // Every command goes here!

    // DM

    if (message.channel.type == "dm") {
      message.author.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**OK Boomer**",
          description: "You realise that I don't work in DMs...",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by" + owner
          }
        }
      });
    }

    // Commands

    if (command === "help") {
      sendList(channel, getList);
      return;
    }

    if (command === "about") {
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**About This Bot**",
          description: "The information about this bot!",
          thumbnail: {
            url: client.user.displayAvatarURL
          },
          fields: [
            {
              name: "Bot Name",
              value: "hackerman14"
            },
            {
              name: "Bot Since",
              value: "September 7, 2019"
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
              name: "Source Codes",
              value: "[GitHub/hackerman14](https://github.com/hackerman14)"
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

    if (command === "facts") {
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

    if (command === "skeppy") {
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
        "perpendicularity",
        "hi im the real skeppy",
        "like or die tmr",
        "heal pool",
        "bald",
        "fish in a bucket",
        "golden helmet",
        "a6d's little brother",
        "BaldBoyHalo",
        "magnifying glass tilted left",
        "magnifying glass tilted right",
        "f",
        "japanese symbol for beginner",
        "DrunkBoyHalo",
        "oh neat, hieroglyphs",
        "a apollonian gasket",
        "Rhobicosidodecahedron",
        "minecraft but",
        "do not do that",
        "so i..."
      ];
      var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Skeppy Memes**",
          description: randomAnswer,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (command === "ping") {
      let m = await message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Lag Machine**",
          description: "Ping?",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
      m.edit({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Lag Machine**",
          description: "Pong!",
          fields: [
            {
              name: "Latency",
              value: `${m.createdTimestamp - message.createdTimestamp}ms`
            },
            {
              name: "API Latency",
              value: `${Math.round(client.ws.ping)}ms`
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (command === "8") {
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

      if (!args[0])
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**The Legendary 8 Ball**",
            description: "You need to say something for the bot to response!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });

      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**The Legendary 8 Ball**",
          description: "This smart ball has something to tell you.",
          fields: [
            {
              name: "Your Question",
              value: sayMessage
            },
            {
              name: "The 8 Ball's Big Words",
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

    if (command === "gif") {
      fetch(process.env.GIPHY)
        .then(res => res.json())
        .then(body => {
          message.channel.send({
            embed: {
              color: Math.floor(Math.random() * 16777214) + 1,
              title: "**Random GIF**",
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

    if (command === "sEmbed") {
      const sampleEmbed = {
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

      message.channel.send({ embed: sampleEmbed });
    }

    if (command === "user") {
      var member = message.mentions.users.first() || message.author;
      var userCreated = member.createdAt.toString().split(" ");
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**User Information**",
          description: "Here's the user information!",
          thumbnail: {
            url: member.avatarURL()
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
                userCreated[1] + " " + userCreated[2] + ", " + userCreated[3]
            },
            {
              name: "Game Presence",
              value: member.presence.game ? member.presence.game.name : "none"
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (command === "server") {
      var serverCreated = message.guild.createdAt.toString().split(" ");
      let region = {
        brazil: ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        singapore: ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        sydney: ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        london: ":flag_gb: London",
        amsterdam: ":flag_nl: Amsterdam",
        hongkong: ":flag_hk: Hong Kong",
        russia: ":flag_ru: Russia",
        southafrica: ":flag_za:  South Africa"
      };
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Server Information**",
          description: "Here's the server information!",
          thumbnail: {
            url: message.guild.iconURL()
          },
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
              value:
                serverCreated[1] +
                " " +
                serverCreated[2] +
                ", " +
                serverCreated[3]
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
              value: region[message.guild.region]
            },
            {
              name: "Total Members",
              value: message.guild.memberCount
            },
            {
              name: "Total Channels",
              value: message.guild.channels.cache.size
            },
            {
              name: "Total Roles",
              value: message.guild.roles.cache.size
            },
            {
              name: "AFK Channel",
              value: message.guild.afkChannel
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (command === "say") {
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

    if (command === "meme") {
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

    if (command === "weather") {
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
              description: `${current.skytext}`,
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

    if (command === "uptime") {
      let totalSeconds = client.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      let roundedSeconds = Math.round(seconds);
      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${roundedSeconds} seconds`;
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Time Tracker**",
          description: `The bot has stayed on for ${uptime}!`,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (command === "joke") {
      fetch("https://api.icndb.com/jokes/random")
        .then(res => res.json())
        .then(body => {
          message.channel.send({
            embed: {
              color: Math.floor(Math.random() * 16777214) + 1,
              title: "**Dumb Jokes**",
              description: body.data,
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          });
        });
    }

    if (command === "urban") {
      if (!message.channel.nsfw)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Urban Dictionary**",
            description:
              "Due to some NSFW words definition, so please run this in a NSFW channel!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });

      if (args < 1 || !["random", "search"].includes(args[0]))
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Urban Dictionary**",
            description: "Please enter something in order to search!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });

      let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
      try {
        search.first(res => {
          if (!res)
            return message.channel.send({
              embed: {
                color: Math.floor(Math.random() * 16777214) + 1,
                title: "**Urban Dictionary**",
                description: "No results found for this topic!",
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              }
            });

          let {
            word,
            definition,
            example,
            thumbs_up,
            thumbs_down,
            permalink,
            author
          } = res;

          let urbanEmbed = new Discord.MessageEmbed({
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Urban Dictionary**",
            description: "Here's the definition!",
            thumbnail: {
              url: "https://file.coffee/u/Q39Od2R9wwf.png"
            },
            fields: [
              {
                name: "Word",
                value: word
              },
              {
                name: "Definition",
                value: definition || "No definition given"
              },
              {
                name: "Word Example",
                value: example || "No example given"
              },
              {
                name: "Upvotes",
                value: thumbs_up || 0
              },
              {
                name: "Downvotes",
                value: thumbs_down || 0
              },
              {
                name: "Link to the word",
                value: `[${word}](${permalink ||
                  "https://urbandictionary.com"})`
              },
              {
                name: "Author",
                value: author || "Unknown"
              }
            ],
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          });
          message.channel.send(urbanEmbed);
        });
      } catch (e) {
        console.log(e);
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Urban Dictionary**",
            description: "An error occured, please try again!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      }
    }

    if (command === "prefix") {
      // if there's at least one argument, set the prefix
      if (args.length) {
        await prefixes.set(message.guild.id, args[0]);
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Prefix Changer**",
            description: `Successfully set prefix to \`${args[0]}\``,
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      }

      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Prefix Changet**",
          description: `Prefix is \`${(await prefixes.get(message.guild.id)) ||
            globalPrefix}\``,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    if (command === "covid19") {
      fetch("https://api.covid19api.com/summary")
        .then(res => res.json())
        .then(body => {
          message.channel.send({
            embed: {
              color: Math.floor(Math.random() * 16777214) + 1,
              title: "**COVID-19 Report**",
              description: "Here are some sad news :(",
              fields: [
                {
                  name: "New Comfirmed Cases",
                  value: body.Global.NewConfirmed
                },
                {
                  name: "New Death Cases",
                  value: body.Global.NewDeaths
                },
                {
                  name: "New Recovered Cases",
                  value: body.Global.NewRecovered
                },
                {
                  name: "Total Comfirmed Cases",
                  value: body.Global.TotalConfirmed
                },
                {
                  name: "Total Death Cases",
                  value: body.Global.TotalDeaths
                },
                {
                  name: "Total Recovered Cases",
                  value: body.Global.TotalRecovered
                }
              ],
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          });
        });
    }

    // Music Commands

    if (command === "play") {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description:
              "I'm sorry but you need to be in a voice channel to play music!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT")) {
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description:
              "I cannot connect to your voice channel, make sure I have the proper permissions!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      }
      if (!permissions.has("SPEAK")) {
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description:
              "I cannot speak in this voice channel, make sure I have the proper permissions!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      }

      if (
        url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
      ) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
          await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: `Playlist: **${playlist.title}** has been added to the queue!`,
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;
            message.channel.send({
              embed: {
                color: Math.floor(Math.random() * 16777214) + 1,
                title: "**Windows Media Player**",
                description:
                  "Please provide a value to select one of the search results ranging from 1-10!",
                fields: [
                  {
                    name: "Song Selection",
                    value: `${videos
                      .map(video2 => `**${++index} -** ${video2.title}`)
                      .join("\n")}`
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              }
            });
            // eslint-disable-next-line max-depth
            try {
              var response = await message.channel.awaitMessages(
                msg2 => msg2.content > 0 && msg2.content < 11,
                {
                  max: 1,
                  time: 10000,
                  errors: ["time"]
                }
              );
            } catch (err) {
              console.error(err);
              return message.channel.send({
                embed: {
                  color: Math.floor(Math.random() * 16777214) + 1,
                  title: "**Windows Media Player**",
                  description:
                    "No or invalid value entered, cancelling video selection!",
                  timestamp: new Date(),
                  footer: {
                    text: "Made with ❤️ created by " + owner
                  }
                }
              });
            }
            const videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          } catch (err) {
            console.error(err);
            return message.channel.send({
              embed: {
                color: Math.floor(Math.random() * 16777214) + 1,
                title: "**Windows Media Player**",
                description: "I could not obtain any search results!",
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              }
            });
          }
        }
        return handleVideo(video, message, voiceChannel);
      }
    } else if (command === "skip") {
      if (!message.member.voiceChannel)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "You are not in a voice channel!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      if (!serverQueue)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "There is nothing playing that I can skip for you!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      serverQueue.connection.dispatcher.destroy("Skip command has been used!");
      return undefined;
    } else if (command === "stop") {
      if (!message.member.voiceChannel)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "You are not in a voice channel!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      if (!serverQueue)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "There is nothing playing that I can stop for you!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.destroy("Stop command has been used!");
      return undefined;
    } else if (command === "volume") {
      if (!message.member.voiceChannel)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "You are not in a voice channel!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      if (!serverQueue)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "There is nothing playing!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      if (!args1[1])
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: `The current volume is **${serverQueue.volume}**!`,
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      serverQueue.volume = args1[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args1[1] / 5);
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: `I set the volume to **${args1[1]}**`,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    } else if (command === "nowplaying") {
      if (!serverQueue)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "There is nothing playing!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: `Now playing: **${serverQueue.songs[0].title}**!`,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    } else if (command === "queue") {
      if (!serverQueue)
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "There is nothing playing!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: `Now playing: ${serverQueue.songs[0].title}`,
          fields: [
            {
              name: "Song Queue",
              value: `${serverQueue.songs
                .map(song => `**-** ${song.title}`)
                .join("\n")}`
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    } else if (command === "pause") {
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "Paused the music for you!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      }
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: "There is nothing playing!",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    } else if (command === "resume") {
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            title: "**Windows Media Player**",
            description: "▶ Resumed the music for you!",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        });
      }
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: "There is nothing playing!",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }

    return undefined;

    // Adds the user to the set so that they can't talk for a minute
    cooldown.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      cooldown.delete(message.author.id);
    }, 1000);
  }
});

// Functions

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: 0,
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
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: `I could not join the voice channel: ${error}`,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else
      return message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Windows Media Player**",
          description: `**${song.title}** has been added to the queue!`,
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      });
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send({
    embed: {
      color: Math.floor(Math.random() * 16777214) + 1,
      title: "**Windows Media Player**",
      description: `Start playing: **${song.title}**`,
      timestamp: new Date(),
      footer: {
        text: "Made with ❤️ created by " + owner
      }
    }
  });
}

const embed1 = () =>
  new Discord.MessageEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: "**Commands List**",
    description:
      "Here's all the available commands! (Menu timeout is set to 10 minutes!)",
    fields: [
      {
        name: ":robot: Default Prefix",
        value: globalPrefix,
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
      text: "Page 1"
    }
  });

const embed2 = () =>
  new Discord.MessageEmbed({
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
      text: "Page 2"
    }
  });

const embed3 = () =>
  new Discord.MessageEmbed({
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
      text: "Page 3"
    }
  });

const embed4 = () =>
  new Discord.MessageEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":cd: **Misc Commands**",
    fields: [
      {
        name: "`rh!ping`",
        value: "Replies you the respond time of the bot!"
      },
      {
        name: "`rh!user [Other Users]`",
        value: "Sends your/other's Discord profile information!"
      },
      {
        name: "`rh!server`",
        value: "Sends the server's detail"
      },
      {
        name: "`rh!urban <search/random> [query]`",
        value: "Search the words across the Urban Dictionary!"
      },
      {
        name: "`rh!covid19`",
        value: "Tells you any global numbers of cases between COVID-19!"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 4"
    }
  });

const embed5 = () =>
  new Discord.MessageEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: ":musical_note: **Music Commands**",
    fields: [
      {
        name: "`rh!play <Song Name>`",
        value:
          "Plays music through fake Windows Media Player! *(Note: The bot usually lags, please wait a few seconds for the bot to load song.)*"
      },
      {
        name: "`rh!skip`",
        value:
          "Skips a song from the playlist! *(Note: If there's no more queued songs left, the bot will disconnect from the channel that the bot is in.)*"
      },
      {
        name: "`rh!stop`",
        value: "Stops the music player!"
      },
      {
        name: "`rh!volume [Volume]`",
        value:
          "See/Change the volume of the sound playing from the fake Windows Media Player!"
      },
      {
        name: "`rh!nowplaying`",
        value: "Sees what song is currently playing from the playlist!"
      },
      {
        name: "`rh!queue`",
        value: "Shows the entire list of the queue!"
      },
      {
        name: "`rh!pause`",
        value: "Pauses the song from playing!"
      },
      {
        name: "`rh!resume`",
        value: "Resumes the song from playinh"
      }
    ],
    timestamp: new Date(),
    footer: {
      text: "Page 5"
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

client.login(process.env.DISCORD);

// Global Definitions

const Util = require("discord.js");
const Discord = require("discord.js");
const {
  Client,
  Intents,
  MessageSelectMenu,
  MessageActionRow
} = require("discord.js");
const client = new Discord.Client({
  presence: {
    status: "dnd",
    afk: false,
    activities: [
      {
        name: "h!help | Still in beta!"
      }
    ]
  },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

const fs = require("fs");
const randomPuppy = require("random-puppy");
const urban = require("urban");
const cheweyBotAnalyticsAPI = require("discord-bot-analytics");
const customAnalytics = new cheweyBotAnalyticsAPI(
  process.env.CHEYWEYAPI,
  client
);
const weather = require("weather-js");
const { AutoPoster } = require("topgg-autoposter");
const ap = AutoPoster(process.env.TOPGG, client);
const fetch = require("node-fetch");
const queue = new Map();
const emojiNext = "➡";
const emojiPrevious = "⬅";
const reactionArrow = [emojiPrevious, emojiNext];
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const globalPrefix = "h!" || "H!";
const owner = "Raymond#2829";
client.commands = new Discord.Collection();
let cooldown = new Set();

// Console Logging

client.on("ready", () => {
  console.log("Starting up...");
  console.log(
    `The bot is currently serving ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
  );
  const guildId = "457611176558460948";
  const guild = client.guilds.cache.get(guildId);
  let slashcmds;

  if (guild) {
    slashcmds = guild.commands;
  } else {
    slashcmds = client.application?.commands;
  }

  slashcmds?.create({
    name: "help",
    description: "get some free helps"
  });
  
  slashcmds?.create({
    name: "ping",
    description: "it just works ok?"
  });
  
});
client.on("reconnecting", () => {
  console.log("Reconnecting!");
});
client.on("disconnect", () => {
  console.log("Disconnect!");
});
client.on("warn", console.warn);
client.on("error", console.error);
client.on("uncaughtException", err => {
  console.log(err);
  process.exit(1);
});
ap.on("posted", () => {
  console.log("Posted stats to Top.gg!");
});
ap.on("error", e => {
  console.log(`An error occurred to TOP.gg! ${e}`);
});

// Client Codes

client.on("messageCreate", async message => {
  // Client Rules

  let msg = message.content.toLowerCase();
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(globalPrefix)) return;
  var args = message.content.split(" ").slice(1);
  const channel = message.channel;
  let prefixArgs = message.content
    .slice(globalPrefix.length)
    .trim()
    .split(/ +/g);

  // Prefix Setup

  // get the first space-delimited argument after the prefix as the command
  const command = prefixArgs.shift().toLowerCase();

  // Commands Cooldown & All Commands

  if (cooldown.has(message.author.id)) {
    message.channel.send({
      embed: {
        color: "RANDOM",
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
        embeds: [
          {
            color: "RANDOM",
            title: "**Anti-DM System**",
            description: "You realize that I don't work in DMs...",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    // Commands

    if (command === "help") {
      let help = {
        color: "RANDOM",
        title: "**Available Commands**",
        description:
          "Use the dropdown menu to select a category below to see some available commands!",
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by " + owner
        }
      };
      let helpPanel = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("menu")
          .setPlaceholder("Select a category...")
          .addOptions([
            {
              label: "Basic Commands",
              description:
                "Some basic commands that allows you to check the bot!",
              value: "basic"
            },
            {
              label: "Fun Commands",
              description:
                "Some fun commands you can play with when you're bored!",
              value: "fun"
            },
            {
              label: "Misc Commands",
              description: "Some other commands you use too!",
              value: "misc"
            }
          ])
      );
      message.channel
        .send({ embeds: [help], components: [helpPanel] })
        .then(msg => {
          const select = interaction => interaction.isSelectMenu();
          const collector = msg.createMessageComponentCollector({
            select
          });

          collector.on("collect", async collected => {
            let value = collected.values[0];
            collected.deferUpdate();

            if (value === "basic") {
              let basic = {
                ccolor: "RANDOM",
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
                  },
                  {
                    name: "`rh!changelog`",
                    value:
                      "Shows you the change log of the bot with a specific date!"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              };
              msg.edit({ embeds: [basic], components: [helpPanel] });
            }
            if (value === "fun") {
              let fun = {
                color: "RANDOM",
                title: ":8ball: **Fun Commands**",
                fields: [
                  {
                    name: "`rh!facts`",
                    value: "Tells you a boring fact!"
                  },
                  {
                    name: "`rh!skeppy`",
                    value:
                      "Tells you a random Skeppy quotes according to Wikitubia!"
                  },
                  {
                    name: "`rh!8`",
                    value:
                      "Ask any yes/no question, and it will answer you something!"
                  },
                  {
                    name: "`rh!gif`",
                    value: "Sends you a random GIF!"
                  },
                  {
                    name: "`rh!photo`",
                    value:
                      "Sends you a random HD photo with a random thumbnail!"
                  },
                  {
                    name: "`rh!say <Message>`",
                    value: "Says something what you say!"
                  },
                  {
                    name: "`rh!meme`",
                    value: "Tells you a meme from Subreddits!"
                  },
                  {
                    name: "`rh!print`",
                    value:
                      "Say something, the bot will output your text as an image!"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              };
              msg.edit({ embeds: [fun], components: [helpPanel] });
            }
            if (value === "misc") {
              let misc = {
                color: "RANDOM",
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
                    name: "`rh!covid-19`",
                    value: "Tells you any global numbers of COVID-19 cases! :("
                  },
                  {
                    name: "`rh!reload`",
                    value: "Reboots the bot!"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              };
              msg.edit({ embeds: [misc], components: [helpPanel] });
            }
          });
        });
    }

    if (command === "about") {
      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
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
                name: "Bot Website",
                value: "[https://hackerman14.tk](https://hackerman14.tk/)"
              },
              {
                name: "Creator",
                value: "[" + owner + "](https://raymond-1227.github.io/)"
              },
              {
                name: "Host",
                value: "[Glitch](https://glitch.com/)"
              },
              {
                name: "Always Online",
                value: "Disabled (i'm too poor to buy boosted app plan)"
              },
              {
                name: "Source Codes",
                value: "[GitHub/hackerman14](https://github.com/hackerman14)"
              },
              {
                name: "Library",
                value: "[Discord.js](https://discord.js.org/) (v13)"
              }
            ],
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "facts") {
      fetch("https://useless-facts.sameerkumar.website/api")
        .then(res => res.json())
        .then(body => {
          message.channel.send({
            embeds: [
              {
                color: "RANDOM",
                title: "**Boring Facts**",
                description: body.data,
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              }
            ]
          });
        });
    }

    if (command === "skeppy") {
      var answers = [
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
        "...it’s ‘cause everyone knows I’m a dog",
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
        "trapping 100 kids"
      ];
      var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
            title: "**Skeppy's Quotes or Memes**",
            description: randomAnswer,
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "ping") {
      let m = await message.channel.send({
        embeds: [
          {
            color: "RANDOM",
            title: "**Lag Machine**",
            description: "Ping?",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
      m.edit({
        embeds: [
          {
            color: "RANDOM",
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
        ]
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
          embeds: [
            {
              color: "RANDOM",
              title: "**The Legendary 8 Ball**",
              description: "You need to say something for the bot to response!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });

      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
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
        ]
      });
    }

    if (command === "gif") {
      fetch(process.env.GIPHY)
        .then(res => res.json())
        .then(body => {
          message.channel.send({
            embeds: [
              {
                color: "RANDOM",
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
            ]
          });
        });
    }

    if (command === "sEmbed") {
      message.channel.send({
        embeds: [
          {
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
          }
        ]
      });
    }

    if (command === "user") {
      var member = message.mentions.users.first() || message.author;
      var userCreated = member.createdAt.toString().split(" ");
      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
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
                value: member.presence.activities[0]
                  ? member.presence.activities.state
                  : "none"
              }
            ],
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
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
        embeds: [
          {
            color: "RANDOM",
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
                value: `<message.guild.ownerId>`
              },
              {
                name: "Server Owner's User ID",
                value: message.guild.ownerId
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
        ]
      });
    }

    if (command === "say") {
      const sayMessage = args.join(" ");
      if (!args[0])
        return message.channel
          .send({
            embeds: [
              {
                color: "RANDOM",
                title: "**Action Copy Cat**",
                description: "You need to say something for the bot to say!",
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              }
            ]
          })
          .then(msg => {
            msg.delete(10000);
          });
      message.delete().catch(O_o => {});
      message.channel.send(
        `${message.author.toString()} wants me to say "${sayMessage}"`
      );
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
        embeds: [
          {
            color: "RANDOM",
            title: "**Reddit Memes**",
            description: `A meme from {/r/${random}}`,
            timestamp: new Date(),
            image: {
              url: meme
            },
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "weather") {
      weather.find({ search: args.join(" "), degreeType: "C" }),
        function(err, result) {
          if (err) console.log(err);
          if (!args[0]) return;
          console.log(JSON.stringify(result, null, 2));

          var location = result[0].location;
          var current = result[0].current;

          message.channel.send({
            embeds: [
              {
                color: "RANDOM",
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
            ]
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
        embeds: [
          {
            color: "RANDOM",
            title: "**Time Tracker**",
            description: `The bot has stayed on for ${uptime}!`,
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "joke") {
      fetch("https://official-joke-api.appspot.com/jokes/random")
        .then(res => res.json())
        .then(body => {
          message.channel.send({
            embeds: [
              {
                color: "RANDOM",
                title: "**Dumb Jokes**",
                description: body.data,
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              }
            ]
          });
        });
    }

    if (command === "urban") {
      if (!message.channel.nsfw)
        return message.channel.send({
          embeds: [
            {
              color: "RANDOM",
              title: "**Urban Dictionary**",
              description:
                "Due to NSFW topic definitions so please run this in a NSFW channel!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });

      if (args < 1 || !["random", "search"].includes(args[0]))
        return message.channel.send({
          embeds: [
            {
              color: "RANDOM",
              title: "**Urban Dictionary**",
              description: "Please enter something in order to search!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });

      let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
      try {
        search.first(res => {
          if (!res)
            return message.channel.send({
              embeds: [
                {
                  color: "RANDOM",
                  title: "**Urban Dictionary**",
                  description: "No results found for this topic!",
                  timestamp: new Date(),
                  footer: {
                    text: "Made with ❤️ created by " + owner
                  }
                }
              ]
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
            color: "RANDOM",
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
          message.channel.send({ embeds: [urbanEmbed] });
        });
      } catch (e) {
        console.log(e);
        return message.channel.send({
          embeds: [
            {
              color: "RANDOM",
              title: "**Urban Dictionary**",
              description: "An error occured, please try again!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });
      }
    }

    if (command === "photo") {
      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
            title: "**Random HD Photo**",
            description: "Here's your HD photo!",
            timestamp: new Date(),
            image: {
              url: "https://source.unsplash.com/random?sig=" + Math.random()
            },
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "changelog") {
      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
            title: "**Bot Changelog**",
            description: "Date: November 22, 2021",
            timestamp: new Date(),
            fields: [
              {
                name: "Brand new help command",
                value:
                  "Help command no longer depends on reaction roles but interaction dropdown!"
              }
            ],
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "owner") {
      if (message.author.id !== "410839910204047360")
        return message.channel.send({
          embeds: [
            {
              color: "#db564f",
              title: "**Bot Ownership Verification**",
              description: "You're not the owner tho!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });
      message.channel.send({
        embeds: [
          {
            color: "#64ab80",
            title: "**Bot Ownership Verification**",
            description:
              "Congratulations, you're the owner of the bot! (Verified by Professor DumbGuy123)",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "encode") {
      var toEncode = args.join(" ");
      var input = toEncode.value;
      var output;
      output.value = "";
      for (var i = 0; i < input.length; i++) {
        output.value += input[i].charCodeAt(0).toString(2) + " ";
      }
      if (!args[0])
        return message.channel.send({
          embeds: [
            {
              color: "RANDOM",
              title: "**Text Encoder**",
              description:
                "You need to say something for me to encode it to binaries!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });
      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
            title: "**Text Encoder**",
            description: "Here's your encoded message!",
            timestamp: new Date(),
            fields: [
              {
                name: "Binary Results",
                value: output
              }
            ],
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "decode") {
      var toDecode = args.join(" ");
      if (!args[0])
        return message.channel.send({
          embeds: [
            {
              color: "RANDOM",
              title: "**Text Encoder**",
              description:
                "You need to say something for me to encode it into binary!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });
      if (isNaN(args[0]))
        return message.channel.send({
          embeds: [
            {
              color: "RANDOM",
              title: "**Text Encoder**",
              description:
                "You need to say the binary code for decode it into text!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });
      message.channel.send({
        embeds: [
          {
            color: "RANDOM",
            title: "**Text Encoder**",
            description: "Here's your encoded message!",
            timestamp: new Date(),
            fields: [
              {
                name: "Binary Results",
                value: parseInt(toDecode, 2).toString(10)
              }
            ],
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
    }

    if (command === "blahtestlol") {
      const sayMessage = args.join(" ");
      if (!args[0])
        return message.channel
          .send({
            embeds: [
              {
                color: "RANDOM",
                title: "**Action Copy Cat**",
                description: "You need to say something for the bot to say!",
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              }
            ]
          })
          .then(msg => {
            msg.delete(10000);
          });
      message.delete().catch(O_o => {});
      message.channel.send(
        `${message.author.toString()} wants me to say "${sayMessage}"`
      );
    }

    if (command === "selfban") {
      if (message.guild.id !== "633535718559580179")
        return message.channel.send({
          embeds: [
            {
              color: "#db564f",
              title: "**Self Ban System**",
              description: "This command only works in r/realme Community!",
              timestamp: new Date(),
              footer: {
                text: "Made with ❤️ created by " + owner
              }
            }
          ]
        });
      message.channel.send({
        embeds: [
          {
            color: "#64ab80",
            title: "**Self Ban System**",
            description:
              "Successfully banned " + message.author.toString() + "***.***",
            timestamp: new Date(),
            footer: {
              text: "Made with ❤️ created by " + owner
            }
          }
        ]
      });
      message.author.send(
        "You were banned from r/realme Community | No reasons provided"
      );
    }

    // if (command === "reload" || "reboot" || "refresh") {
    //   if (message.author.id !== "410839910204047360")
    //     return message.channel.send({
    //       embeds: [
    //         {
    //           color: "RANDOM",
    //           title: "**iReboot**",
    //           description:
    //             "Only the bot owner can perform this action!",
    //           timestamp: new Date(),
    //           footer: {
    //             text: "Made with ❤️ created by " + owner
    //           }
    //         }
    //       ]
    //     });
    //   await message.channel.send({
    //     embeds: [
    //       {
    //         color: "RANDOM",
    //         title: "**iReboot**",
    //         description: "Bot is now rebooting!",
    //         timestamp: new Date(),
    //         footer: {
    //           text: "Made with ❤️ created by " + owner
    //         }
    //       }
    //     ]
    //   });
    //   await client.destroy();
    //   return process.exit(0);
    // }

    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 1000);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    let m = await interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Lag Machine**",
          description: "Ping?",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner
          }
        }
      ]
    });
    interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Lag Machine**",
          description: "Pong!",
          fields: [
            {
              name: "Latency",
              value: `${m.Date() - interaction.createdTimestamp}ms`
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
      ]
    });
  }
  
  if (commandName === "help") {
      let help = {
        color: "RANDOM",
        title: "**Available Commands**",
        description:
          "Use the dropdown menu to select a category below to see some available commands!",
        timestamp: new Date(),
        footer: {
          text: "Made with ❤️ created by " + owner
        }
      };
      let helpPanel = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("menu")
          .setPlaceholder("Select a category...")
          .addOptions([
            {
              label: "Basic Commands",
              description:
                "Some basic commands that allows you to check the bot!",
              value: "basic"
            },
            {
              label: "Fun Commands",
              description:
                "Some fun commands you can play with when you're bored!",
              value: "fun"
            },
            {
              label: "Misc Commands",
              description: "Some other commands you use too!",
              value: "misc"
            }
          ])
      );
      interaction.reply({ embeds: [help], components: [helpPanel] })
        .then(msg => {
          const select = interaction => interaction.isSelectMenu();
          const collector = msg.createMessageComponentCollector({
            select
          });

          collector.on("collect", async collected => {
            let value = collected.values[0];
            collected.deferUpdate();

            if (value === "basic") {
              let basic = {
                ccolor: "RANDOM",
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
                  },
                  {
                    name: "`rh!changelog`",
                    value:
                      "Shows you the change log of the bot with a specific date!"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              };
              msg.editReply({ embeds: [basic], components: [helpPanel] });
            }
            if (value === "fun") {
              let fun = {
                color: "RANDOM",
                title: ":8ball: **Fun Commands**",
                fields: [
                  {
                    name: "`rh!facts`",
                    value: "Tells you a boring fact!"
                  },
                  {
                    name: "`rh!skeppy`",
                    value:
                      "Tells you a random Skeppy quotes according to Wikitubia!"
                  },
                  {
                    name: "`rh!8`",
                    value:
                      "Ask any yes/no question, and it will answer you something!"
                  },
                  {
                    name: "`rh!gif`",
                    value: "Sends you a random GIF!"
                  },
                  {
                    name: "`rh!photo`",
                    value:
                      "Sends you a random HD photo with a random thumbnail!"
                  },
                  {
                    name: "`rh!say <Message>`",
                    value: "Says something what you say!"
                  },
                  {
                    name: "`rh!meme`",
                    value: "Tells you a meme from Subreddits!"
                  },
                  {
                    name: "`rh!print`",
                    value:
                      "Say something, the bot will output your text as an image!"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              };
              msg.editReply({ embeds: [fun], components: [helpPanel] });
            }
            if (value === "misc") {
              let misc = {
                color: "RANDOM",
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
                    name: "`rh!covid-19`",
                    value: "Tells you any global numbers of COVID-19 cases! :("
                  },
                  {
                    name: "`rh!reload`",
                    value: "Reboots the bot!"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  text: "Made with ❤️ created by " + owner
                }
              };
              msg.editReply({ embeds: [misc], components: [helpPanel] });
            }
          });
        });
    }
});

client.login(process.env.DISCORD);

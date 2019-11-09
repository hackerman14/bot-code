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
  console.log("The bot is currently on " + client.guilds.size + " severs!");

  setInterval(() => {
    client.user
      .setActivity("on " + client.guilds.size + " guilds | rh!help", {
        type: "PLAYING"
      })
      .then(presence =>
        console.log(
          `Activity set to "${presence.game ? presence.game.name : "none"}"`
        )
      )
      .catch(console.error);
  }, 1800000);

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
  const args = message.content.slice(prefix.length).split(" ");
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

    if (msg.includes("<!@619613322903420929>")) {
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**A Small Introduction**",
          description: "Hello! I am hackerman14, and my bot prefix is `rh!`.",
          fields: [],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}help`)) {
      helpMenu(message);
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
            },
            {
              name: "GIF Sources",
              value: "[Powered by GIPHY](https://giphy.com)"
            },
            {
              name: "Random Message Colors",
              value: "Code: ```js\nMath.floor(Math.random() * 16777214) + 1```"
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}useless`)) {
      var answers = [
        "Rubber bands last longer when refrigerated.",
        "Peanuts are one of the ingredients of dynamite.",
        "The national anthem of Greece has 158 verses. No one in Greece has memorized all 158 verses.",
        "There are 293 ways to make change for a dollar.",
        "A shark is the only fish that can blink with both eyes.",
        "There are more chickens than people in the world (at least before that chicken-flu thing).",
        "Two-thirds of the world’s eggplant is grown in New Jersey.",
        "The longest one-syllable word in the English language is “screeched.”",
        "All of the clocks in the movie Pulp Fiction are stuck on 4:20.",
        "No word in the English language rhymes with month, orange, silver or purple.",
        "“Dreamt” is the only English word that ends in the letters “mt”.",
        "All 50 states are listed across the top of the Lincoln Memorial on the back of the $5 bill.",
        "Almonds are members of the peach family.",
        "Winston Churchill was born in a ladies’ room during a dance.",
        "Maine is the only state whose name is just one syllable.",
        "There are only four words in the English language which end in “dous”: tremendous, horrendous, stupendous, and hazardous.",
        "Los Angeles’s full name is “El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula”. And can be abbreviated to 3.63% of its size, “L.A.”",
        "A cat has 32 muscles in each ear.",
        "An ostrich’s eye is bigger than it’s brain.",
        "Tigers have striped skin, not just striped fur.",
        "In most advertisements, including newspapers, the time displayed on a watch is 10:10.",
        "Al Capone’s business card said he was a used furniture dealer.",
        "The only real person to be a Pez head was Betsy Ross.",
        "When the University of Nebraska Cornhuskers plays football at home, the stadium becomes the state’s third-largest city.",
        "The characters Bert and Ernie on Sesame Street were named after Bert the cop and Ernie the taxi driver in Frank Capra’s “Its A Wonderful Life”",
        "A dragonfly has a lifespan of 24 hours.",
        "A goldfish has a memory span of three seconds.",
        "A dime has 118 ridges around the edge.",
        "On an American one-dollar bill, there is an owl in the upper left-hand corner of the “1” encased in the “shield” and a spider hidden in the front upper right-hand corner.",
        "It’s impossible to sneeze with your eyes open.",
        "The giant squid has the largest eyes in the world.",
        "Who’s that playing the piano on the “Mad About You” theme? Paul Reiser himself.",
        "The male gypsy moth can “smell” the virgin female gypsy moth from 1.8 miles away (pretty good trick).",
        "In England, the Speaker of the House is not allowed to speak.",
        "The name for Oz in the “Wizard of Oz” was thought up when the creator, Frank Baum, looked at his filing cabinet and saw A-N, and O-Z, hence “Oz.”",
        "The microwave was invented after a researcher walked by a radar tube and a chocolate bar melted in his pocket.",
        "Mr. Rogers is an ordained minister.",
        "John Lennon’s first girlfriend was named Thelma Pickles.",
        "The average person falls asleep in seven minutes.",
        "There are 336 dimples on a regulation golf ball.",
        "“Stewardesses” is the longest word that is typed with only the left hand.",
        "The “pound” key on your keyboard (#) is called an octotroph.",
        "The only domestic animal not mentioned in the Bible is the cat.",
        "The “dot” over the letter “i” is called a tittle.",
        "Table tennis balls have been known to travel off the paddle at speeds up to 160 km/hr.",
        "Pepsi originally contained pepsin, thus the name.",
        "The original story from “Tales of 1001 Arabian Nights” begins, “Aladdin was a little Chinese boy.”",
        "Nutmeg is extremely poisonous if injected intravenously.",
        "Honey is the only natural food that is made without destroying any kind of life. What about milk you say? A cow has to eat grass to produce milk and grass are living.",
        "Hawaiian alphabet only has 12 letters: A, E, I, O, U, H, K, L, M, N, P, W",
        "Honey is the only food that does not spoil.",
        "And one single teaspoon of honey represents the life work of 12 bees.",
        "Flamingos only can eat with their heads upside down.",
        "Lighter was invented ten years before the match was.",
        "It’s physically impossible for a pig to look up at the sky.",
        "The first internet domain name to ever be registered is Symbolics.com on March 15th, 1985.",
        "Humans are born with 350 bones in their body, but when reaching adulthood, we only have 260.",
        "There are 150 verses in Greek national anthem which making it the longest national anthem in the world.",
        "This is impossible to tickle yourself.",
        "A typical pencil can draw a line that is 35 miles long.",
        "Astronauts get taller in space due to the lack of gravity.",
        "The total surface area of human lungs is 750 square feet. That’s roughly the same area as on-side of a tennis court.",
        "Mosquitos have contributed to more deaths than any animals on earth.",
        "An octopus has 3 hearts, 9 brains & blue blood.",
        "The hair on a polar bear is actually not white but clear. They appear white because it reflects light.",
        "A chameleon can move its eyes in two different directions at the same time.",
        "Buttermilk does not contain any butter and actually low in fat.",
        "A giraffe can go longer without water than a camel can.",
        "Australia has the biggest camel population in the world.",
        "Snails can sleep up to 3 years.",
        "Methane gases produced by cow products as much pollution as cars do.",
        "The majority of the duct in your house is made up from your own dead skin.",
        "Most lipstick contains fish scales.",
        "Most ice-cream contains pig skins (Gelatin).",
        "The Philippine island of Luzon contains a lake that contains an island that contains a lake that contains another island.",
        "Hudson Bay Area in Canada had less gravity than the rest of the world and scientists do not know why.",
        "Only one to two percent of the entire world population are natural redheads.",
        "Sloppy handwriting has doctors kills more than 7,000 people and injures more than 1.5million people annually due to getting the wrong medication.",
        "Putting sugar on a wound or cut will greatly reduce pain and shorten the healing process.",
        "Real diamonds do not show up on X-ray.",
        "Due to extreme pressure and weather conditions, it literally rains diamonds on Neptune and Uranus.",
        "There are 7 different kinds of twins: Identical, Fraternal, Half-Identical, Mirror Image Twins, Mixed Chromosome Twins, Superfecundation and Superfetation.",
        "Before the 17th century, carrots were actually purple. They didn’t get their orange color until mutation occupied.",
        "If the sun is scaled down to the size of a white blood cell, the Milky Way would be equal the size of the United States.",
        "A grammatical pedantry syndrome is a form of OCD in which suffers feel the need to correct every grammatical error that they see.",
        "Scorpions can hold their breath underwater for up to 6 days.",
        "In zero gravity, a candle’s flame is round and blue.",
        "Only 8 percent of the world’s money exists in physical form, the rest is in computers.",
        "Crows are able to recognize human faces and even hold grudges against ones that they don’t like.",
        "Your cellphone carries up to ten times more bacteria than a toilet seat.",
        "Humans and bananas share about 50 percent of the same DNA.",
        "Humans have fewer chromosomes than a potato.",
        "An American Pharmacist named John Pemberton invented Coca-Cola who advertises it as a nerve tonic for curing headaches and fatigue.",
        "Statistically, you are more likely to die on the way to buy a lottery ticket than you are to win the lottery itself.",
        "The word checkmate comes from the Arabic شاه مات (šāh māt) which means “the king is dead.”",
        "Hot water turns to ice faster than cool water. This is known as the Mpemba effect.",
        "Apollo 7 Mission was the first “astronaut ice cream” flew in space. However, it was so unpopular among astronauts and was retired from the menu after only one trip into space.",
        "Apollo 8 astronauts were the first to celebrate Christmas in space.",
        "IV Is The Roman Numeral designation for 4 everywhere. However, on the clock face, 4 is displayed as “IIII”.",
        "The Apple Macintosh had the signatures of its design team engraved inside its case.",
        "Japan has the most vending machines per capita, a staggering 1:23."
      ];
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

    if (msg.startsWith(`${prefix}omg`)) {
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**World's First Code Ever Written**",
          description: "Hello, World!",
          fields: [],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}8`)) {
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
          description: randomAnswer,
          fields: [],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}gif`)) {
      fetch(
        "http://api.giphy.com/v1/gifs/random?api_key=YOUR_GIPHY_API_KEY_HERE"
      )
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

    if (msg.startsWith(`${prefix}attributions`)) {
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Attributions**",
          description: "All APIs requiring credits are listed here with logo.",
          fields: [
            {
              name: "GIPHY for Developers",
              value: "Used for sending GIFs!"
            }
          ],
          timestamp: new Date(),
          image: {
            url:
              "https://cdn.glitch.com/3c584fbb-057b-43a0-994b-8c2ce94fdebc%2FPoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif?v=1571492323469"
          },
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
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

    if (msg.startsWith(`${prefix}error`)) {
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Discord.js**",
          fields: [
            {
              name: "Index.js has stopped working",
              value: "Discord.js is checking a solution to the problem..."
            }
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
    }

    if (msg.startsWith(`${prefix}avatar`)) {
      const user = message.mentions.users.first() || message.author;
      message.channel.send({
        embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          title: "**Photo Machine**",
          description: "Here's the avatar!",
          fields: [],
          timestamp: new Date(),
          image: {
            url: user.avatarURL
          },
          footer: {
            text: "Made with ❤️ created by Raymond#1725"
          }
        }
      });
    }

    // Music Commands

    const serverQueue = queue.get(message.guild.id);

    if (msg.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      return;
    } else if (msg.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue);
      return;
    } else if (msg.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
    }

    // Adds the user to the set so that they can't talk for a minute
    cooldown.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      cooldown.delete(message.author.id);
    }, 1000);
  }
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

function helpMenu(message) {
  let channel = message.channel;

  // next create rich embeds
  let embed1 = new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: "**Commands List**",
    description: "Here's all the available commands!",
    fields: []
  });

  let embed2 = new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: "*Main Commands*",
    description: "Basic commands of the bot!",
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
        name: "`rh!attributions`",
        value: "Shows stuff about APIs that require credits!"
      }
    ]
  });

  let embed3 = new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: "*Fun Commands*",
    description: "Some fun commands you can play with!",
    fields: [
      {
        name: "`rh!useless`",
        value: "Tells you a random useless fact!"
      },
      {
        name: "`rh!skeppy`",
        value: "Tells you a random Skeppy meme!"
      },
      {
        name: "`rh!omg`",
        value: "100% basic coding course for sure!"
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
        name: "`rh!error`",
        value: "Typical Windows error message intergrated to a bot!"
      }
    ]
  });

  let embed4 = new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: "*Misc Commands*",
    description: "Just some boring commands!",
    fields: [
      {
        name: "`rh!ping`",
        value: "Replies you the respond time of the bot!"
      },
      {
        name: "`rh!avatar`",
        value: "Sends your/other's Discord avatar!"
      }
    ]
  });

  let embed5 = new Discord.RichEmbed({
    color: Math.floor(Math.random() * 16777214) + 1,
    title: "*Music Commands*",
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

  // Send the embed message to the channel
  channel.send(embed1).then(msg => {
    // after the first is sent, send the 2nd (makes sure it's in the correct order)
    channel.send(embed2).then(msg => {
      channel.send(embed3).then(msg => {
        channel.send(embed4).then(msg => {
          channel.send(embed5);
        });
      });
    });
  });
}

client.login(process.env.TOKEN);

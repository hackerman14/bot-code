// Core codes

const fs = require("node:fs");
const { Client, ClientUser, Collection, Intents } = require("discord.js");

const client = new Client({
  presence: {
    status: "dnd",
    afk: false,
    activities: [
      {
        name: "/help | Now in slash commands!",
      },
    ],
  },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
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
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  partials: ["CHANNEL", "MESSAGE"],
});

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
  console.log(
    `The bot is currently serving ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
  );
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (message) => {
  const wait = require("node:timers/promises").setTimeout;
  const botOwner = client.users.cache.get("410839910204047360").tag;
  if (message.author.bot) return;
  if (message.channel.type == "DM") {
    await message.channel.sendTyping();
    await wait(1000);
    await message.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "**Bruh Moment**",
          description: "I don't work in DMs!",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + botOwner,
          },
        },
      ],
    });
  }
});

// Other codes

const cheweyBotAnalyticsAPI = require("discord-bot-analytics");
const customAnalytics = new cheweyBotAnalyticsAPI(
  process.env.CHEYWEYAPI,
  client
);

const { AutoPoster } = require("topgg-autoposter");
const ap = AutoPoster(process.env.TOPGG, client);
ap.on("posted", () => {
  console.log("Posted stats to Top.gg!");
});

client.login(process.env.DISCORD);

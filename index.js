// Core codes

const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const client = new Client({
  presence: {
    status: "dnd",
    afk: false,
    activities: [
      {
        name: "/help | Hello, discord.js v14!",
      },
    ],
  },
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});
require("dotenv").config();

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const dmNotice = {
  color: 0x0ccab6,
  title: "**Hello!**",
  description: "Be aware that **commands are disabled** in DMs!",
  timestamp: new Date(),
  footer: {
    text: "Made with ❤️ created by Raymond#2829",
  },
};

client.once("ready", () => {
  console.log("Ready!");
  console.log(
    `The bot is currently serving ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
  );
});

client.on("error", (err) => {
  client.destroy();
  process.exit(0);
});

client.on("interactionCreate", async (interaction) => {
  const command = client.commands.get(interaction.commandName);
  if (!interaction.isChatInputCommand()) return;
  // if (!interaction.guild) {
  //   interaction.reply({ embeds: [dmNotice] });
  // }
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Error Occurred**",
          description:
            "There was an error while executing this command!\n`" + error + "`",
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + owner,
          },
        },
      ],
      content: "",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (message) => {
  const wait = require("node:timers/promises").setTimeout;
  if (message.author.bot) return;
  if (message.channel.type == "DM") {
    await wait(500);
    await message.channel.sendTyping();
    await wait(1000);
    await message.channel.send({ embeds: [dmNotice] });
  }
  if (message.content.includes("<@619613322903420929>")) {
    message.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Need Command Help?**",
          description:
            "Type `/` in the message box and select my avatar on the sidebar to check all my available commands!",
          fields: [
            {
              name: "Commands not showing up?",
              value:
                "Kick the bot first, then re-invite the bot to the server! \n Be sure to at least give the bot `View Channels`, `Send Messages`, and most importantly `Use Application Commands` via `Server Settings > Roles > hackerman14 (The role name is called it by default)`",
            },
            {
              name: "Have other questions?",
              value:
                "You can check out the bot FAQ first by [clicking here!](https://hackerman14.github.io/faq)",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by Raymond#2829",
          },
        },
      ],
    });
  }
});

// Other codes

const moment = require("moment");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(moment(Date.now()).format("LLLL") + " Ping Received");
  response.sendStatus(200);
});

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

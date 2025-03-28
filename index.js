// Core codes
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const client = new Client({
  presence: {
    status: "dnd",
    activities: [
      {
        name: "/help | Hello, World!",
        type: ActivityType.Custom,
      },
    ],
  },
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Commands Handler
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Events Handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on("error", (err) => {
  console.log(err);
  client.destroy();
  process.exit(0);
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
const customAnalytics = new cheweyBotAnalyticsAPI(process.env.CHEYWEYAPI, client);

const { AutoPoster } = require("topgg-autoposter");
const ap = AutoPoster(process.env.TOPGG, client);
ap.on("posted", () => {
  console.log("Posted stats to Top.gg!");
});

client.login(process.env.DISCORD);

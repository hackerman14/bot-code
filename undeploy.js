const fs = require("node:fs");
const { REST, Routes } = require("discord.js");
require("dotenv").config({ quiet: true });

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

// This will only remove guild commands, since guild commands can create duplicated commands in the specified guild.

(async () => {
  try {
    console.log("Started removing guild application (/) commands.");

    await rest
      .get(Routes.applicationGuildCommands(clientId, guildId))
      .then((data) => {
        const promises = [];
        for (const command of data) {
          const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
          promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
      });

    console.log("Successfully removed guild application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

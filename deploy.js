const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// This file will deploy both guild and global commands by default.

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD);

// Deploy guild commands 
(async () => {
  try {
    console.log(`Started reloading ${commands.length} guild application (/) commands.`);

    const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

    console.log(`Successfully reloaded ${data.length} guild application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

// Deploy global commands
(async () => {
  try {
    console.log(`Started reloading ${commands.length} global application (/) commands.`);

    const data = await rest.put(
			Routes.applicationCommands(clientId, guildId),
			{ body: commands },
		);

    console.log(`Successfully reloaded ${data.length} global application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

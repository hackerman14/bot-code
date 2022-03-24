const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const clientId = "619613322903420929"
const guildId = "457611176558460948"

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD);


(async () => {
	try {
		console.log('Started refreshing guild application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded guild application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

(async () => {
	try {
		console.log('Started refreshing global application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded global application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("Ready!");
    console.log(
      `The bot is currently serving in ${client.guilds.cache.size} servers.`
    );
  },
};
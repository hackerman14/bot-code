require("dotenv").config();
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);
    const botOwner = `${process.env.BOTOWNER}`;
    if (!interaction.isChatInputCommand()) return;
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        embeds: [
          {
            color: 0x0ccab6,
            title: "Error Occurred",
            description:
              "There was an error while executing this command!\n```" +
              error +
              "```",
            footer: {
              text: `Made with ❤️ created by ${botOwner}`,
            },
          },
        ],
        content: "",
        ephemeral: true,
      });
    }
  },
};

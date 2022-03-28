const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Look up the current Discord server information!"),
  async execute(interaction) {
    const { client, guild } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    const {
      createdTimestamp,
      ownerId,
      description,
      members,
      memberCount,
      channels,
      emojis,
      stickers,
    } = guild;

    if (!guild) return;

    if (typeof description === "string") {
      var desc = description;
    } else {
      var desc = "(None)";
    }

    interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: "Server Information",
          description: "Here's the server information!",
          thumbnail: {
            url: guild.iconURL,
          },
          fields: [
            {
              name: "Server Name",
              value: guild.name,
            },
            {
              name: "Description",
              value: desc,
            },
            {
              name: "Owner",
              value: `<@${ownerId}>`,
            },
            {
              name: "Server Creation Date",
              value: `<t:${parseInt(createdTimestamp / 1000)}:R>`,
            },
            {
              name: "Users",
              value: [
                `- Total Users: ${memberCount}`,
                `- Members: ${members.cache.filter((m) => !m.user.bot).size}`,
                `- Bots: ${members.cache.filter((m) => m.user.bot).size}`,
                `- Roles: ${guild.roles.cache.size}`,
              ].join("\n"),
            },
            {
              name: "Channels",
              value: [
                `
                - Total: ${channels.cache.size}`,
                `- Text: ${
                  channels.cache.filter((c) => c.type === "GUILD_TEXT").size
                }`,
                `- Voice: ${
                  channels.cache.filter((c) => c.type === "GUILD_VOICE").size
                }`,
                `- Announcements: ${
                  channels.cache.filter((c) => c.type === "GUILD_NEWS").size
                }`,
                `- Stages: ${
                  channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE")
                    .size
                }`,
                `- Threads: ${
                  channels.cache.filter(
                    (c) =>
                      c.type === "GUILD_PUBLIC_THREAD" &&
                      "GUILD_PRIVATE_THREAD" &&
                      "GUILD_NEWS_THREAD"
                  ).size
                }`,
                `- Categories: ${
                  channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size
                }`,
              ].join("\n"),
            },
            {
              name: "Emoji and Stickers",
              value: [
                `
                - Total: ${emojis.cache.size + stickers.cache.size}`,
                `- Static: ${emojis.cache.filter((e) => !e.animated).size}`,
                `- Animated: ${emojis.cache.filter((e) => e.animated).size}`,
                `- Stickers: ${stickers.cache.size}`,
              ].join("\n"),
            },
            {
              name: "Nitro Stats",
              value: [
                `
                - Tier: ${guild.premiumTier.replace("TIER_", "")}`,
                `- Boosts: ${guild.premiumSubscriptionCount}`,
                `- Boosters: ${members.cache.filter((m) => m.premiumSince).size}
              `,
              ].join("\n"),
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + botOwner,
          },
        },
      ],
    });
  },
};

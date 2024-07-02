require("dotenv").config();
const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Look up the current Discord server information!")
    .setDMPermission(false),
  async execute(interaction) {
    const { guild } = interaction;
    const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers } = guild;

    if (!guild) return;

    interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Server Information**",
          description: "Here's the server information!",
          thumbnail: {
            url: guild.iconURL(),
          },
          fields: [
            {
              name: "Server Name",
              value: guild.name,
              inline: true,
            },
            {
              name: "Owner",
              value: `<@${ownerId}>`,
              inline: true,
            },
            {
              name: "Description",
              value: description || "(None)",
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
                `- Text: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size}`,
                `- Voice: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}`,
                `- Announcements: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildAnnouncement).size}`,
                `- Forums: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildForum).size}`,
                `- Stages: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}`,
                `- Threads: ${
                  guild.channels.cache.filter(
                    (c) =>
                      c.type === ChannelType.PublicThread && ChannelType.PrivateThread && ChannelType.AnnouncementThread
                  ).size
                }`,
                `- Categories: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}`,
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
                `- Tier: ${guild.premiumTier ? String(guild.premiumTier).replace("TIER_", "") : "None"}`,
                `- Boosts: ${guild.premiumSubscriptionCount}`,
                `- Boosters: ${members.cache.filter((m) => m.premiumSince).size}
              `,
              ].join("\n"),
            },
          ],
          
        },
      ],
    });
  },
};

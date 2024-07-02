require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const querystring = require("querystring");

// Function to get Reddit Access Token
async function getRedditAccessToken() {
  const response = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    querystring.stringify({
      grant_type: "client_credentials",
    }),
    {
      auth: {
        username: process.env.REDDIT_CLIENT_ID,
        password: process.env.REDDIT_CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
}

module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("Retrieves a random meme from the internet!"),
  async execute(interaction) {
    let subReddits = [
      "dankmemes",
      "memes",
      "me_irl",
      "AdviceAnimals",
      "MemeEconomy",
      "ComedyCemetery",
      "PrequelMemes",
      "terriblefacebookmemes",
      "PewdiepieSubmissions",
      "funny",
      "teenagers",
    ];
    let random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const token = await getRedditAccessToken();
    const response = await axios.get(`https://oauth.reddit.com/r/${random}/hot`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "DiscordBot (your-bot-email@example.com)", // Change to a valid email
      },
      params: {
        limit: 100,
      },
    });

    const posts = response.data.data.children.filter((post) => post.data.post_hint === "image");
    if (posts.length === 0) {
      return interaction.reply(`No image posts found in r/${random}`);
    }

    const randomPost = posts[Math.floor(Math.random() * posts.length)].data;

    await interaction.reply({
      embeds: [
        {
          color: 0x0ccab6,
          title: "**Free Memes**",
          description: "Here's your meme!",
          fields: [
            {
              name: "Subreddit",
              value: randomPost.subreddit_name_prefixed,
            },
            {
              name: "Title",
              value: randomPost.title,
            },
            {
              name: "Author",
              value: randomPost.author,
            },
            {
              name: "Upvotes",
              value: randomPost.ups,
            },
            {
              name: "Comments",
              value: randomPost.num_comments,
            },
          ],
          image: {
            url: randomPost.url_overridden_by_dest || randomPost.url,
          },
          footer: {
            text: "Powered by Reddit",
          },
        },
      ],
    });
  },
};

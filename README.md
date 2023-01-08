# hackerman14

## About
In September 2019, in my Discord server had some custom response setup with Dyno bot, and someone asked that why does it respond with Dyno instead of my bot, so I coded one. At first I'd just want a server bot, but now I decided to make it for everyone.

## Story of The Bot

This project is the very start of my journey in actual coding, not like `print('hello world')` or super basic input outputs via console. The project started as v1, it ended up having the entire bot's code held in `index.js` which has around 2000 lines of code, this is not just a pain to any developer trying to look ar your code, and it definitely executes inefficiently. I had really big frustration in creating a slash commands handler since every time I tried to do so the code literally fails successfully and I was straight up confused.

And then, here's the game changer *(to me it definitely is)*. hackerman14 Bot v2 was introduced not long after the release of [discord.js](https://discord.js.org) v13 (which introduced easy access to slash commands), I implemented the slash commands handler since the v1 was completely text-based commands all held in one big `index.js` file which has a ton of code like I just mentioned if I wasn't wrong.

## Troubleshooting

 - If the bot went offline, please contact the owner regards the issue.
 - If the bot wasn't working, you should check the permissions for it in your server or maybe you've blocked the bot.

## Features

 - Fun commands such as /skeppy, /gif etc.
 - Information commands such as /covid, /user etc.
 - Useless commands such as /help, /about, etc.

## Self Hosting

Yes you can, but I don't recommend you doing so, I had issues making projects work from Glitch to a localhost, but here are a few simple steps:
1. Install all packages in `package.json`
2. Put your API Tokens/Keys/Links in `.env` (I've explained what you should put in the file via the file itself)
3. Run `node index.js` to start the bot and `node deploy.js` to deploy the commands.

*(Note: Please refrain from completely making the bot look nearly the same when you use part of my codes, this isn't really nice to honestly steal people's code and renaming it to your own bot without crediting me.)*

## Credits

*   Library: [discord.js](https://discord.js.org)
*   GIF Library: [Giphy for Developers](https://developers.giphy.com)
*	HD Photo Gallery: [Unsplash Image API](https://unsplash.com/developers)
*   Server Count: [DBL API](https://top.gg/api/docs)
*   Boring Facts: [useless-facts-api](https://github.com/sameerkumar18/useless-facts-api)
*	Jokes: [ICNDB](http://icndb.com/api)
*	COVID-19 Information: [COVID19 API](https://covid19api.com)
*	Special Thanks To People In These Communities: [YouTube](https://youtube.com), [Stack Overflow](https://stackoverflow.com), [code::together](https://discord.gg/BPJ3W3X), [Discord.js Guide](https://discordjs.guide/)

# hackerman14

## About
In September 2019, in my Discord server had some custom response setup with Dyno bot, and someone asked that why does it respond with Dyno instead of my bot, so I coded one. At first I'd just want a server bot, but now I decided to make it for everyone.

## Story of The Bot

This project is the very start of my journey in actual coding, not like `print('hello world')` or super basic input outputs via console. The project started as v1, it ended up having the entire bot's code held in `index.js` which has around 2000 lines of code, this is not just a pain to any developer trying to look ar your code, and it definitely executes inefficiently. I had really big frustration in creating a slash commands handler since every time I tried to do so the code literally fails successfully and I was straight up confused.

And then, here's the game changer *(to me it definitely is)*. hackerman14 Bot v2 was introduced not long after the release of [discord.js](https://discord.js.org) v13 (which introduced easy access to slash commands), I implemented the slash commands handler since the v1 was completely text-based commands all held in one big `index.js` file which has a ton of code like I just mentioned if I wasn't wrong.

One of the main reasons I'm making this bot open source is to help people who encounter difficulties in certain parts of their code. They can refer to my code and possibly resolve their issues, while I might not have everything you need, but you might find your solution in my pile of codes. I used to have pretty painful time asking a ton of questions back when I wasn't familiar with coding at all, people just end up telling me "LEARN HOW TO CODE" / "READ THE DOCS" instead of giving me a solution when they probably know what the problem was in my code.

## Troubleshooting

 - If the bot went offline, please contact the me regards the issue.
 - If the bot isn't working, try checking the permissions for the bot in your server or maybe you've blocked the bot.

## Features

 - Fun commands such as `/skeppy`, `/gif` etc.
 - Information commands such as `/urban`, `/define` etc.
 - Useless commands such as `/help`, `/about`, etc.

## Self Hosting

Yes you can, but I don't recommend you doing so, I had issues making projects work from Glitch to a localhost, but here are a few simple steps:
1. Install all packages in `package.json`
2. Put your API credentials in `.env` (I've explained what you should put in the file via the file itself)
3. Run `node index.js` to start the bot and `node deploy.js` to deploy the commands.
4. Run `node undeploy.js` to remove guild commands. **(Recommended)**

*(Note: Please refrain from completely making the bot look nearly the same when you use part of my codes, this isn't really nice to honestly steal people's code and renaming it to your own bot without crediting me.)*

## Credits

* Library: [discord.js](https://discord.js.org)
* Server Count: [DBL API](https://top.gg/api/docs)
* GIF Library: [GIPHY Developers](https://developers.giphy.com) and [Tenor API](https://developers.google.com/tenor/guides/quickstart)
*	HD Photo Gallery: [Unsplash Image API](https://unsplash.com/developers)
* Word Definition: [Urban Dictionary](https://www.urbandictionary.com) and [Marriam-Webster Dictionary API](https://dictionaryapi.com/)
* Translate: [Google Translate API](https://cloud.google.com/translate)
* Boring Facts: [Useless Facts API by sameerkumar18](https://github.com/sameerkumar18/useless-facts-api) and [Random Useless Facts by jsphpl](https://uselessfacts.jsph.pl)
*	Dad Jokes: [icanhazdadjoke](https://icanhazdadjoke.com/)
*	Special Thanks To People In These Communities: [YouTube](https://youtube.com), [Stack Overflow](https://stackoverflow.com), [Discord.js Guide](https://discordjs.guide/), and more to mention!
* AI Assist: [ChatGPT](https://chatgpt.com) and [GitHub Copilot](https://github.com/features/copilot)

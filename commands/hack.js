const wait = require("node:timers/promises").setTimeout;
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hack")
    .setDescription("Hack a user! (Dank Memer enhanced replica)")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to hack!")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { client } = interaction;
    const botOwner = client.users.cache.get("410839910204047360").tag;
    let member = await interaction.options.getUser("user").fetch(true);

    function randomPassword() {
      var length = 8,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    }

    function randomEmail() {
      var text = ["123", "lol", "xd", "haha"];
      var randomText = text[Math.floor(Math.random() * text.length)];
      var emailSuffix = [
        "hotmail.com",
        "outlook.com",
        "gmail.com",
        "protonmail.com",
        "yahoo.com",
        "aol.com",
        "msn.com",
      ];
      var randomEmailSuffix =
        emailSuffix[Math.floor(Math.random() * emailSuffix.length)];
      var result = `${member.username}${randomText}@${randomEmailSuffix}`;
      return result;
    }

    function randomPhrase() {
      var phrase = ["iirc", "lol", "xd", "haha", "you sux", "69420"];
      var result = phrase[Math.floor(Math.random() * phrase.length)];
      return result;
    }

    function randomDM() {
      var message = [
        "ur mom is kinda hot",
        "look at this dude",
        "i wanna breakup with you",
        "imagine using macos",
        "windows user L",
        "arch linux best",
      ];
      var result = message[Math.floor(Math.random() * message.length)];
      return result;
    }

    function randomMalware() {
      var malware = [
        "Trojan.JS.YouAreAnIdiot",
        "Virus.Win9x.CIH/Chernobyl",
        "Email-Worm.Win32.MeltingScreen",
        "Trojan.Win32.MEMZ",
        "Email-Worm.Win32.LoveLetter",
        "Trojan.Ransom.Rensenware",
        "Trojan.SymbOS.Fontal",
        "Trojan.Ransom.WannaCrypt",
        "Trojan.Win32.Alerta",
      ];
      var result = malware[Math.floor(Math.random() * malware.length)];
      return result;
    }

    function randomBrowser() {
      var browser = [
        "Chrome",
        "Firefox",
        "Safari",
        "Edge",
        "Opera",
        "Brave",
        "Internet Explorer",
        "Vivaldi",
        "Tor Browser",
      ];
      var result = browser[Math.floor(Math.random() * browser.length)];
      return result;
    }

    function randomUsername() {
      var malware = [
        "Minecraft4Life",
        "desperate_enuf",
        "kissmyaxe",
        "king_0f_dairy_queen",
        "big_mamas_house",
        "bill_nye_the_russian_spy",
        "xbox_sign_out",
        "oprah_wind_fury",
        "fresh_out_the_oven",
      ];
      var result = malware[Math.floor(Math.random() * malware.length)];
      return result;
    }

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    const randomIP = `${randomNumber(256, 999)}.${randomNumber(
      256,
      999
    )}.${randomNumber(256, 999)}.${randomNumber(256, 999)}`;

    const title = "**The Ultimate Hacker**";
    const description = `Target: ${member}`;
    const fieldName = "Console Log";

    const log1 = `Application started.`;
    const log2 = `Hacking user's Discord account...`;
    const log3 = `Email: ${randomEmail()}`;
    const log4 = `Pasword: ${randomPassword()}`;
    const log5 = `Fetching DMs with closest friends... (if they are any friends at all)`;
    const log6 = `Found latest DM: "${randomDM()}"`;
    const log7 = `Finding user's most common phrase...`;
    const log8 = `Found user's most common phrase: ${randomPhrase()}`;
    const log9 = `Injecting ${randomMalware()} into discriminator #${
      member.discriminator
    }`;
    const log10 = `Malware injected, stole their ${randomBrowser()} password too.`;
    const log11 = `Hacking their Steam account...`;
    const log12 = `Breached user's Steam account: ${randomUsername()}`;
    const log13 = `Finding user's IP address...`;
    const log14 = `Found user's IP address: ${randomIP}`;
    const log15 = `Selling user data to the government...`;
    const log16 = `Successfully sold user data to the government!`;
    const log17 = `Reporting account to Discord for multiple ToS violations...`;
    const log18 = `Successfully submitted report to Discord!`;
    const log19 = `The totally "dangerous" and illegal hack has completed task.`;
    const maxLengthError = `Console log reached max 1024 characters, continuing task in "Console Log 2".`;

    const time1 = new Date().toISOString();
    await interaction.reply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [`\`\`\``, `[${time1}] ${log1}`, `\`\`\``].join("\n"),
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Made with ❤️ created by " + botOwner,
          },
        },
      ],
    });
    await wait(2000);
    const time2 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `\`\`\``,
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
    await wait(1500);
    const time3 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `\`\`\``,
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
    await wait(1200);
    const time4 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `\`\`\``,
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
    await wait(2000);
    const time5 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `\`\`\``,
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
    await wait(1600);
    const time6 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `\`\`\``,
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
    await wait(1400);
    const time7 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `\`\`\``,
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
    await wait(1100);
    const time8 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `\`\`\``,
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
    await wait(1700);
    const time9 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `\`\`\``,
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
    await wait(1400);
    const time10 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `\`\`\``,
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
    await wait(1200);
    const time11 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `\`\`\``,
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
    await wait(1300);
    const time12 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `\`\`\``,
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
    await wait(1500);
    const time13 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `[${time13}] ${log14}`,
                `\`\`\``,
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
    await wait(1700);
    const time14 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `[${time13}] ${log14}`,
                `[${time14}] ${log15}`,
                `\`\`\``,
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
    await wait(1200);
    const time15 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `[${time13}] ${log14}`,
                `[${time14}] ${log15}`,
                `\`\`\``,
              ].join("\n"),
            },
            {
              name: `${fieldName} 2`,
              value: [
                `\`\`\``,
                `[${time15}] ${maxLengthError}`,
                `[${time15}] ${log16}`,
                `\`\`\``,
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
    await wait(1200);
    const time16 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `[${time13}] ${log14}`,
                `[${time14}] ${log15}`,
                `\`\`\``,
              ].join("\n"),
            },
            {
              name: `${fieldName} 2`,
              value: [
                `\`\`\``,
                `[${time15}] ${maxLengthError}`,
                `[${time15}] ${log16}`,
                `[${time16}] ${log17}`,
                `\`\`\``,
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
    await wait(1600);
    const time17 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `[${time13}] ${log14}`,
                `[${time14}] ${log15}`,
                `\`\`\``,
              ].join("\n"),
            },
            {
              name: `${fieldName} 2`,
              value: [
                `\`\`\``,
                `[${time15}] ${maxLengthError}`,
                `[${time15}] ${log16}`,
                `[${time16}] ${log17}`,
                `[${time17}] ${log18}`,
                `\`\`\``,
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
    await wait(1400);
    const time18 = new Date().toISOString();
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `[${time13}] ${log14}`,
                `[${time14}] ${log15}`,
                `\`\`\``,
              ].join("\n"),
            },
            {
              name: `${fieldName} 2`,
              value: [
                `\`\`\``,
                `[${time15}] ${maxLengthError}`,
                `[${time15}] ${log16}`,
                `[${time16}] ${log17}`,
                `[${time17}] ${log18}`,
                `[${time18}] ${log19}`,
                `\`\`\``,
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
    await wait(3000);
    await interaction.editReply({
      embeds: [
        {
          color: "RANDOM",
          title: title,
          description: description,
          fields: [
            {
              name: fieldName,
              value: [
                `\`\`\``,
                `[${time1}] ${log1}`,
                `[${time2}] ${log2}`,
                `[${time3}] ${log3}`,
                `[${time3}] ${log4}`,
                `[${time4}] ${log5}`,
                `[${time5}] ${log6}`,
                `[${time6}] ${log7}`,
                `[${time7}] ${log8}`,
                `[${time8}] ${log9}`,
                `[${time9}] ${log10}`,
                `[${time10}] ${log11}`,
                `[${time11}] ${log12}`,
                `[${time12}] ${log13}`,
                `[${time13}] ${log14}`,
                `[${time14}] ${log15}`,
                `\`\`\``,
              ].join("\n"),
            },
            {
              name: `${fieldName} 2`,
              value: [
                `\`\`\``,
                `[${time15}] ${maxLengthError}`,
                `[${time15}] ${log16}`,
                `[${time16}] ${log17}`,
                `[${time17}] ${log18}`,
                `[${time18}] ${log19}`,
                `\`\`\``,
              ].join("\n"),
            },
            {
              name: "In case you're dumb...",
              value:
                "This is 100% a joke command that doesn't even hack people...",
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

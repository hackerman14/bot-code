const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'rh!'

client.once('ready', () => {
    console.log('Your bot is now online!')

    client.user.setActivity('rh!help', {
            type: 'PLAYING'
        })
        .then(presence => console.log(`Activity set to "${presence.game ? presence.game.name : 'none'}"`))
        .catch(console.error);

    client.user.setStatus('dnd')

})


client.on('message', message => {
    //console.log(message.content);

    if (message.content.includes("@everyone")) {
        message.channel.send("REEEEEEEEEEEEEEEEE")
    }

    if (message.content.startsWith(`<@!619613322903420929>`)) {
        message.channel.send("sup")
    }

    if (message.content.includes("ok google")) {
        message.channel.send("dude im not google assistant")
    }

    if (message.content.includes("siri")) {
        message.channel.send("i'm not smart as ai lol")
    }

    if (message.content.includes("alexa")) {
        message.channel.send("you can go purchase one in amazon")
    }
  
    if (message.content.startsWith("bot.exe has stopped working")) {
        message.channel.send("bot.exe has stopped working")
    }
  

    if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send("**Here's the command list!** \n`rh!help` - Shows this command list! \n`rh!about` - Shows you the info about the bot! \n`rh!useless` - Tells you a useless fact! \n`rh!skeppy` - Tells you a random Skeppy meme! \n`rh!ping` - Replies you the respond time for the bot! \n`rh!annoy` - Sends people a DM to annoy them! \n`rh!spam` - Spams messages! *(WARNING: THIS MAY EXPLODE THE CHAT, RECOMMENDED NOT TO USE!)*")
    }

    if (message.content.startsWith(`${prefix}about`)) {
        message.channel.send("**About this Bot** \nBot Name: Raymond \nCreator: Raymond#1725 \nHost: Glitch.com \nAlways Online: LNGZL. Development")
    }

    if (message.content.startsWith(`${prefix}useless`)) {
        var answers = ["Rubber bands last longer when refrigerated.", "Peanuts are one of the ingredients of dynamite.", "The national anthem of Greece has 158 verses. No one in Greece has memorized all 158 verses.", "There are 293 ways to make change for a dollar.", "A shark is the only fish that can blink with both eyes.", "There are more chickens than people in the world (at least before that chicken-flu thing).", "Two-thirds of the world’s eggplant is grown in New Jersey.", "The longest one-syllable word in the English language is “screeched.”", "All of the clocks in the movie Pulp Fiction are stuck on 4:20.", "No word in the English language rhymes with month, orange, silver or purple.", "“Dreamt” is the only English word that ends in the letters “mt”.", "All 50 states are listed across the top of the Lincoln Memorial on the back of the $5 bill.", "Almonds are members of the peach family.", "Winston Churchill was born in a ladies’ room during a dance.", "Maine is the only state whose name is just one syllable.", "There are only four words in the English language which end in “dous”: tremendous, horrendous, stupendous, and hazardous.", "Los Angeles’s full name is “El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula”. And can be abbreviated to 3.63% of its size, “L.A.”", "A cat has 32 muscles in each ear.", "An ostrich’s eye is bigger than it’s brain.", "Tigers have striped skin, not just striped fur.", "In most advertisements, including newspapers, the time displayed on a watch is 10:10.", "Al Capone’s business card said he was a used furniture dealer.", "The only real person to be a Pez head was Betsy Ross.", "When the University of Nebraska Cornhuskers plays football at home, the stadium becomes the state’s third-largest city.", "The characters Bert and Ernie on Sesame Street were named after Bert the cop and Ernie the taxi driver in Frank Capra’s “Its A Wonderful Life”", "A dragonfly has a lifespan of 24 hours.", "A goldfish has a memory span of three seconds.", "A dime has 118 ridges around the edge.", "On an American one-dollar bill, there is an owl in the upper left-hand corner of the “1” encased in the “shield” and a spider hidden in the front upper right-hand corner.", "It’s impossible to sneeze with your eyes open.", "The giant squid has the largest eyes in the world.", "Who’s that playing the piano on the “Mad About You” theme? Paul Reiser himself.", "The male gypsy moth can “smell” the virgin female gypsy moth from 1.8 miles away (pretty good trick).", "In England, the Speaker of the House is not allowed to speak.", "The name for Oz in the “Wizard of Oz” was thought up when the creator, Frank Baum, looked at his filing cabinet and saw A-N, and O-Z, hence “Oz.”", "The microwave was invented after a researcher walked by a radar tube and a chocolate bar melted in his pocket.", "Mr. Rogers is an ordained minister.", "John Lennon’s first girlfriend was named Thelma Pickles.", "The average person falls asleep in seven minutes.", "There are 336 dimples on a regulation golf ball.", "“Stewardesses” is the longest word that is typed with only the left hand.", "The “pound” key on your keyboard (#) is called an octotroph.", "The only domestic animal not mentioned in the Bible is the cat.", "The “dot” over the letter “i” is called a tittle.", "Table tennis balls have been known to travel off the paddle at speeds up to 160 km/hr.", "Pepsi originally contained pepsin, thus the name.", "The original story from “Tales of 1001 Arabian Nights” begins, “Aladdin was a little Chinese boy.”", "Nutmeg is extremely poisonous if injected intravenously.", "Honey is the only natural food that is made without destroying any kind of life. What about milk you say? A cow has to eat grass to produce milk and grass are living.", "Hawaiian alphabet only has 12 letters: A, E, I, O, U, H, K, L, M, N, P, W", "Honey is the only food that does not spoil.", "And one single teaspoon of honey represents the life work of 12 bees.", "Flamingos only can eat with their heads upside down.", "Lighter was invented ten years before the match was.", "It’s physically impossible for a pig to look up at the sky.", "The first internet domain name to ever be registered is Symbolics.com on March 15th, 1985.", "Humans are born with 350 bones in their body, but when reaching adulthood, we only 260.", "There are 150 verses in Greek national anthem which making it the longest national anthem in the world.", "This is impossible to tickle yourself.", "A typical pencil can draw a line that is 35 miles long.", "Astronauts get taller in space due to the lack of gravity.", "The total surface area of human lungs is 750 square feet. That’s roughly the same area as on-side of a tennis court.", "Mosquitos have contributed to more deaths than any animals on earth.", "An octopus has 3 hearts, 9 brains & blue blood.", "The hair on a polar bear is actually not white but clear. They appear white because it reflects light.", "A chameleon can move its eyes in two different directions at the same time.", "Buttermilk does not contain any butter and actually low in fat.", "A giraffe can go longer without water than a camel can.", "Australia has the biggest camel population in the world.", "Snails can sleep up to 3 years.", "Methane gases produced by cow products as much pollution as cars do.", "The majority of the duct in your house is made up from your own dead skin.", "Most lipstick contains fish scales.", "Most ice-cream contains pig skins (Gelatin).", "The Philippine island of Luzon contains a lake that contains an island that contains a lake that contains another island.", "Hudson Bay Area in Canada had less gravity than the rest of the world and scientists do not know why.", "Only one to two percent of the entire world population are natural redheads.", "Sloppy handwriting has doctors kills more than 7,000 people and injures more than 1.5million people annually due to getting the wrong medication.", "Putting sugar on a wound or cut will greatly reduce pain and shorten the healing process.", "Real diamonds do not show up on X-ray.", "Due to extreme pressure and weather conditions, it literally rains diamonds on Neptune and Uranus.", "There are 7 different kinds of twins: Identical, Fraternal, Half-Identical, Mirror Image Twins, Mixed Chromosome Twins, Superfecundation and Superfetation.", "Before the 17th century, carrots were actually purple. They didn’t get their orange color until mutation occupied.", "If the sun is scaled down to the size of a white blood cell, the Milky Way would be equal the size of the United States.", "A grammatical pedantry syndrome is a form of OCD in which suffers feel the need to correct every grammatical error that they see.", "Scorpions can hold their breath underwater for up to 6 days.", "In zero gravity, a candle’s flame is round and blue.", "Only 8 percent of the world’s money exists in physical form, the rest is in computers.", "Crows are able to recognize human faces and even hold grudges against ones that they don’t like.", "Your cellphone carries up to ten times more bacteria than a toilet seat.", "Humans and bananas share about 50 percent of the same DNA.", "Humans have fewer chromosomes than a potato.", "An American Pharmacist named John Pemberton invented Coca-Cola who advertises it as a nerve tonic for curing headaches and fatigue.", "Statistically, you are more likely to die on the way to buy a lottery ticket than you are to win the lottery itself.", "The word checkmate comes from the Arabic شاه مات (šāh māt) which means “the king is dead.”", "Hot water turns to ice faster than cool water. This is known as the Mpemba effect.", "Apollo 7 Mission was the first “astronaut ice cream” flew in space. However, it was so unpopular among astronauts and was retired from the menu after only one trip into space.", "Apollo 8 astronauts were the first to celebrate Christmas in space.", "IV Is The Roman Numeral designation for 4 everywhere. However, on the clock face, 4 is displayed as “IIII”.", "The Apple Macintosh had the signatures of its design team engraved inside its case.", "Japan has the most vending machines per capita, a staggering 1:23."]
        var randomAnswer = answers[Math.floor(Math.random() * answers.length)]
        message.channel.send(randomAnswer)
    }

    if (message.content.startsWith(`${prefix}skeppy`)) {
        var answers = ["flip flop", "14", "ping spoofing", "turtle", "daddy", "BadBoyHalo", "BadBoyHalo is a potato", "Jif", "I was testing", "cheesy fries", "slash slash undo", "idot", "sotp", "pine cone", "thin crust pizza", "ding", "oh my godness", "candad", "muffintop", "muffin", "bisector", "photosynthesis", "slash slash sudo", "CryBoyHalo"]
        var randomAnswer = answers[Math.floor(Math.random() * answers.length)]
        message.channel.send(randomAnswer)
    }

    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send("Your ping is" + new Date().getTime() - message.createdTimestamp + " ms");
    }

    if (message.content.startsWith(`${prefix}annoy`)) {
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) return message.channel.send("dude mention someone to continue annoying someone lol");
        mentionedUser.send('Am I a joke to you?');
        message.channel.send("Annoyed " + mentionedUser + "! (Oh wait, I annoyed them 2 times!)");
    }
  
    if (message.content.startsWith(`${prefix}spam`)) {  
        message.channel.send("bot.exe has stopped working")
    }
})

client.login(process.env.TOKEN);

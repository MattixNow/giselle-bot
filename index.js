// Libs Import
const Discord = require("discord.js")
const client = new Discord.Client()
// const webhook = require("webhook-discord")

// const Hook = new webhook.Webhook("")
// // Config load, contain our client secret (ignored by gitignore)
// // Hook.err("Node.js Debugger",`Error with ${process.env.npm_package_name} ⚠`)
// console.error = function(msg) {
//   Hook.err("Node.js Debugger",`Error with ${process.env.npm_package_name} ⚠ ${msg}`)
//   process.stderr.write(msg);
// };
const config = require("./public_config.json")
require("dotenv").config()

// Global Variables
var myArray = ["Hey", "Hello", "Bonjour", "Bonsoir"]
var newsEmbed = require("./docs/news.json")
var aboutEmbed = require("./docs/about.json")
var helpEmbed = require("./docs/help.json")

// client.on("error", (e) => {
//   Hook.err("Node.js Debugger",`Error with ${process.env.npm_package_name} ⚠ ${msg}`)
// });
client.on("ready", () => {
    var today = new Date()
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = date + " " + time

    let embedsArray = [newsEmbed, aboutEmbed, helpEmbed]
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds. ⏱️  ${dateTime}`)
    setInterval(() => {
    client.user.setActivity(`Chèvre laitière | $help | semoule.fr`)
    }, 10000)
    const avatarClient = client.user.avatarURL
    embedsArray.forEach(function(el) {
        el.embed.footer.icon_url = avatarClient
    })
})
//throw new Error('Yeah... Sorry');

client.on("message", async message => {
    try {
        /* #### Commands definition #### */

        // Restrict access
        if (message.channel.name === "bot-spam" || message.channel.name === "bot" || message.channel.name === "bots" || message.channel.name === "giselle") {
            if (message.author.bot) return // Fallbacks from https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3
            if (message.content.indexOf(config.prefix) !== 0) return

            // Prefix from //
            const args = message.content
                .slice(config.prefix.length)
                .trim()
                .split(/ +/g)
            const command = args.shift().toLowerCase()

            // Commands
            if (command === "ping") {
                const m = await message.channel.send("Ping?")
                m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
            }
        }
    } catch (e) {
        console.log(e)
    }
})

client.on("message", message => {
    /* Embeds Definition */
    var embedsArray = [newsEmbed, aboutEmbed, helpEmbed]
    embedsArray.forEach(function(le, index) {
        // console.log(index, " --- ", "1", le);
        resultString = JSON.stringify(embedsArray[index])
        resultString = resultString.replace("X.X", client.users.size).replace("naranja", message.guild.name)
        // console.log(index, " --- ", "2")
        resultParse = JSON.parse(resultString)
        // console.log(index, " --- ", "3")
        embedsArray[index] = resultParse
        // console.log(index, " --- ", "4", embedsArray[index])
        // console.log("||||||||||||||||||||||||||||||`||||||||||||||||||||||||||||||||||||||||||||||||||||||")
    })

    /* #### Commands definition #### */

    if (message.channel.name === "bot-spam" || message.channel.name === "bot" || message.channel.name === "bots" || message.channel.name === "giselle") {
        if (message.author.bot) return
        if (message.content.indexOf(config.prefix) !== 0) return
        const args = message.content
            .slice(config.prefix.length)
            .trim()
            .split(/ +/g)
        const command = args.shift().toLowerCase()

        // Local Variables
        var randomValue = myArray[Math.floor(Math.random() * myArray.length)]

        // Commands
        if (command === "hey") {
            message.channel.send(`${randomValue} comment vas-tu ?`)
        }

        if (command === "news") {
            message.channel.send(embedsArray[0])
        }

        if (command === "about") {
            message.channel.send(embedsArray[1])
        }

        if (command === "help") {
            message.channel.send(embedsArray[2])
        }
    }
})
// Login with secret
client.login(process.env.TOKEN)

// Authorization field https://discordapp.com/oauth2/authorize?client_id=585154615545430054&scope=bot&permissions=67632193

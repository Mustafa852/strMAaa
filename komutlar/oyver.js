const Strom = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const talkedRecently = new Set();
let botid = "756883309270663229";

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

    const embed = new Strom.MessageEmbed()
    .setAuthor(
      `${client.user.username} `,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("RANDOM")
    .setTitle(` **oy ver gardeeş** `)
    .setDescription(`**oy Vermek için** [TIKLA](https://top.gg/bot/1037392359249432598/vote)
  
      ${message.author.username} Tarafından İstendi.`,
      message.author.displayAvatarURL({ dynamic: true })
    );
  
return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oy","oyver"],
  permLevel: 0
};

exports.help = {
  name: "Oyver",
  description: "oy",
  usage: "Oyver"
};

const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
let prefix = require("../ayarlar.json");

let motivasyonlar = [
"Başarı sana güven duymanla başlar.",
"Her başarısız deneme, bir başarı için bir adımdır.",
"Hayallerin olması, başlaman için en iyi sebepdir.",
"Başarı, sabırla, çalışma azmiyle ve öğrenme isteğiyle gelir.",
"Başarılı olmak istemek, onun yarısıdır.",
"Hayatta başarılı olmak, doğru adımları atmak ve doğru zamanda doğru şeyleri yapmakla ilgilidir.",
"Başarı, hedefinize odaklanmanız ve ona ulaşmak için her fırsatı değerlendirmenizle ilgilidir.",
"Başarı, düşmeyi göze alabilecek kadar yüksek atlamaktır.",
"Hayatta başarılı olmak, beklentilerinizi aşmanızı ve hedeflerinizi gerçekleştirmenizi sağlar.",
"Başarı, umutsuzluğa karşı direnmek ve devam etmektir.",
];

let motivasyon = motivasyonlar[Math.floor(Math.random() * motivasyonlar.length)];

const embed = new Discord.MessageEmbed()
  .setAuthor(
    `${client.user.username} `,
    client.user.displayAvatarURL({ dynamic: true })
  )
  .setColor("RANDOM")
  .setTitle(` **Motivasyon** `)
  .setDescription(`${motivasyon}`);

message.channel.send(embed);

};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["motivasyon"],
permLevel: 0
};

exports.help = {
name: "Motivasyon",
description: "Rastgele motivasyon mesajları atar.",
usage: "motivasyon"
};




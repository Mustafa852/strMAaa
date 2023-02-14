const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if(message.author.id !== sahip) return message.channel.send("Bu komutu sadece sahip kullanabilir!");
  
  let bakim = args.join(" ");
  if(!bakim) return message.channel.send("Lütfen bakım nedeni belirtin!");
  
  message.delete();
  let bakimEmbed = new Discord.MessageEmbed()
    .setTitle("Bakım Modu")
    .setColor("#ff0000")
    .addField("Bakım Nedeni", bakim)
    .setFooter("Bot Bakım Modunda");
  
  client.guilds.cache.forEach(g => {
    g.channels.cache.forEach(c => {
      if(c.type === "text") c.send(bakimEmbed);
    });
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bakım'],
  permLevel: 0
};

exports.help = {
  name: "bakım",
  description: "Bakım moduna geçirir.",
  usage: "bakım [neden]"
};

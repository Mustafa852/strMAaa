

const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.inlineReply(
      "❌ | Sen çekiliş yapamazsın. `Sunucuyu Yönet` yetkisine sahip değilsin!"
    );
  let id = args[0];
  if (!id)
    return message.inlineReply("❌ | Geçerli bir mesaj ID'si belirtmelisiniz!");
  let hasGiveaway =
    client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
    client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);
  if (!hasGiveaway) {
    return message.channel("`" + id + "` için bir hediye bulamıyorum.");
  }
  let time = args[1];
  if (!time)
    return message.inlineReply(
      '❌ | Lütfen geçerli bir zaman girin. Örneğin: "1s", "1m", "1d" vb.'
    );
  if (ms(time) > ms("10d")) {
    return message.inlineReply(
      "❌ | Hediye verme süresi 10 günden az olmalıdır."
    );
  }
  let winners = args[2];
  if (!winners)
    return message.inlineReply(
      '❌ | Lütfen geçerli kazanan sayısı sağlayın. Örneğin: "1k", "2k"'
    );
  num(winners, 1);
  if (winners > 15)
    return message.inlineReply("❌ | Hediye kazananlar 15'ten az olmalıdır.");
  let prize = args.slice(3).join(" ");
  if (!prize)
    return message.inlineReply(
      "❌ | Lütfen hediye için ödülü sağlayın. Örneğin: `g.çekiliş 1d 2k Discord Nitro`."
    );

  client.giveawaysManager
    .edit(hasGiveaway.messageID, {
      addTime: ms(time),
      newWinnerCount: parseInt(winners),
      newPrize: prize
    })
    .then(() => {
      if (message.deletable) message.delete();
      return;
    })
    .catch(err => {
      message.channel.send("" + id + " çekiliş bulunamadı!");
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["edit"],
  permlevel: 4
};
exports.help = {
  name: "ayarla",
  despricton: "açıklama",
  usage: "önerilog"
};

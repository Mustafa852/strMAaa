const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.inlineReply(
      "❌ | Sen çekiliş yapamazsın. `Sunucuyu Yönet` yetkisine sahip değilsin!"
    );
  let time = args[0];
  if (!time)
    return message.inlineReply(
      '❌ | Lütfen geçerli bir zaman girin. Örneğin: "1s", "1m", "1d" vb.'
    );
  if (ms(time) > ms("10d")) {
    return message.inlineReply(
      "❌ | Hediye verme süresi 10 günden az olmalıdır."
    );
  }
  let winners = args[1];
  if (!winners)
    return message.inlineReply(
      '❌ | Lütfen geçerli kazanan sayısı sağlayın. Örneğin: "1k", "2k"'
    );
  winners = num(winners, 1);
  if (winners > 15)
    return message.inlineReply("❌ | Hediye kazananlar 15'ten az olmalıdır.");
  let prize = args.slice(2).join(" ");
  if (!prize)
    return message.inlineReply(
      "❌ | Lütfen hediye için ödülü sağlayın. Örneğin: `!çekiliş 1d 2k Discord Nitro`."
    );

  client.giveawaysManager.start(message.channel, {
    time: ms(time),
    winnerCount: winners,
    prize: prize,
    hostedBy: message.author,
    messages: {
      giveaway: "🎉 **Çekiliş** 🎉",
      giveawayEnded: "🎊 **Çekiliş Sona Erdi** 🎊",
      timeRemaining: "Kalan Süre **{duration}**!",
      inviteToParticipate: 'Çekilişe katılmak için "🎉" emojisine basınız!',
      winMessage:
        "🎊 Tebrikler, {winners} çekilişi kazandınız. Ödülünüz ${prize}",
      embedFooter: "Vengaful",
      noWinner: "Geçersiz katılımlar yüzünden kimse kazanmadı!",
      hostedBy: "Çekiliş Başlatan: {user}",
      winners: "Kazanan(lar)",
      endedAt: "Bitti",
      units: {
        seconds: "saniye",
        minutes: "dakika",
        hours: "saat",
        days: "gün"
      }
    }
  });
  if (message.deletable) message.delete();
  return;
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["başlat"],
  permlevel: 4
};
exports.help = {
  name: "başlat",
  despricton: "açıklama",
  usage: "önerilog"
};

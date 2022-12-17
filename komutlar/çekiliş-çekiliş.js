const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
    const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMzczOTIzNTkyNDk0MzI1OTgiLCJib3QiOnRydWUsImlhdCI6MTY2Nzk5MDgwMH0.Sezi4wTpFeojS_StPFbNix1xo5ykBsvpf-C_IiBAQpM', client)
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.inlineReply(
      "❌ | Sen çekiliş yapamazsın. `Administrator` yetkisine sahip değilsin!"
    );
  let giveawayChannel = message.mentions.channels.first();
  if (!giveawayChannel) {
    return message.inlineReply(":x: Geçerli Bir Kanaldan Bahsetmelisin!");
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
  winners = num(winners, 1);
  if (winners > 15)
    return message.inlineReply("❌ | Hediyeyi kazananlar 15'ten az olmalıdır.");
  let prize = args.slice(3).join(" ");
  if (!prize)
    return message.inlineReply(
      "❌ | Lütfen hediye için ödülü sağlayın. Örneğin: `.çekiliş 1d 2k Discord Nitro`."
    );

  client.giveawaysManager.start(giveawayChannel, {
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
        "🎊 Tebrikler, {winners} çekilişi kazandınız. İşte ödülünüz **{prize}**!",
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
} else {
        message.channel.send(` Bu Komutu Sadece 12 Saatte Bir Oyvererek Kullanabilirsiniz Oyvermek İçin (https://top.gg/bot/1037392359249432598/vote) linke Tıklayarak Oyverebilirsiniz. Oy Verdiyseniz 5 Dakka Bekleyiniz`) 
            .then(Strom => Strom.delete({ timeout: 10000 }));  
}
        })
      
      },
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "çekiliş"
};

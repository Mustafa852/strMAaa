const Discord = require("discord.js");
const messages = [
  "Her başarısızlık, bir deneyim ve bir dersdir. Sıradaki adımın nasıl daha iyi olacağını öğrenirsin.",
  "Başarı, sürekli olarak çalışmaktan ve asla vazgeçmemekten gelir.",
  "Hayatının hedeflerine ulaşmak için, bugün küçük adımlar atmaya başla.",
  "Her zorluk, sana daha güçlü olmanı sağlar ve seni daha fazla başarıya götürür.",
  "Herkes zaman zaman zorluklarla karşılaşır ama zorlukları aşanlar, gerçek başarıya ulaşırlar.",
  "Başarı, istemekten daha çok çalışmaktan gelir. Çalışmaya devam et.",
  "Başarının anahtarı, her zaman kendine inanmak ve kendini geliştirmektir.",
  "Başarı, her zaman mümkündür, sadece sabırlı ve azimli olman gerekir.",
  "Herkes başarılı olabilir, sadece kendine inan ve sürekli çalışmaya devam et."
];

module.exports = {
  name: "motivate",
   aliases: ['motive'],
  description: "Motivasyon mesajı atar",
  execute(message, args) {
    let randomMessage = messages[Math.floor(Math.random() * messages.length)];
    message.channel.send(randomMessage);
  }
};

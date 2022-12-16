module.exports = {//Bir Hata Olursa lyrax#0001 DM Veya Destek Talebi Açın - BotClub Sevgilerlerimle <3
  name: "Atla",
  aliases: ["geç","skip"],
  description: "Skip the song or shift song to next",
  execute(client, message, args) {
    const { channel } = message.member.voice;

    if (!channel) {
  
      return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Atlayabileceğim bir şarkı yok.");
    }

    serverQueue.connection.dispatcher.end();
    message.channel.send("✅ | Şarkı geçildi.");
  }
};
//Bir Hata Olursa lyrax#0001 DM Veya Destek Talebi Açın - BotClub Sevgilerlerimle <3
module.exports = {//Bir Hata Olursa lyrax#0001 DM Veya Destek Talebi Açın - BotClub Sevgilerlerimle <3
  name: "Sıra",
  description: "get list of added songs",
  execute: (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) {
     
      return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Kuyrukta şarkı bulamadım.");
    }

    message.channel.send(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
  }
};
//Bir Hata Olursa lyrax#0001 DM Veya Destek Talebi Açın - BotClub Sevgilerlerimle <3
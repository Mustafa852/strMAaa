
const Discord = require("discord.js");
const youthanasia = require("quick.db");

exports.run = async (client, message, args) => {
  const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMzczOTIzNTkyNDk0MzI1OTgiLCJib3QiOnRydWUsImlhdCI6MTY2Nzk5MDgwMH0.Sezi4wTpFeojS_StPFbNix1xo5ykBsvpf-C_IiBAQpM', client)
dbl.hasVoted(message.author.id).then(voted => {
      if(voted) {
  const codare = message;
    const Rifleman = new Discord.MessageEmbed();

    const newerror = err => {
        codare.channel.send(Rifleman 
            .setColor('RED')
            .setDescription(err)
            .setFooter(`${codare.author.tag} tarafından kullanıldı.`, codare.author.displayAvatarURL({ dynamic: true }))
        );
    };

    if (!codare.member.hasPermission('MANAGE_GUILD')) return newerror('Bu komudu kullanabilmen için **SUNUCUYU YÖNET** yetkisine sahip olmalısın.');
    
    const option = args[0];
    if (!option) return newerror('Bir seçenek belirtmen gerekiyor:\n\`s!isimreklamkoruma <aç | kapat>\`');
    switch (option) {
        case 'aç':
            if (youthanasia.has(`isimreklamkoruma.${codare.guild.id}`)) return newerror('İsim reklam koruma sistemi zaten açık.');
            youthanasia.set(`isimreklamkoruma.${codare.guild.id}`, 'açık');
            codare.channel.send(Rifleman.setColor('GREEN').setDescription('İsim reklam koruma sistemini açtım.'));
            break;
        case 'kapat':
            if (!youthanasia.has(`isimreklamkoruma.${codare.guild.id}`)) return newerror('İsim reklam koruma sistemi zaten kapalı.');
            youthanasia.delete(`isimreklamkoruma.${codare.guild.id}`);
            codare.channel.send(Rifleman.setColor('GREEN').setDescription('İsim reklam koruma sistemini kapattım.'));
            break; 
        default:
            newerror('Bir seçenek belirtmen gerekiyor:\n\`s!isimreklamkoruma <aç | kapat>\`');
            break;
    };
} else {
        message.channel.send(` Bu Komutu Sadece 12 Saatte Bir Oyvererek Kullanabilirsiniz Oyvermek İçin (https://top.gg/bot/1037392359249432598/vote) linke Tıklayarak Oyverebilirsiniz. Oy Verdiyseniz 5 Dakka Bekleyiniz`) 
              .then(Strom => Strom.delete({ timeout: 10000 }));
}
        })
      
      },

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['isimreklamkoruma'],
  permLevel: 0
};
exports.help = {
  name: "isim-reklam-koruma"
};
 

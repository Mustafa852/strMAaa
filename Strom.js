const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})


const Strom = require('discord.js');
const client = new Strom.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util, Collection } = require('discord.js');
const Database = require("./Helpers/Database");
const Invites = new Collection(); //
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');
const fetch = require('node-fetch')
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const bot = new Strom.Client({ disableEveryone: true });
require("moment-duration-format");
require("./komut.js")(bot);
require("./yanıtlama");
const newUsers = new Strom.Collection();
bot.commands = new Strom.Collection();
bot.aliases = new Strom.Collection();
module.exports = {
  bot: bot,
  Discord: Strom
};
let prefix = ayarlar.prefix;

client.ekoayarlar = {
  parabirimi: "TL", //Para Birimi TL İsterseniz Dolar Euro Vb. Para Birimleri Girebilirsiniz.
  botunuzunprefixi: "s!",
  botunuzunidsi: "756883309270663229",
  botismi: "Strom",
  renk: "RANDOM", //İNGİLİZCE TERCİH ETTİĞİNİZ RENGİ YAZINIZ! EĞER BÖYLE BIRAKIRSANIZ RASTGELE ATAR!
  isimsiz: "Bilinmiyor", //İSİMSİZ KİŞİLERİN HANGİ İSİM İLE GÖZÜKECEĞİNİ BELİRLEYEBİLİRSİNİZ!
  rastgelepara: false, //EĞER BUNU TRUE YAPARSANIZ RASTGELE PARA VERME ÖZELLİĞİ AKTİF OLUR VE GÜNLÜK PARALARI RASTGELE VERİR!
  minpara: 101, //EĞER RASTGELE PARA DURUMUNU AKTİF ETTİYSENİZ BURADAN RASTGELE PARA PARAMETRESİNİNİN MİNUMUM PARASINI BELİRTİNİZ!
  maxpara: 150, //EĞER RASTGELE PARA DURUMUNU AKTİF ETTİYSENİZ BURADAN RASTGELE PARA PARAMETRESİNİNİN MAXİMUM PARASINI BELİRTİNİZ!
  günlükpara: 130, //EĞER RASTGELE PARAYI TRUE YAPTIYSANIZ BURAYI ELLEMENİZE GEREK YOK!
  dbloy: true, //EĞER BOTUNUZ DBL (DİSCORD BOT LİST) DE KAYITLIYSA GÜNLÜK ÖDÜL ALMAK İÇİN OY İSTER FALSE KAPALI, TRUE AKTİF DEMEK!
  dblkey: "https://top.gg/bot/756883309270663229/vote", //EĞER DBLOY U AKTİF ETMEDİYSENİZ BURAYA KEY EKLEMENİZE GEREK YOK EĞER AKTİF ETTİYSENİZ DBL SİTESİNDEN BULABİLİRSİNİZ!
  dblmsj: "Bu komutu kullanabilmek için bota oy vermelisiniz. Oy vermek için soyver", //EĞER DBLOY U AKTİF ETMEDİYSENİZ BURAYA MESAJ YAZMANIZA GEREK YOK! EĞER AKTİF ETTİYSENİZ BOTA OY VERMEK İÇİN HANGİ MESAJI YAZACAĞINI AYARLAYABİLİRSİNİZ.
  başlangıçparası: 101, //EĞER RASTGELE PARAYI TRUE YAPTIYSANIZ BURAYI ELLEMENİZE GEREK YOK!
  admin: ["846736343593779230"]//["id","",""]
}
const log = message => {
    console.log(`${message}`);
};
client.commands = new Strom.Collection();
client.aliases = new Strom.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`${props.help.name} Komutu Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

client.login(process.env.Token);

//----------komut------------//

//ototag//
client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});
//ototagson//


client.on('message', message => {
let prefix = ayarlar.prefix;
if (message.content === `<@${client.user.id}>`) {
 message.reply(`Prefix'im: **${prefix}**, Yardım için: **${prefix}yardım**
 __**https://discord.gg/FV2rwt6GRF**__ Tarafından kodlandım!`)
}
});






//kanalkoruma//
client.on("roleDelete", async role => {
  let synx2 = await db.fetch(`synx_${role.guild.id}`);
  if (synx2) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.guild.roles.create({
      data: {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        permissions: role.permissions,
        mentionable: role.mentionable,
        position: role.position
      },
      reason: "Silinen Roller Tekrar Açıldı."
    });
  }
});

//

client.on("roleCreate", async role => {
  let synx = await db.fetch(`synx_${role.guild.id}`);
  if (synx) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.delete();
  }
});

//

client.on("channelDelete", async function(channel) {
  let rol = await db.fetch(`kanalk_${channel.guild.id}`);

  if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then(z => {
      let kanal = z.guild.channels.find(c => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.find(channel => channel.id === channelp)
      );
    });
  }
});

//

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`);
  if (emojik) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) { 
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

//kanalkorumason//

//KüfürEngel Baş

const küfür = [
  "siktir",
  "fuck",
  "puşt",
  "pust",
  "piç",
  "sikerim",
  "sik",
  "yarra",
  "yarrak",
  "amcık",
  "orospu",
  "orosbu",
  "orosbucocu",
  "oç",
  ".oc",
  "ibne",
  "yavşak",
  "bitch",
  "dalyarak",
  "amk",
  "awk",
  "taşak",
  "taşşak",
  "daşşak",
  "sikm",
  "sikim",
  "sikmm",
  "skim",
  "skm",
  "sg"
];
client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
    if (i) {
      if (küfür.some(word => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Strom.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(
            ` ${nev.author} , **Mesajını editleyerek küfür etmeye çalıştı!**`
          )
          .addField("Mesajı:", nev);

        nev.delete();
        const embeds = new Strom.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(
            ` ${nev.author} , **Mesajı editleyerek küfür etmene izin veremem!**`
          );
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
  if (i) {
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
          msg.delete({ timeout: 750 });
          const embeds = new Strom.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(
              ` <@${msg.author.id}> , **Bu sunucuda küfür yasak!**`
            );
          msg.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
          const embed = new Strom.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(` ${msg.author} , **Küfür etmeye çalıştı!**`)
            .addField("Mesajı:", msg);
          client.channels.cache.get(y).send(embed);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//KüfürEngel Son

////Bot istatistiklerini atar

client.on('ready', () => {
  const moment = require("moment");
require("moment-duration-format");

 setInterval(() => {
const calismasure = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
let botdurum = client.channels.cache.find(c => c.id === '826129251690086420')//Botun sürekli mesaj atacağı kanal.
const botistatistik = new Strom.MessageEmbed()
	.setColor('RED')
	.setTitle('= Bot İstatistikleri =')
	
.addField(`RAM`,`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/512mb`)
.addField(`Çalışma Süresi`,`${calismasure}`)
.addField(`Ping`,`${client.ws.ping}`)
.addField(`discord.js`,`v${Strom.version}`)
.addField(`Bilgi`,`${client.guilds.cache.size.toLocaleString()} sunucu ve ${client.users.cache.array().length} kullanıcıya hizmet veriyor.`)
.setTimestamp()
.setFooter('Strom');
//https://cnslink.cf
botdurum.send(botistatistik);

  }, 3600000); //Milisaniye cinsinden. 1 saniye =  1000 milisaniye. Örnek Olarak 1 saat = 3600000milisaniye
  //https://convertlive.com/tr/u/dönüştürmek/milisaniye/a/saniye Bu siteden hesaplamasını yapabilirsiniz.
});




///Bot i son




///////davet sistemi

const guildInvites = new Map();

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
    .then(invites => guildInvites.set(guild.id, invites))
    .catch(err => console.log(err));
    });
});
client.on('inviteCreate', async invite => {
  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
});
client.on('guildMemberAdd', async member => {
  const cachedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    console.log("Davet Eklendi")
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
    const currentInvites = await db.get(`inv.${usedInvite.inviter.id}.total`)
    if(currentInvites) {
      db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
      db.add(`${usedInvite.inviter.id}`, 1)
    } else {
      db.set(`inv.${usedInvite.inviter.id}.total`, 1)
      db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
    }
  }
  catch(err) {
    console.log(err);
  }
});

client.on('guildMemberRemove', async member => {
  const inviter = await db.get(`inv.${member.id}.inviter`)
  const userinviter = await member.guild.members.fetch(`${inviter}`);
  const currentInvites = await db.get(`inv.${inviter}.total`)
  try {
    console.log("Davet Silindi")
    db.add(`inv.${inviter}.total`, -1)
    db.delete(`inv.${member.id}.inviter`)
  } catch(err) {
    console.log(err);
  }
});

////davet son


const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Strom.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı kullanıcı aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Strom.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı kullanıcı aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.roles.remove(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.roles.remove(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Strom.MessageEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı kullanıcı sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.cache.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.roles.add(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.roles.add(veri2);
        return;
      }
    }
  });
});

global.onUpdateInvite = (guildMember, guild, total) => {
    if(!guildMember.manageable) return;
    const rewards = new Database("./Servers/" + guild, "Rewards").get("rewards") || [];
    if(rewards.length <= 0) return;
    var taken = rewards.filter(reward => reward.Invite > total && guildMember.roles.cache.has(reward.Id));
    taken.forEach(take => {
        guildMember.roles.remove(take.Id);
    });
    var possible = rewards.filter(reward => reward.Invite <= total && !guildMember.roles.cache.has(reward.Id));
    possible.forEach(pos =>{
        guildMember.roles.add(pos.Id);
    });
}

//AFK Baş


const { DiscordAPIError } = require("discord.js");

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);

    const embed = new Strom.MessageEmbed()

      .setColor("RANDOM")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`${message.author.username} Artık \`AFK\` Değilsin.`);

    message.channel.send(embed);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);

    const afk = new Strom.MessageEmbed()

      .setColor("RANDOM")
      .setDescription(
        `**Bu Kullanıcı AFK**\n\n**Afk Olan Kullanıcı :** \`${USER.tag}\`\n**Afk Süresi :** \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\`\n**Sebep :** \`${REASON}\``
      );

    message.channel.send(afk);
  }
});

//AFK Son
//Reklam Engel Baş

const reklam = [
  ".net",
  ".xyz",
  ".tk",
  ".pw",
  ".io",
  ".me",
  ".gg",
  "www.",
  ".gl",
  ".org",
  ".com.tr",
  ".biz",
  ".rf",
  ".gd",
  ".az",
  ".party"
];
client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
    if (i) {
      if (reklam.some(word => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Strom.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(
            ` ${nev.author} , **Mesajını editleyerek reklam yapmaya çalıştı!**`
          )
          .addField("Mesajı:", nev);

        nev.delete();
        const embeds = new Strom.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(
            ` ${nev.author} , **Mesajı editleyerek reklam yapamana izin veremem!**`
          );
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
  if (i) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
          msg.delete({ timeout: 750 });
          const embeds = new Strom.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(
              ` <@${msg.author.id}> , **Bu sunucuda reklam yapmak yasak!**`
            );
          msg.channel.send(embeds).then(msg => msg.delete({ timeout: 5000 }));
          const embed = new Strom.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(` ${msg.author} , **Reklam yapmaya çalıştı!**`)
            .addField("Mesajı:", msg);
          client.channels.cache.get(y).send(embed);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//Reklam Engel Son

///son


//ANTİ RAİD

client.on("guildMemberAdd", async member => {
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "anti-raid-aç";
  if (!kanal) return;
  var synx2 = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let synx = new Strom.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **s!bot-izni kaldır <botid>**.`
        );
      synx2.send(synx);
    } else {
      let izinverilmemişbot = new Strom.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" +
            "s!bot-izni ver <botid>**"
        );
      member.kick(); // Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
      synx2.send(izinverilmemişbot);
    }
  }
});

//ANTİ RAİD SON


///sunucua özel





//---------------------------------KOMUTLAR---------------------------------\\
client.on("guildMemberAdd", async (member) => {
    let { oldu, hata, prefix, bot } = require("./ayarlar.json")
    let log = await db.fetch(`logkayıt.${member.guild.id}`)
    let destek = await db.fetch(`destekekibi.${member.guild.id}`)
    let kayıtalınacakrol = await db.fetch(`kayıtalınacakrol.${member.guild.id}`)
    let mesaj = await db.fetch(`kmesaj.${member.guild.id}`)
        let kmesajg = await db.fetch(`kmesajg.${member.guild.id}`)
                let kmesajr = await db.fetch(`kmesajr.${member.guild.id}`)

    let otoisim = await db.fetch(`otoisim.${member.guild.id}`)
    let kayıte = await db.fetch(`kayıte.${member.guild.id}`)
    let kayıtoto = await db.fetch(`otokayıt.${member.guild.id}`)
    let kayıty = await db.fetch(`kayıty.${member.guild.id}`) 
    let kmesajayarla = await db.fetch(`kmesajayarla.${member.guild.id}`)
      let kayıtkadın = await db.fetch(`kayıtkadın.${member.guild.id}`)
            let kmesaju = await db.fetch(`kmesaju.${member.guild.id}`)
            let kmesajt = await db.fetch(`kmesajt.${member.guild.id}`)

          let isimdüzen = await db.fetch(`isimdüzen.${member.guild.id}`)
     let kmesajembed = await  db.fetch(`kmesajembed.${member.guild.id}`)
let kmesajc = await db.fetch(`kmesajc.${member.guild.id}`)
    let member2 = member.user 
    let zaman = new Date().getTime() - member2.createdAt.getTime()
  var takizaman = [];
if(zaman < 604800000) {
takizaman = '**Tehlikeli**'
} else {
takizaman = `**Güvenli**`}require("moment-duration-format");
    moment.locale("tr")


  if(!kayıty) return 
    if(!kayıtalınacakrol) return 
if(!log) return
  if(!kmesajc) return
if(!kayıte) return
  if(!kayıtkadın) return
  if(kayıtoto) {
member.roles.add(kayıtoto) 
    
    
  }
  
    var takizaman2 = [];
if(zaman < 604800000) {
takizaman2 = '**Tehlikeli**'
} else {
takizaman2 = `**Güvenli**`}require("moment-duration-format");
  moment.locale("tr")
                  let kanal = client.channels.cache.get(log)

if(destek) {

    kanal.send(`<@&${kayıty}>`)
  }
  if(kmesajc) {
    
    
    if(kmesajembed) {
      
      let embed = new Strom.MessageEmbed()
      if(kmesajg) {
        embed.setImage(kmesajg)
      }
      if(kmesaju) {
        embed.setURL(kmesaju)
      }
      if(kmesajr) {
        embed.setColor(kmesajr)
      } else if(!kmesajr) {
        embed.setColor(oldu)
      }
      if(kmesajt) {
        embed.setAuthor(kmesajt)
      }
      let member2 = member.user
                let kanal = client.channels.cache.get(log)

        kanal.send(embed.setTitle(` Kayıt Sistemi`)
                   .setDescription(`${kmesajc.replace("{user:tehlike}", takizaman2)
        .replace("{user:ad}", member2.username)
                                                                                              .replace("{user:hastag}", `#${member2.discriminator}`)
//{guild:ad}
        .replace("{user:etiket}", member)
                                                    .replace("{user:durum}",  member.user.presence.activities[0] || 'Özel durumu yok')
        .replace("{user:id}", member2.id)
        .replace("{user:tag}", member2.tag)
        .replace("{user:kurulus}", moment(member.user.createdAt).format("DD MMMM YYYY, dddd (hh:mm)"))
        .replace("{guild:tehlike}", takizaman)
        .replace("{guild:bolge}", member.guild.region)
        .replace("{guild:uye}", member.guild.memberCount).replace("{guild:ad}", member.guild.name)
        .replace("{guild:yetkili}", `<@&${kayıty}>`).replace("{guild:kayıtsız}", `<@&${kayıtalınacakrol}>`)
}`).setFooter(` Kayıt Sistemi`))
      return
    } else if(!kmesajembed) {

      kanal.send(kmesajc.replace("{user:tehlike}", takizaman2)
        .replace("{user:ad}", member2.username)
                      .replace("{user:hastag}", `#${member2.discriminator}`)

        .replace("{user:etiket}", member)
                                                    .replace("{user:durum}",   member.user.presence.activities[0] || 'Özel durumu yok'

)

        .replace("{user:id}", member2.id)
        .replace("{user:tag}", member2.tag)
        .replace("{user:kurulus}", moment(member.user.createdAt).format("DD MMMM YYYY, dddd (hh:mm)"))
        .replace("{guild:tehlike}", takizaman)
                 .replace("{guild:bolge}", member.guild.region)
        .replace("{guild:uye}", member.guild.memberCount).replace("{guild:ad}", member.guild.name)
        .replace("{guild:yetkili}", `<@&${kayıty}>`).replace("{guild:kayıtsız}", `<@&${kayıtalınacakrol}>`)
)
      return
    }

    
  }


    

    
  
if(otoisim) {
  member.setNickname(otoisim)
  
}
  
  
})




client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;
const Strom = new Strom.MessageEmbed()
.setColor("BLUE")
.setTimestamp()
.setFooter(`Strom`)
.setDescription( " **" +
          member.user.username +
          "** hoş geldin! Otomatik rolün verildi. Seninle beraber **" +
          member.guild.memberCount +
          " **kişiyiz!")
  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(Strom);
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user}`)
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.cache.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
    member.roles.add(rol);
    return client.channels.cache.get(kanal).send(mesajs);
  }
});

//////






//Anti Raid
client.on("guildMemberAdd", async member => {
  let antiraidcam = await db.fetch(`antiraidcam.${member.guild.id}`)
  
  if(!antiraidcam) return
  if (!member.guild) return
if (db.has(`antiraid_${member.guild.id}`) === false)
if (member.user.bot === false) return;
if (db.has(`botizin_${member.id}`) === true) return;
let antikanal = db.fetch(`antiraid_${member.guild.id}`)


if(member.user.bot === true) {
  

member.kick(member)
    let prefix2 = await db.fetch(`prefix.${member.guild.id}`) || ayarlar.prefix

  if(antikanal) {
    var embed = new Strom.MessageEmbed()
.setDescription(`**Sunucuya Bir Bot Eklendi Anti Raid Sistemi Aktif Olduğundan Bot Atıldı. Botu Sunucuya Sokmak İçin ${prefix2}botizni botunid**`)
    .setColor(ayarlar.oldu)
  member.guild.channels.cache.get(antikanal).send(embed) 
  }
}
})






////iism reklam engel
  // İsim Reklam Koruma
  client.on('guildMemberAdd', youthanasia => {
    if (db.has(`isimreklamkoruma.${youthanasia.guild.id}`) && youthanasia.user.username.toLowerCase().replace(/ /g, '').includes('discord.gg')) {
      youthanasia.send('İsminde reklam içerikli bir şey olabileceğinden dolayı seni yasakladım.').catch(err => console.warn('Bir kişiyi reklam içerikli isimden banladım ancak o kişiye mesaj yollayamadım.'));
      youthanasia.ban({ reason: 'Reklam içerikli kullanıcı adı.' });
    };
  });

  client.on('guildMemberUpdate', (rifleman, youthanasia) => {
    if (db.has(`isimreklamkoruma.${youthanasia.guild.id}`) && youthanasia.displayName.toLowerCase().replace(/ /g, '').includes('discord.gg')) {
      youthanasia.send('İsminde reklam içerikli bir şey olabileceğinden dolayı seni yasakladım.').catch(err => console.warn('Bir kişiyi reklam içerikli isimden banladım ancak o kişiye mesaj yollayamadım.'));
      youthanasia.ban({ reason: 'Reklam içerikli kullanıcı adı.' });
    };
  });


///isim reklam engel son


///////////////////////// SAYAÇ ////////////////////
//-----------------------Sayaç-----------------------\\


client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9)
  if (!skanal31) return;
  const geldi = new Strom.MessageEmbed()
.setColor('#f6ff00')
.setThumbnail(member.user.displayAvatarURL({dynamic : true}))
.addField( `***╭−−−−−−−−−−− \`『 °Spallers Sayaç° 』\` −−−−−−−−−−−−╮ ***`,
    `
**┊** 🚪 **${member}** Sunucuya Katıldı
**┊** 🚪 **${sayac}** Kişi Olmamıza **${sayac - member.guild.memberCount}** Kişi Kaldı
**┊** 🚪 Toplam **${member.guild.memberCount}** Kişiyiz !
**╰−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−╯**
  `)
  skanal31.send(geldi)
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9)
  if (!skanal31) return;
const gitti = new Strom.MessageEmbed()
.setColor('#f6ff00')
.setThumbnail(member.user.displayAvatarURL({dynamic : true}))
.addField( `***╭−−−−−−−−−−− \`『 °Spallers Sayaç° 』\` −−−−−−−−−−−−╮ ***`,
    `
**┊** <a:cikis:780165054435426324> **${member}** Sunucudan Ayrıldı
**┊** <a:cikis:780165054435426324> **${sayac}** Kişi Olmamıza **${sayac - member.guild.memberCount}** Kişi Kaldı
**┊** <a:cikis:780165054435426324> Toplam **${member.guild.memberCount}** Kişiyiz !
**╰−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−╯**
   `)
  skanal31.send(gitti)
});

//-----------------------Sayaç Son-----------------------\\



///caps engel

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`<a:no2:823900130117812254> ${msg.author}, Bu sunucuda, büyük harf Kullanamazsın!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});


///caps engel son


//// mute


client.on('roleDelete', async role => {
const data = await require('quick.db').fetch(`strom-mute-role.${role.guild.id}`);
if(data && data === role.id) require('quick.db').delete(`strom-mute-role.${role.guild.id}`); 
});


///mute son


/// modlog sistemi

client.on("messageDelete", async (message) => {

  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

  if (!log) return;

  const embed = new Strom.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "")

  log.send(embed)

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Strom.MessageEmbed()

  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

  .addField("**Eylem:**", "Mesaj Düzenleme")

  .addField("**Mesajın sahibi:**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)

  .addField("**Eski Mesajı:**", `${oldMessage.content}`)

  .addField("**Yeni Mesajı:**", `${newMessage.content}`)

  .setTimestamp()

  .setColor(0x36393F)

  .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())

  .setThumbnail(oldMessage.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

});

client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Strom.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal:**", `${kanal}`)

    .setTimestamp()

    .setColor(0x36393F)

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Strom.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal:**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor(0x36393F)

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Strom.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi:**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol:**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Strom.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Rol Silme")

.addField("**Rolü silen kişi:**", `<@${entry.executor.id}>`)

.addField("**Silinen rol:**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Strom.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi:**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Strom.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Silme")

.addField("**Emojiyi silen kişi:**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji:**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Strom.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi:**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji:**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji:**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Strom.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili:**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı:**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi:**", `${entry.reason}`)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Strom.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili:**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı:**", `**${user.tag}** - ${user.id}`)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})
// mod log son ///


//panel son//OtoRol Baş

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;

  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(
        ":loudspeaker: :inbox_tray: Otomatik Rol Verildi Seninle Beraber `" +
          member.guild.memberCount +
          "` Kişiyiz! Hoşgeldin! `" +
          member.user.username +
          "`"
      );
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user}`)
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.cache.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`);
    member.roles.add(rol);
    return client.channels.cache.get(kanal).send(mesajs);
  }
});

//OtORol Son


//// çekiliş
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }//#FF0000
});
//// çekiliş son//Güvenlik Baş

client.on("guildMemberAdd", member => {
  let kanal = db.fetch(`güvenlik.${member.guild.id}`);
  if (!kanal) return;

  let aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };

  let bitiş = member.user.createdAt;
  let günü = moment(new Date(bitiş).toISOString()).format("DD");
  let ayı = moment(new Date(bitiş).toISOString())
    .format("MM")
    .replace("01", "Ocak")
    .replace("02", "Şubat")
    .replace("03", "Mart")
    .replace("04", "Nisan")
    .replace("05", "Mayıs")
    .replace("06", "Haziran")
    .replace("07", "Temmuz")
    .replace("08", "Ağustos")
    .replace("09", "Eylül")
    .replace("10", "Ekim")
    .replace("11", "Kasım")
    .replace("12", "Aralık")
    .replace("13", "CodAre");
  let yılı = moment(new Date(bitiş).toISOString()).format("YYYY");
  let saati = moment(new Date(bitiş).toISOString()).format("HH:mm");

  let günay = `${günü} ${ayı} ${yılı} ${saati}`;

  let süre = member.user.createdAt;
  let gün = moment(new Date(süre).toISOString()).format("DD");
  let hafta = moment(new Date(süre).toISOString()).format("WW");
  let ay = moment(new Date(süre).toISOString()).format("MM");
  let ayy = moment(new Date(süre).toISOString()).format("MM");
  let yıl = moment(new Date(süre).toISOString()).format("YYYY");
  let yıl2 = moment(new Date().toISOString()).format("YYYY");

  let netyıl = yıl2 - yıl;

  let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`;

  let kontrol;
  if (süre < 1296000000)
    kontrol = "`Bu hesap şüpheli!` 🚨";
  if (süre > 1296000000)
    kontrol = "`Bu hesap güvenli!` ✔️";

  let codare = new Strom.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${member.user.username} Katıldı`)
    .setDescription(
      "<@" +
        member.id +
        "> Bilgileri ➡️ \n\n  __Hesap Oluşturulma Tarihi__  ➡️ \n\n**[" +
        created +
        "]** (`" +
        günay +
        "`) \n\n __Hesap durumu__  ➡️ \n\n**" +
        kontrol +
        "**"
    );
  client.channels.cache.get(kanal).send(codare);
});

//Güvenlik Son


// spam engel

const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await db.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
  const AsreaperHerDaim = new Strom.MessageEmbed()
  .setColor(0x36393F)
  .setDescription(` <@${message.author.id}> , **Bu sunucuda spam yapmak yasak!**`)
  //.setFooter(`Bu mesaj otomatik olarak silinecektir.`)
 if (message.member.hasPermission("BAN_MEMBERS")) return ;
 message.channel.send(AsreaperHerDaim).then(msg => msg.delete({timeout: 2000}));
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500) // default : 500
}


});


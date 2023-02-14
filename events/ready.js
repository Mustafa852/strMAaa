 const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports = async client => {
  var oyun = ["🔥s!yardım🔥","🔥Strom, sunucunuz için🔥","🔥s!oyver🔥","🔥En gelişmiş komutlar🔥","🔥s!guard🔥","⚠️Herhangi bir hatada s!hata⚠️"];

  setInterval(async () => {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], { type: "WATCHING" });
  }, 10000);
  client.user.setStatus("online");

}
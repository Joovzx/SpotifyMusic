const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Change volume of currently playing music",
    async execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    const noQ = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
     // .setTitle("Empty Queue")
      .setDescription(`<:Zayn_salah:841625444594876417>・There is nothing in the queue`);

    if (!queue) return message.reply(noQ).catch(console.error);
    if (!canModifyQueue(message.member)) {
      const neededVC = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
       // .setTitle("Error!")
        .setDescription(`<:Zayn_salah:841625444594876417>・You need to join a voice channel first`);

      return message.reply(neededVC).catch(console.error);
    }
    const currentVolume = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      //.setTitle("Volume")
      .setDescription(`<a:Zayn_loading:841236694376120341>・The current volume is: **${queue.volume}**`);

    if (!args[0]) return message.reply(currentVolume).catch(console.error);

    const setVolume = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
     // .setTitle("Input Invalid")
      .setDescription(`<:Zayn_salah:841625444594876417>・Please use a number to set the volume`);

    if (isNaN(args[0])) return message.reply(setVolume).catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message
        .reply("<:Zayn_salah:841625444594876417>・Please use a number between 0 - 100.")
        .catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    const vol = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
     // .setTitle("Set!")
      .setDescription(`<a:Zayn_centang:841289776379461702>・Volume set to: **${args[0]}%**`);

    return queue.textChannel.send(vol).catch(console.error);
  },
};

const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  execute(message) { 
    const queue = message.client.queue.get(message.guild.id);
    const emptyQueue = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTimestamp()
    //  .setTitle("Empty Queue")
      .setDescription(":x:・There is nothing playing");

    if (!queue) return message.reply(emptyQueue).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      const paused = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
       // .setTimestamp()
       // .setTitle("Paused")
        .setDescription(`<a:Zayn_centang:841289776379461702>・${message.author} paused the music.`);

      return queue.textChannel.send(paused).catch(console.error);
    }
  },
};

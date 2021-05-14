const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Toggle music loop",
  execute(message) {


    const queue = message.client.queue.get(message.guild.id);

    const emptyQueue = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
    //  .setTitle("Empty Queue")
      .setDescription(":x:・There is nothing playing");

    if (!queue) return message.reply(emptyQueue);
    if (!canModifyQueue(message.member)) return;

    queue.loop = !queue.loop;
    const loop = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
    //  .setTitle("Loop")
      .setDescription(
        `<a:Zayn_centang:841289776379461702>・Loop is now set to ${queue.loop ? "**on**" : "**off**"}`
      );
    return queue.textChannel.send(loop);
  },
};

const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "stop",
    aliases: ["clear"],
    description: "Stops the music",
    async execute(message, args) {
        const queue = message.client.queue.get(message.guild.id);

        const embedA = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
          // .setTitle("Empty Queue")
            .setDescription("<:Zayn_salah:841625444594876417>・There is nothing in the queue");

        if (!queue) return message.reply(embedA).catch(console.error);
        if (!canModifyQueue(message.member)) return;

        queue.songs = [];
        queue.connection.dispatcher.end();

        const embedB = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
           // .setTitle("Stopped!")
            .setDescription(`<a:Zayn_centang:841289776379461702>・${message.author} **stoped the music**`);

        queue.textChannel.send(embedB).catch(console.error);
    },
};

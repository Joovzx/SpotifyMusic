const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "remove",
    description: "Remove song from the queue",
    execute(message, args) {

        const queue = message.client.queue.get(message.guild.id);
        const emptyQueue = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            //.setTitle("Empty Queue")
            .setDescription("<:Zayn_salah:841625444594876417>・**There is nothing in the queue**");

        if (!queue)
            return message.channel.send(emptyQueue).catch(console.error);
        if (!canModifyQueue(message.member)) return;

        const noArgs = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
           // .setTitle("Usage")
            .setDescription(`<:Zayn_salah:841625444594876417>・Usage : **${message.client.prefix}remove <Queue Number>**`);

        const NaNer = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            //.setTitle("Usage")
            .setDescription(`<:Zayn_salah:841625444594876417>・Usage : **${message.client.prefix}remove <Queue Number>**`);

        if (!args.length) return message.reply(noArgs);
        if (isNaN(args[0])) return message.reply(NaNer);

        const song = queue.songs.splice(args[0] - 1, 1);

        const remov = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
           // .setTitle("Song Removed from Queue")
            .setDescription(
                `<a:Zayn_centang:841289776379461702>・${message.author} removed **${song[0].title}** from the queue.`
            );

        queue.textChannel.send(remov);
    },
};

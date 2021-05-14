const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "resume",
    aliases: ["r"],
    description: "Resume currently playing music",
    async execute(message, args) {
        
        const queue = message.client.queue.get(message.guild.id);
        const nothingPlaying = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
          //  .setTitle("Error!")
            .setDescription(`<:Zayn_salah:841625444594876417>・**There is nothing playing**`);

        if (!queue) return message.reply(nothingPlaying).catch(console.error);
        if (!canModifyQueue(message.member)) return;

        if (!queue.playing) {
            queue.playing = true;
            queue.connection.dispatcher.resume();
            const resumed = new MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
              //  .setTitle("Resumed")
                .setDescription(`<a:Zayn_centang:841289776379461702>・**${message.author} ▶ resumed the music**`);

            return queue.textChannel.send(resumed).catch(console.error);
        }

        return message.reply("The queue is not paused.").catch(console.error);
        const notPaused = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
          //  .setTitle("Error!")
            .setDescription(`<:Zayn_salah:841625444594876417>・**The song/queue is not paused**`);

        return message.reply(notPaused).catch(console.error);
    },
};

const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "skip",
    aliases: ["s"],
    description: "Skip the currently playing song",
    async execute(message, args) {
      
        const queue = message.client.queue.get(message.guild.id);
        if (!queue)
            return message
                .reply("<:Zayn_salah:841625444594876417>・There is nothing playing that I could skip for you.")
                .catch(console.error);
        if (!canModifyQueue(message.member)) return;
        const skipEmbed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
           // .setTitle("Skipped")
            .setDescription(`<a:Zayn_centang:841289776379461702>・${message.author} already **skipped** the song.`);

        queue.playing = true;
        queue.connection.dispatcher.end();
        queue.textChannel.send(skipEmbed).catch(console.error);
    },
};

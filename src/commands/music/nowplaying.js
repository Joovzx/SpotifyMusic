const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    description: "Show now playing song",
    execute(message) {

        const queue = message.client.queue.get(message.guild.id);
        const emptyQueue = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
          //  .setTitle("Empty Queue")
            .setDescription(":x:・There is nothing playing");

        if (!queue) return message.reply(emptyQueue).catch(console.error);
        const song = queue.songs[0];
        const seek =
            (queue.connection.dispatcher.streamTime -
                queue.connection.dispatcher.pausedTime) /
            1000;
        const left = song.duration - seek;
        
        try {
        let nowPlaying = new MessageEmbed()
            .setDescription(`<a:Zayn_centang:841289776379461702>・Now Playing : **[${song.title}](${song.url})**`)
            .addField("\u200b", `・Volume : **${queue.volume}%**\n・Loop : ${queue.loop ? "**On**" : "**Off**"}\n・Time Remaining : **${new Date(left * 1000).toISOString().substr(11, 8)}**`)
            .setColor(message.guild.me.displayHexColor)
            .setThumbnail(`${song.thumbnail}`)

        return message.channel.send(nowPlaying)
        } catch(err) {
          message.channel.send(new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`<a:Zayn_centang:841289776379461702>・Now Playing : **[${song.title}](${song.url})**`)
          .setThumbnail(`${song.thumbnail}`))
        }
    },
};

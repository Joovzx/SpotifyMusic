const Discord = require("discord.js");
const ytdlDiscord = require("erit-ytdl");
const scdl = require("soundcloud-downloader").default;
const { canModifyQueue } = require("../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");
const { STAY_TIME } = require("../../config.json");

module.exports = {
  async play(song, message) {
    let config;

    try {
      config = require("../config.json");
    } catch (error) {
      config = null;
    }

    const PRUNING = config ? config.PRUNING : process.env.PRUNING;
    const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;

    const queue = message.client.queue.get(message.guild.id);
    const muiscQueueEnded = new Discord.MessageEmbed()
      .setDescription("<a:warn:840519859339395133> ・Music queue ended.")
      .setColor(message.guild.me.displayHexColor);

    const botLeaveChannel = new Discord.MessageEmbed().setDescription(
      "Disconnected due to inactivity."
    );

    if (!song) {
      setTimeout(() => {
        if (queue.connection.dispatcher && message.guild.me.voice.channel)
          return;
        queue.channel.leave();
      }, STAY_TIME * 1000);
      queue.textChannel.send(muiscQueueEnded).catch(console.error);
      return message.client.queue.delete(message.guild.id);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

    try {
      if (song.url.includes("youtube.com")) {
        stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
      } else if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.OPUS,
            SOUNDCLOUD_CLIENT_ID
          );
        } catch (error) {
          stream = await scdl.downloadFormat(
            song.url,
            scdl.FORMATS.MP3,
            SOUNDCLOUD_CLIENT_ID
          );
          streamType = "unknown";
        }
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      return message.channel.send(
        new MessageEmbed()
          .setDescription(`Error: ${error.message ? error.message : error}`)
          .setColor("#da7272")
      );
    }

    queue.connection.on("disconnect", () =>
      message.client.queue.delete(message.guild.id)
    );

    const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);
    const seek =(queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;
    const track = queue.songs[0];
    const playingEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setAuthor("Now Playing", "https://cdn.discordapp.com/emojis/840303834664009728.gif")
      .setDescription(
        `**[${song.title}](${song.url})**`
      )
      .addField("Request", `Requested by <@${message.author.id}>`)
      .addField("System Detail", `・Volume : **${queue.volume}%**\n・Song : **${song.title}**\n・Loop : ${queue.loop ? "**On**" : "**Off**"}\n・Time Remaining : **${new Date(left * 1000).toISOString().substr(11, 8)}**`)
      .setThumbnail(
        song.thumbnail ||
          "https://cdn.iconscout.com/icon/free/png-256/youtube-85-226402.png"
      );
     let waitmsg = await queue.textChannel.send(`<a:Zayn_loading:841236694376120341>・Searching **${song.title}**`).then(msg => msg.delete({ timeout:3000 }))

    try {

      queue.textChannel.send(playingEmbed)





    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000,
    });
  }
};




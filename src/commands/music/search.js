const { MessageEmbed } = require("discord.js");
const YouTubeAPI = require("simple-youtube-api");

let YOUTUBE_API_KEY;
try {
    const config = require("../config.json");
    YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
} catch (error) {
    YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
}
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
    name: "search",
    description: "Search and select videos to play",
    async execute(message, args) {


        const incUsage = new MessageEmbed()
            //.setTitle(`Search songs`)
            .setDescription(
                `<a:Zayn_centang:841289776379461702>・Usage: ${message.client.prefix}${module.exports.name} <Video Name>`
            )
            .setColor(message.guild.me.displayHexColor);
        const errMsgCollector = new MessageEmbed()
           // .setTitle(`Search`)
            .setDescription(
                "<:Zayn_salah:841625444594876417>・A message collector is already active in this channel."
            )
            .setColor(message.guild.me.displayHexColor);

        if (!args.length) return message.reply(incUsage).catch(console.error);
        if (message.channel.activeCollector)
            return message.reply(errMsgCollector).catch(console.error);
        if (!message.member.voice.channel)
            return message
                .reply("<:Zayn_salah:841625444594876417>・You need to join a voice channel first!")
                .catch(console.error);

        const search = args.join(" ");

        let resultsEmbed = new MessageEmbed()
            .setTitle(`**Reply with the song number you want to play**`)
            .setDescription(`<a:Zayn_centang:841289776379461702>・Results for : ${search}`)
            .setColor(message.guild.me.displayHexColor);

        const results = await youtube.searchVideos(search, 10);

        const noResults = new MessageEmbed()
            .setDescription("<:Zayn_salah:841625444594876417>・**No results found for that search!**")
            .setColor(message.guild.me.displayHexColor);

        if (!results.length)
            return message.channel.send(noResults).catch(console.error);
        results.forEach((video, index) =>
            resultsEmbed.addField(
                video.shortURL,
                `${index + 1}. ${video.title}`
            )
        );

        const resultsMessage = await message.channel.send(resultsEmbed);
        const emojis = [
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣",
            "6️⃣",
            "7️⃣",
            "8️⃣",
            "9️⃣",
            "🔟",
        ];
        emojis.forEach(
            async (e) => await resultsMessage.react(e).catch(() => {})
        );
        const filter = (reaction, user) =>
            user.id === message.author.id &&
            emojis.includes(reaction.emoji.name);

        message.channel.activeCollector = true;
        const response = await resultsMessage.awaitReactions(filter, {
            max: 1,
            time: 60000,
        });

        if (!response.first()) {
            message.channel.activeCollector = false;
            return message.channel.send(
                "<:Zayn_salah:841625444594876417>・Time limit exceeded, the search has been cancelled."
            );
        }
        const choice =
            results[parseInt(emojis.indexOf(response.first().emoji.name))].url;

        message.channel.activeCollector = false;
        message.client.commands.get("play").execute(message, [choice]);
        resultsMessage.delete().catch(() => {});
    },
};

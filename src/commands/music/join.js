 module.exports = {
  name: "join",
  aliases: ["jo","connect"],
  description: "Toggle music loop",
  async execute(message) {
    
    const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('<:Zayn_salah:841625444594876417>・Please enter a voice channel first.');
        
        if (!voiceChannel.permissionsFor(message.client.user).has(['CONNECT', 'SPEAK', 'VIEW_CHANNEL'])) {
            return message.reply('<:Zayn_salah:841625444594876417>・I\'m missing the `Connect`, `Speak`, or `View Channel` permission for this channel.');
        }
        if (!voiceChannel.joinable) return message.reply('<:Zayn_salah:841625444594876417>・Your voice channel is not joinable.');
        if (message.client.voice.connections.has(voiceChannel.guild.id)) {
            return message.reply('<a:Zayn_loading:841236694376120341>・I am already in a voice channel.');
        }
        await voiceChannel.join();
        return message.reply(`<a:Zayn_centang:841289776379461702>・Now I'm Joined **${voiceChannel.name}**`);
  }
 }

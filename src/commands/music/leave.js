module.exports = {
  name: "leave",
  aliases: ["end","dc","disconnect","leavevc"],
  description: "Toggle music loop",
  async execute(message) {
    
    
        if(!message.member.voice.channel) {
            return message.channel.send('<:Zayn_salah:841625444594876417>・Please, join in voice channel');
        }
        const connection = message.client.voice.connections.get(message.guild.id);
        if (!connection) return message.channel.send('<:Zayn_salah:841625444594876417>・I am not in a voice channel.');

            message.react('841289776379461702');
            connection.channel.leave();
            return message.reply(`<a:Zayn_loading:841236694376120341>・Thanks to using me! Already Left **${connection.channel.name}**.`);
        }    
  }

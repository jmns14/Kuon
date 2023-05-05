const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    DESCRIPTION: "Despídete de todos o de alguien en específico",
    async execute(client, message, args, prefix) {
        const channel = client.channels.cache.get(message.channel.id);
        const target = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

        let search_term = 'Anime bye';
        const url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${process.env.TENOR_APIKEY}&client_key=${client.user.username}&limit=30`;

        const gifs = [];
        await axios.get(`${url}`).then(response => {
            response.data.results.forEach(result => gifs.push(result.media_formats.gif.url));
        });
        
        if (target) {
            return channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${message.author.username}** se despide de **${target.user.username}**.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        } else {
            return channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${message.author.username}** se despide.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        }
    }

}
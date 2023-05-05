const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    DESCRIPTION: "Te pones triste",
    async execute(client, message, args, prefix) {
        const channel = client.channels.cache.get(message.channel.id);

        let search_term = 'Anime sad';
        const url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${process.env.TENOR_APIKEY}&client_key=Kuon&limit=30`;

        const gifs = [];
        await axios.get(`${url}`).then(response => {
            response.data.results.forEach(result => gifs.push(result.media_formats.gif.url));
        });

        return channel.send({
            embeds: [
                new EmbedBuilder()
                    .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                    .setDescription(`** ${message.author.username}** se puso triste. :(`)
                    .setColor(process.env.EMBED_COLOR)
            ],
        });
    }

}
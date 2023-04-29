const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    DESCRIPTION: "Cocina algo para ti o para alguien",
    async execute(client, message, args, prefix) {
        let search_term = 'Anime Cooking';
        const url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${process.env.TENOR_APIKEY}&client_key=Kuon&limit=30`;
        const gifs = [];
        await axios.get(`${url}`).then(response => {
            response.data.results.forEach(result => gifs.push(result.media_formats.gif.url))
        });

        const target = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

        if (target) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${message.author.username}** está cocinando algo delicioso para **${target.user.username}**.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        } else {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${message.author.username}** está cocinando algo rico.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        }
    }

}
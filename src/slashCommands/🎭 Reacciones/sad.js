const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('🎭 → Te pones triste'),
    async execute(client, interaction, prefix) {
        let search_term = 'Anime sad';
        const url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${process.env.TENOR_APIKEY}&client_key=${client.user.username}&limit=30`;
        const gifs = [];
        await axios.get(`${url}`).then(response => {
            response.data.results.forEach(result => gifs.push(result.media_formats.gif.url));
        });
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                    .setDescription(`** ${interaction.user.username}** se puso triste. :(`)
                    .setColor(process.env.EMBED_COLOR)
            ],
        });
    }
}
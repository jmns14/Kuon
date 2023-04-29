const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('🎭 → Cocina algo para ti o para alguien')
        .addUserOption(option =>
            option.setName('miembro')
                .setDescription('Miembro para quién cocinar')
        ),
    async execute(client, interaction, prefix) {
        let search_term = 'Anime Cooking';
        const url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${process.env.TENOR_APIKEY}&client_key=${client.user.username}&limit=30`;
        const gifs = [];
        await axios.get(`${url}`).then(response => {
            response.data.results.forEach(result => gifs.push(result.media_formats.gif.url))
        });

        const target = interaction.options.getUser('miembro');

        if (target) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${interaction.user.username}** está cocinando algo delicioso para **${target.username}**.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        } else {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${interaction.user.username}** está cocinando algo rico.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        }
    }
}
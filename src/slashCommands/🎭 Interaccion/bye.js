const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    CMDNAME: 'interact',
    SUBCMD: new SlashCommandBuilder()
        .setDescription('🎭 → Interaccion')
        .addSubcommand(subcommand =>
            subcommand.setName('bye')
                .setDescription('🎭 → Despídete de todos o de alguien en específico')
                .addUserOption(option =>
                    option.setName('miembro')
                        .setDescription('Miembro de quien despedirse')
                ),
        ),

    async execute(client, interaction, prefix) {
        const target = interaction.options.getUser('miembro');

        let search_term = 'Anime bye';
        const url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${process.env.TENOR_APIKEY}&client_key=${client.user.username}&limit=30`;

        const gifs = [];
        await axios.get(`${url}`).then(response => {
            response.data.results.forEach(result => gifs.push(result.media_formats.gif.url));
        });

        if (target) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${interaction.user.username}** se despide de **${target.username}**.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        } else {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setImage(`${gifs[Math.floor(Math.random() * gifs.length)]}`)
                        .setDescription(`** ${interaction.user.username}** se despide.`)
                        .setColor(process.env.EMBED_COLOR)
                ],
            });
        }
    }
}
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('🏠 → Muestra una lista de los roles del servidor'),
    async execute(client, interaction, prefix) {
        let countRoles = 1;
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Roles de ${interaction.guild.name}`)
                    .setDescription(`${interaction.guild.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(r => `\`${countRoles++}\` ${r.toString()}`).slice(0, -1).join('\n')}`)
                    .setColor(`${process.env.EMBED_COLOR}`)
            ]
        });
    }
}
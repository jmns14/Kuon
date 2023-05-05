const { EmbedBuilder } = require('discord.js');

module.exports = {
    DESCRIPTION: "Muestra una lista de los roles del servidor",
    PERMISSIONS: ["ManageRoles"],
    async execute(client, message, args, prefix) {
        let countRoles = 1;
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Roles de ${message.guild.name}`)
                    .setDescription(`${message.guild.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(r => `\`${countRoles++}\` ${r.toString()}`).slice(0, -1).join('\n')}`)
                    .setColor(`${process.env.EMBED_COLOR}`)
            ]
        });
    }
}
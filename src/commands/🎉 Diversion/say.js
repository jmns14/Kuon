const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    DESCRIPTION: "Envía un mensaje a través de mi",
    async execute(client, message, args, prefix) {
        const channel = client.channels.cache.get(message.channel.id);
        const mensaje = args[0];

        const autor = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('autor')
                    .setLabel(`Enviado por ${message.author.username}#${message.author.discriminator}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

        if (mensaje) {
            message.delete();
            channel.send({
                content: `${mensaje}`,
                components: [autor]
            });
        } else {
            message.reply(`¿Qué quieres que repita?`);
        }
    }
}
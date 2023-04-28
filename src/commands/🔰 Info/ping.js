const { EmbedBuilder } = require('discord.js');

module.exports = {
    DESCRIPTION: "Muestra el ping del bot",
    async execute(client, message, args, prefix) {
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setDescription(`🏓 Pong!\n📨 Mensaje: \`${Math.abs(Date.now() - message.createdTimestamp)}ms\`\n🧪 API: \`${client.ws.ping}ms\``)
                    .setTimestamp(Date.now())
                    .setFooter({
                        text: `v${process.env.VERSION}`
                    })
                    .setColor(process.env.EMBED_COLOR)
            ],
        });
    }
}
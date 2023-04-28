const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('🔰 → Muestra el ping del bot'),
    async execute(client, interaction, prefix) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setDescription(`🏓 Pong!\n📨 Mensaje: \`${Math.abs(Date.now() - interaction.createdTimestamp)}ms\`\n🧪 API: \`${client.ws.ping}ms\``)
                    .setTimestamp(Date.now())
                    .setFooter({
                        text: `v${process.env.VERSION}`
                    })
                    .setColor(process.env.EMBED_COLOR)
            ],
        });
    }
}
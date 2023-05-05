const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('🎉 → Envía un mensaje a través de mi')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Mensaje que quieres enviar')
                .setRequired(true)
        ),
    async execute(client, interaction, prefix) {
        const channel = client.channels.cache.get(interaction.channel.id);
        const mensaje = interaction.options.getString('mensaje');

        const autor = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('autor')
                    .setLabel(`Enviado por ${interaction.user.username}#${interaction.user.discriminator}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

        if (mensaje) {
            channel.send({
                content: `${mensaje}`,
                components: [autor]
            }).then(() => {
                interaction.reply({
                    content: `Mensaje enviado ✅`,
                    ephemeral: true,
                });
            });

        }
    }
}
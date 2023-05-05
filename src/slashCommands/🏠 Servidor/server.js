const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('🏠 → Muestra la información del servidor'),
    async execute(client, interaction, prefix) {
        // Count channels
        const textChannelCount = (await interaction.guild.channels.fetch()).filter(channel => channel.type === 0 || channel.type === 5 || channel.type === 15).size;
        const voiceChannelCount = (await interaction.guild.channels.fetch()).filter(channel => channel.type === 2 || channel.type === 13).size;
        const activeThreadChannelCount = (await interaction.channel.threads.fetchActive()).threads.filter(thread => thread.type === 10 || thread.type === 11 || thread.type === 12).size;
        const archivedthreadChannelCount = (await interaction.channel.threads.fetchArchived()).threads.filter(thread => thread.type === 10 || thread.type === 11 || thread.type === 12).size;

        // Server verification
        function serverVerification() {
            switch (interaction.guild.verificationLevel) {
                case 0:
                    return 'Ninguna';
                case 1:
                    return 'Baja';
                case 2:
                    return 'Media';
                case 3:
                    return 'Alta';
                case 4:
                    return 'Extrema';
            }
        }

        const serverButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('serverIcon')
                    .setLabel('Icono')
                    .setEmoji('🖼')
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('serverBanner')
                    .setLabel('Banner')
                    .setEmoji('🖼')
                    .setStyle(ButtonStyle.Primary)
            );

        const serverInfo = await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: `${interaction.guild.name}`,
                        iconURL: `${interaction.guild.iconURL()}`
                    })
                    .addFields([
                        { name: `🆔 ID Servidor`, value: `${interaction.guild.id}`, inline: true },
                        { name: `👑 Dueño`, value: `<@${interaction.guild.ownerId}>`, inline: true },
                        { name: `📆 Fecha de creación`, value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}:d>`, inline: true },
                        { name: `💭 Canales (${interaction.guild.channels.cache.size})`, value: `**${textChannelCount}** texto | **${voiceChannelCount}** voz | **${activeThreadChannelCount + archivedthreadChannelCount}** hilo `, inline: true },
                        { name: `👥 Miembros`, value: `${interaction.guild.memberCount}`, inline: true },
                        { name: `✨ Mejoras`, value: `${interaction.guild.premiumSubscriptionCount}`, inline: true },
                        { name: `🏝 Emojis`, value: `${interaction.guild.emojis.cache.size}`, inline: true },
                        { name: `🌠 Roles`, value: `${interaction.guild.roles.cache.size}`, inline: true },
                        { name: `📖 Verificación`, value: `${serverVerification()}`, inline: true },
                    ])
                    .setThumbnail(interaction.guild.iconURL())
                    .setColor(process.env.EMBED_COLOR)
            ],
            components: [serverButtons],
            fetchReply: true
        });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                if (i.customId === 'serverIcon') {
                    await i.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`Icono de ${interaction.guild.name}`)
                                .setImage(interaction.guild.iconURL({ size: 1024, dynamic: true }))
                                .setColor(process.env.EMBED_COLOR)
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setLabel('Ver en navegador')
                                        .setURL(interaction.guild.iconURL({ size: 1024, dynamic: true }))
                                        .setStyle(ButtonStyle.Link)
                                )
                        ],
                        ephemeral: true
                    });
                } else if (i.customId === 'serverBanner') {
                    if (interaction.guild.banner) {
                        await i.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`Banner de ${interaction.guild.name}`)
                                    .setImage(interaction.guild.bannerURL({ size: 1024, dynamic: true }))
                                    .setColor(process.env.EMBED_COLOR)
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setLabel('Ver en navegador')
                                            .setURL(interaction.guild.bannerURL({ size: 1024, dynamic: true }))
                                            .setStyle(ButtonStyle.Link)
                                    )
                            ],
                            ephemeral: true
                        });
                    } else {
                        await i.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`${interaction.guild.name} no tiene banner`)
                                    .setColor(process.env.EMBED_COLOR)
                            ],
                            ephemeral: true
                        });
                    }

                }
            } else {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Esta interacción no te pertenece`)
                            .setColor(process.env.EMBED_COLOR)
                    ],
                    ephemeral: true
                })
            }
        });
    }
}
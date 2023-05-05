const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    DESCRIPTION: "Muestra la información del servidor",
    async execute(client, message, args, prefix) {
        // Count channels
        const textChannelCount = (await message.guild.channels.fetch()).filter(channel => channel.type === 0 || channel.type === 5 || channel.type === 15).size;
        const voiceChannelCount = (await message.guild.channels.fetch()).filter(channel => channel.type === 2 || channel.type === 13).size;
        const activeThreadChannelCount = (await message.channel.threads.fetchActive()).threads.filter(thread => thread.type === 10 || thread.type === 11 || thread.type === 12).size;
        const archivedthreadChannelCount = (await message.channel.threads.fetchArchived()).threads.filter(thread => thread.type === 10 || thread.type === 11 || thread.type === 12).size;

        // Server verification
        function serverVerification() {
            switch (message.guild.verificationLevel) {
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

        const serverInfo = await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: `${message.guild.name}`,
                        iconURL: `${message.guild.iconURL()}`
                    })
                    .addFields([
                        { name: `🆔 ID Servidor`, value: `${message.guild.id}`, inline: true },
                        { name: `👑 Dueño`, value: `<@${message.guild.ownerId}>`, inline: true },
                        { name: `📆 Fecha de creación`, value: `<t:${Math.round(message.guild.createdTimestamp / 1000)}:d>`, inline: true },
                        { name: `💭 Canales (${message.guild.channels.cache.size})`, value: `**${textChannelCount}** texto | **${voiceChannelCount}** voz | **${activeThreadChannelCount + archivedthreadChannelCount}** hilo `, inline: true },
                        { name: `👥 Miembros`, value: `${message.guild.memberCount}`, inline: true },
                        { name: `✨ Mejoras`, value: `${message.guild.premiumSubscriptionCount}`, inline: true },
                        { name: `🏝 Emojis`, value: `${message.guild.emojis.cache.size}`, inline: true },
                        { name: `🌠 Roles`, value: `${message.guild.roles.cache.size}`, inline: true },
                        { name: `📖 Verificación`, value: `${serverVerification()}`, inline: true },
                    ])
                    .setThumbnail(message.guild.iconURL())
                    .setColor(process.env.EMBED_COLOR)
            ],
            components: [serverButtons]
        });

        const collector = serverInfo.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            if (i.user.id === message.author.id) {
                if (i.customId === 'serverIcon') {
                    await i.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`Icono de ${message.guild.name}`)
                                .setImage(message.guild.iconURL({ size: 1024, dynamic: true }))
                                .setColor(process.env.EMBED_COLOR)
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setLabel('Ver en navegador')
                                        .setURL(message.guild.iconURL({ size: 1024, dynamic: true }))
                                        .setStyle(ButtonStyle.Link)
                                )
                        ],
                        ephemeral: true
                    });
                } else if (i.customId === 'serverBanner') {
                    if (message.guild.banner) {
                        await i.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`Banner de ${message.guild.name}`)
                                    .setImage(message.guild.bannerURL({ size: 1024, dynamic: true }))
                                    .setColor(process.env.EMBED_COLOR)
                            ],
                            components: [
                                new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setLabel('Ver en navegador')
                                            .setURL(message.guild.bannerURL({ size: 1024, dynamic: true }))
                                            .setStyle(ButtonStyle.Link)
                                    )
                            ],
                            ephemeral: true
                        });
                    } else {
                        await i.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`${message.guild.name} no tiene banner`)
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
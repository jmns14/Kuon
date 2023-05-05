const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    DESCRIPTION: "Muestra los emotes del servidor",
    async execute(client, message, args, prefix) {
        const emotes = message.guild.emojis.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(r => r.toString()).join(" ").split(" ");

        if (!emotes) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: `Emotes de ${message.guild.name}`,
                        iconURL: message.guild.iconURL()
                    })
                    .setDescription(`Actualmente este servidor no tiene emotes`)
                    .setColor(process.env.EMBED_COLOR)
            ]
        });

        const actionButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('previousPage')
                    .setLabel('Atrás')
                    .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('nextPage')
                    .setLabel('Siguiente')
                    .setStyle(ButtonStyle.Primary)
            );

        let arrayEmbeds = [];
        let currentPage = 0;
        let limitElements = 50;

        for (let i = 0; i < emotes.length; i += 50) {
            let emotesPage = emotes.slice(i, limitElements);
            limitElements += 50;

            arrayEmbeds.push(
                new EmbedBuilder()
                    .setAuthor({
                        name: `Emotes de ${message.guild.name}`,
                        iconURL: message.guild.iconURL()
                    })
                    .setDescription(`${emotesPage.join(' ')}`)
                    .setColor(process.env.EMBED_COLOR)
            );
        }

        const serverEmotes = await message.reply({
            content: `Página **${currentPage + 1}** de **${arrayEmbeds.length}**`,
            embeds: [arrayEmbeds[currentPage]],
            components: [actionButtons]
        });

        const collector = serverEmotes.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            if (i.user.id === message.author.id) {
                if (i.customId === 'nextPage') {
                    currentPage++;
                    if (currentPage > arrayEmbeds.length - 1) currentPage = 0;

                    await i.deferUpdate();
                    await i.editReply({
                        content: `Página **${currentPage + 1}** de **${arrayEmbeds.length}**`,
                        embeds: [arrayEmbeds[currentPage]],
                        components: [actionButtons]
                    });
                } else if (i.customId === 'previousPage') {
                    currentPage--;
                    if (currentPage < 0) currentPage = arrayEmbeds.length - 1;

                    await i.deferUpdate();
                    await i.editReply({
                        content: `Página **${currentPage + 1}** de **${arrayEmbeds.length}**`,
                        embeds: [arrayEmbeds[currentPage]],
                        components: [actionButtons]
                    });
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
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('🎉 → Pregunta a la bola mágica de Kuon')
        .addStringOption(option =>
            option.setName('pregunta')
                .setDescription('La pregunta que quieres hacer')
                .setRequired(true)
        ),
    async execute(client, interaction, prefix) {
        let pregunta = interaction.options.getString('pregunta');
        let respuestas = ["Probablemente", "Eso es imposible", "Teóricamente, sí", "No...", "No lo sé :S", "Si", "Tal vez", "Tal vez o.o", "¡Claro!", "Si", "No", "No ¬¬", "Cierto", "No digas eso...", "No hay duda acerca de eso", "Pregunta en otro momento"];
        let respuestaRandom = respuestas[Math.floor(Math.random() * respuestas.length)];

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`🎱 Bola mágica de ${client.user.username}`)
                    .addFields(
                        { name: "Pregunta", value: `${pregunta}` },
                        { name: "Respuesta", value: `${respuestaRandom}` }
                    )
                    .setColor(process.env.EMBED_COLOR)
            ]
        });
    }
}
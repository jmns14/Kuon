module.exports = {
    DESCRIPTION: "Pregunta a la bola mágica de Kuon",
    async execute(client, message, args, prefix) {
        let respuestas = ["Probablemente", "Eso es imposible", "Teóricamente, sí", "No...", "No lo sé :S", "Si", "Tal vez", "Tal vez o.o", "¡Claro!", "Si", "No", "No ¬¬", "Cierto", "No digas eso...", "No hay duda acerca de eso", "Pregunta en otro momento"]; //Respuestas aleatorias
        let respuestaRandom = respuestas[Math.floor(Math.random() * respuestas.length)];

        //No define la pregunta.
        let pregunta = args.join(' ');
        if (!pregunta) return message.reply(`Primero debes de escribir tu pregunta!`)

        //Respuesta del bot.
        message.reply({
            content: `🎱 ${respuestaRandom}`,
            allowedMentions: {
                repliedUser: false
            }
        });
    }
}
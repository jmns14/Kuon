const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('👑 → Recarga los archivos del bot')
        .addStringOption(option =>
            option.setName("modulo")
                .setDescription("Módulo a recargar")
                .addChoices(
                    { name: "Comandos", value: "commands" },
                    { name: "Comandos Diagonales", value: "slash" },
                    { name: "Eventos", value: "events" },
                    { name: "Handlers", value: "handlers" },
                )
    ),
    OWNER: true,

    async execute(client, interaction, prefix) {
        let args = interaction.options.getString("modulo");
        let opcion = "Comandos, Eventos y Handlers";

        try {
            switch (args?.toLowerCase()) {
                case "commands":
                case "comandos": {
                    opcion = "Comandos";
                    await client.loadCommands();
                }
                    break;

                case "slashcommands":
                case "slash": {
                    opcion = "Comandos Diagonales";
                    await client.loadSlashCommands();
                }
                    break;

                case "handlers": {
                    opcion = "Handlers";
                    await client.loadHandlers();
                }
                    break;

                case "events":
                case "eventos": {
                    opcion = "Eventos";
                    await client.loadEvents();
                }
                    break;

                default: {
                    await client.loadEvents()
                    await client.loadHandlers()
                    await client.loadSlashCommands()
                    await client.loadCommands()
                }
                    break;
            }

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .addFields({ name: `✅ ${opcion} Recargados!`, value: `> *Okay!*` })
                        .setColor(process.env.EMBED_COLOR)
                ]
            });
            
        } catch (e) {
            interaction.reply({ content: `**Ha ocurrido un error al recargar los archivos!**\n*Mira la consola para mas detalles!.*` });
            console.log(e)
        }
    }
}
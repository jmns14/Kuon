const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = async (client, interaction) => {
    if (!interaction.guild || !interaction.channel) return;

    const COMANDO = client.slashCommands.get(interaction?.commandName);

    const infoPermissions = new ButtonBuilder()
        .setLabel('Leer más sobre permisos')
        .setURL('https://support.discord.com/hc/es/articles/206029707--C%C3%B3mo-configurar-Permisos-')
        .setStyle(ButtonStyle.Link)

    const row = new ActionRowBuilder()
        .addComponents(infoPermissions)

    if (COMANDO) {
        if (COMANDO.OWNER) {
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if (!DUEÑOS.includes(interaction.user.id)) return interaction.reply({
                content: `Solo los dueños pueden ejecutar este comando!`
            });
        }

        if (COMANDO.BOT_PERMISSIONS) {
            if (!interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return interaction.reply({
                content: `No tengo los permisos suficientes para ejecutar este comando!\nPermisos necesarios: ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`,
                components: [row]
            });
        }

        if (COMANDO.PERMISSIONS) {
            if (!interaction.member.permissions.has(COMANDO.PERMISSIONS)) return interaction.reply({
                content: `No tienes los permisos suficientes para ejecutar este comando!\nPermisos necesarios: ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`,
                components: [row]
            });
        }

        try {
            COMANDO.execute(client, interaction, "/");
        } catch (error) {
            interaction.reply({ content: `Ha ocurrido un error al ejecutar el comando!/nMira la consola para mas detalles!` });
            console.log(error);
            return;
        }
    }
}
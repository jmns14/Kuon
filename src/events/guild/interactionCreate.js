module.exports = async (client, interaction) => {
    if (!interaction.guild || !interaction.channel) return;

    const COMANDO = client.slashCommands.get(interaction?.commandName);

    if (COMANDO) {
        if (COMANDO.OWNER) {
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if (!DUEÑOS.includes(interaction.user.id)) return interaction.reply({
                content: `Solo los dueños pueden ejecutar el comando!\nDueños: ${DUEÑOS.map(DUEÑO => `<@${DUEÑO}>`).join(", ")}`
            });
        }

        if (COMANDO.BOT_PERMISSIONS) {
            if (!interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return interaction.reply({
                content: `Necesito los siguientes permisos para ejecutar este comando:\n${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`<@${PERMISO}>\``).join(", ")}`
            });
        }

        if (COMANDO.PERMISSIONS) {
            if (!interaction.member.permissions.has(COMANDO.PERMISSIONS)) return interaction.reply({
                content: `Necesitas los siguientes permisos para ejecutar este comando:\n${COMANDO.PERMISSIONS.map(PERMISO => `\`<@${PERMISO}>\``).join(", ")}`
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
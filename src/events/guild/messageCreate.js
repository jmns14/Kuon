module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const ARGS = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const CMD = ARGS?.shift()?.toLowerCase();
    const COMANDO = client.commands.get(CMD) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(CMD));

    if (COMANDO) {
        if (COMANDO.OWNER) {
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if (!DUEÑOS.includes(message.author.id)) return message.reply({
                content: `Solo los dueños pueden ejecutar el comando!\nDueños: ${DUEÑOS.map(DUEÑO => `<@${DUEÑO}>`).join(", ")}`
            });
        }

        if (COMANDO.BOT_PERMISSIONS) {
            if (!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return message.reply({
                content: `Necesito los siguientes permisos para ejecutar este comando:\n${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`<@${PERMISO}>\``).join(", ")}`
            });
        }

        if (COMANDO.PERMISSIONS) {
            if (!message.member.permissions.has(COMANDO.PERMISSIONS)) return message.reply({
                content: `Necesitas los siguientes permisos para ejecutar este comando:\n${COMANDO.PERMISSIONS.map(PERMISO => `\`<@${PERMISO}>\``).join(", ")}`
            });
        }

        try {
            COMANDO.execute(client, message, ARGS, process.env.PREFIX);
        } catch (error) {
            message.reply({ content: `Ha ocurrido un error al ejecutar el comando!/nMira la consola para mas detalles!` });
            console.log(error);
            return;
        }
    }
}
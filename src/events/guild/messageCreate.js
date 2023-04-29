const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const ARGS = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const CMD = ARGS?.shift()?.toLowerCase();
    const COMANDO = client.commands.get(CMD) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(CMD));

    const infoPermissions = new ButtonBuilder()
        .setLabel('Leer más sobre permisos')
        .setURL('https://support.discord.com/hc/es/articles/206029707--C%C3%B3mo-configurar-Permisos-')
        .setStyle(ButtonStyle.Link)

    const row = new ActionRowBuilder()
        .addComponents(infoPermissions)

    if (COMANDO) {
        if (COMANDO.OWNER) {
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if (!DUEÑOS.includes(message.author.id)) return message.reply({
                content: `Solo los dueños pueden ejecutar este comando!`
            });
        }

        if (COMANDO.BOT_PERMISSIONS) {
            if (!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return message.reply({
                content: `No tengo los permisos suficientes para ejecutar este comando!\nPermisos necesarios: ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`,
                components: [row]
            });
        }

        if (COMANDO.PERMISSIONS) {
            if (!message.member.permissions.has(COMANDO.PERMISSIONS)) return message.reply({
                content: `No tienes los permisos suficientes para ejecutar este comando!\nPermisos necesarios: ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`,
                components: [row]
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
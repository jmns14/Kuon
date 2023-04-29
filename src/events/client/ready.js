const { ActivityType } = require('discord.js');

module.exports = client => {
    console.log(`Sesion iniciada como ${client.user.tag}`.green);

    if (client?.application?.commands) {
        client.application.commands.set(client.slashArray);
        console.log(`(/) ${client.slashCommands.size} Comandos Publicados`.green)
    }

    setInterval(() => {
        let serverCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
        let status = [
            {
                name: `🦊 /help`,
                type: ActivityType.Streaming,
                url: `${process.env.TWITCH_CHANNEL}`
            },
            {
                name: `🦊 ${serverCount} miembros`,
                type: ActivityType.Streaming,
                url: `${process.env.TWITCH_CHANNEL}`
            }
        ];
        let randomStatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[randomStatus]);
    }, 10000);
}
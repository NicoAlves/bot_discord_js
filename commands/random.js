module.exports = {
    name: 'random',
    desc: 'Mentionne au hasard',
    execute(msg, arg) {
        let user = msg.guild.members.cache.random();
        msg.channel.send(arg + " :medal: " + user.displayName + " :medal:");

    }
};


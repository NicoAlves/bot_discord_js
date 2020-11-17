module.exports = {
    name: 'calc',
    desc: 'calcul',
    execute(msg, arg) {
        msg.channel.send(eval(arg));
    }
};
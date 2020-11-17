module.exports = {
    name: 'rate',
    desc: 'donne une note',
    execute(msg, arg) {
        let max = 10;
        let nb = Math.floor(Math.random() * (max - 0) + 0);

        msg.channel.send(`${arg} rate : ${nb}/10`);

    }
};

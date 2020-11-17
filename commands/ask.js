module.exports = {
    name: 'ask',
    desc: 'répond par oui ou pas non à une question',
    execute(msg, arg) {
        let max = 2;
        let nb = Math.floor(Math.random() * (max - 0) + 0);

        let reponses = ["Oui", "Non"];
        console.log()
        return msg.channel.send(arg + " ? " + reponses[nb]);

    }
};


module.exports = {
    name: 'match',
    desc: 'Renvoie une personne au hasard parmi les tags de la commande',
    execute(msg, arg) {
        let user = msg.mentions.users.random();
        msg.channel.send(`${arg} c'est ${user}`);


    }
};

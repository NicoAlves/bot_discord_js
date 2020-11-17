module.exports = {
    name: 'dmMessage',
    desc: 'Envoie un message à l\'utilisateur mentionné',
    execute(msg, arg) {
        let msgList = ["message1", "message2", "message3", "message4"];
        let user = msg.mentions.users.first();
        if (!user) return;
        let max = msgList.length - 1;
        let nb = Math.floor(Math.random() * (max - 0) + 0);
        if (user.id == "203937188793155587") {
            let author = msg.author;
            msg.channel.send("Tu ne peux pas envoyer de message à cette utilisateur");
            author.createDM().then(channel => {
                return channel.send(`${bullyList[nb]} ${author.username}`)

            });
        } else {
            user.createDM().then(channel => {
                return channel.send(`${bullyList[nb]} ${user.username}`)
            });
            let embed = new Discord.MessageEmbed()
                .setColor("#f5e060")
                .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL())
                .setTitle("commande DmMessage")
                .addField("Informations : ", `${msg.author.username} à mp ${user.username}`, true)
                .addField("\u200b", "\u200b", false)
                .addField("bot : ", `J'ai mp cette utilisateur pour toi !`, true);

            msg.channel.send(embed);
        }

    }

};


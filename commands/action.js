let {db, fieldValue} = require('../require/dataBaseComponents');
const Discord = require('discord.js');

module.exports = {
    name: 'action',
    desc: 'demande d\'action',
    execute(msg, arg) {
        requestTo(msg);
    }

};


function requestTo(msg) {
    let toUser = msg.mentions.users.first();
    if (!toUser) return;
    let fromUser = msg.author;
    if (toUser === fromUser) return;
    let pathBdd = "actions";
    let dataActions = [];
    let i = 0;
    let actions = db.collection(`${pathBdd}`).doc(msg.guild.id).collection(`${pathBdd}`);
    let query = actions.where('guildId', '==', msg.guild.id).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Pas de documents correspondant.');
                return msg.channel.send("```" + `Il n'y pas encore de contenu de ce type ici ! ${msg.author.username}` + "```");
            }
            snapshot.docs.forEach(doc => {
                let data = doc.data();
                dataActions.push({
                    id: i,
                    guildId: data.guildId,
                    content: data.content,
                    author: data.autor
                });
                i++;
            });
            let max = dataActions.length - 1;
            let nb = Math.floor(Math.random() * (max - 0) + 0);
            let action = dataActions[nb].content;
            let embed = new Discord.MessageEmbed()
                .setColor("#f53337")
                .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                .setTitle("Action")
                .setThumbnail(toUser.displayAvatarURL(), toUser.username)
                .setFooter("lancez vous aussi une action ou une vérité avec la commande #(vérité ou action) (mention)")
                .setTimestamp()
                .addField(`${toUser.username}#${toUser.id}`, `${action}`, false)
                .addField("✅ Clic sur la reaction  ️", `Pour accpeter l'action qui t'es proposé`, true)
                .addField("❌ Clic sur la reaction ", `Pour refuser l'action qui t'es proposé}`, true)
                .addField("\u200b", "\u200b", false);

            msg.channel.send(embed);
            const filter = msg => msg.embeds;
            const collector = msg.channel.createMessageCollector(filter, {time: 500});
            collector.on("end", collected => {
                // msg.channel.send(`${collected.size} messages collectés.`);
                collected.last().react('✅').then(collected.last().react("❌"));

            })


        })
        .catch(err => {
            console.log('Erreur', err);
        });

}







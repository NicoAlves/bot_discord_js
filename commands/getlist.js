let {db, fieldValue} = require('../require/dataBaseComponents');
const Discord = require('discord.js');

module.exports = {
    name: 'getlist',
    desc: 'Renvoie les actions et vérités enregistrer',
    execute(msg, arg) {
        get(msg, arg);

    }
};


function get(msg, arg) {
    if (arg.lenght <= 0) return;

    if (arg.startsWith(" ")) {
        arg = arg.slice(1);
    }
    let pathBdd;
    if (arg.startsWith('action')) {
        arg = arg.replace("action", "");
        pathBdd = "actions";
    } else if (arg.startsWith('vérité')) {
        arg = arg.replace("vérité", "");
        pathBdd = "verites";
    }

    let lesDonnees = "";

    let Donnees = db.collection(`${pathBdd}`).doc(msg.guild.id).collection(`${pathBdd}`);
    let query = Donnees.where('guildId', '==', msg.guild.id).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Pas de documents correspondant.');
                return msg.channel.send("```" + `Il n'y pas encore de contenu de ce type ici ! ${msg.author.username}` + "```");
            }
            let nbDonnee = 1;
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                let data = doc.data();
                let auteurContent = msg.guild.members.cache.get(data.autorId);
                auteurContent = auteurContent.user.username;
                console.log(auteurContent);
                lesDonnees += `${nbDonnee++} :\n{\nAuteur : ${auteurContent}\n${data.content}\n}\n`;

            });
            msg.channel.send("```" + `${lesDonnees}` + "```");


        })
        .catch(err => {
            console.log('Erreur', err);
        });
}





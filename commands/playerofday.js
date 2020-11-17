let {db} = require('../require/dataBaseComponents');
module.exports = {
    name: 'playerofday',
    desc: 'Renvoie le profile de l\'utilisateur mentionné',
    execute(msg, arg) {
        let pathBdd = "PlayerOfDay";
        let playerOfDay = "";
        let playersOfDay = db.collection(`${pathBdd}`);

        let query = playersOfDay.where('guildId', '==', msg.guild.id).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('Pas de documents correspondant.');
                    playerOfDay = msg.guild.members.cache.random();
                    db.collection(`${pathBdd}`).doc(msg.guild.id).set({
                        'guildId': msg.guild.id,
                        'playerOfDayID': playerOfDay.id
                    });

                    msg.channel.send(`Le joueur du jour est: ${playerOfDay} 🐒`)

                }
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    let data = doc.data();

                    if (data.playerOfDayID <= 0) {
                        console.log("0");
                        playerOfDay = msg.guild.members.cache.random();
                        db.collection(`${pathBdd}`).doc(msg.guild.id).set({
                            'guildId': msg.guild.id,
                            'playerOfDayID': playerOfDay.id
                        });
                        msg.channel.send(`Le joueur du jour est: ${playerOfDay} 🐒`)
                    } else {
                        playerOfDay = msg.guild.members.cache.get(data.playerOfDayID);
                        console.log(playerOfDay);

                        msg.channel.send(`Le joueur du jour est: ${playerOfDay.displayName} 🐒`)


                    }


                });

            })
            .catch(err => {
                console.log('Erreur', err);
            });


    }
};

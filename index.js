const {Client, Collection} = require('discord.js');
const client = new Client();
const fs = require('fs');
const cron = require('node-cron');

//config
require('dotenv/config');
const owner = env.owner;
const token = env.token;

//database
require('./require/dataBaseComponents');
let {db} = require('./require/dataBaseComponents');
let action = require('./sgbd/class.updateAction');
let truth = require('./sgbd/class.updateTruth');
//collection
["commands", "cooldownsCommands", "vocSates", "cooldownsXp"].forEach(x => client[x] = new Collection());

//commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);


}


let prefix = '#';


//reset journalier
cron.schedule('59 23 * * *', () => {
    let pathBdd = "playerOfDay";
    let playerOfDay = db.collection(`${pathBdd}`).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Pas de documents correspondant.');

            }
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                let data = doc.data();

                db.collection(`${pathBdd}`).doc(doc.id).update({
                    playerOfDayID: ""

                }).then(console.log("reset"));


            });


        })
        .catch(err => {
            console.log('Erreur', err);
        });
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', (messageReaction, user) => {

    const msg = messageReaction.message;
    const guildId = msg.guild.id;

    if (msg.author.username === client.user.username && user.id !== client.user.id) {
        let embed = msg.embeds[0];
        if (embed.length > 0) {

            let toUser = embed.fields[0].name;
            let title = embed.title;
            if (title !== "Vérité" || "Action")return;
            let author = embed.author.name;
            console.log(author);

            toUser = toUser.split('#');
            let user2 = msg.guild.members.cache.get(toUser[1]);
            console.log(toUser[1], "=>", user.id);
            if (toUser[1] === user.id) {
                if (messageReaction.emoji.name === "✅" || messageReaction.emoji.name === "❌") {

                } else {
                    messageReaction.users.remove(user2);
                    return;
                }

                let countReact = 0;
                msg.reactions.cache.forEach(element => {
                    console.log(element.count);
                    if (element.count > 1) {
                        countReact += 1
                    }
                });

                if (countReact >= 2) {
                    messageReaction.users.remove(user2);
                    return;
                }
                if (title === "Action") {
                    if (messageReaction.emoji.name === "✅") {
                        msg.channel.send(`Action de ${author} acceptée par ${user}`);
                        return action.updateActionValidate(user, 1, guildId)

                    } else if (messageReaction.emoji.name === "❌") {
                        msg.channel.send(`Action de ${author} déclinée par ${user}`);
                        return action.updateActionCanceled(user, 1, guildId)
                    }

                } else if (title === "Vérité") {
                    if (messageReaction.emoji.name === "✅") {
                        msg.channel.send(`Vérité de ${author} acceptée par ${user}`);
                        return truth.updateTruthValidate(user, 1, guildId)
                    } else if (messageReaction.emoji.name === "❌") {
                        msg.channel.send(`Vérité de ${author} déclinée par ${user}`);
                        return truth.updateTruthCanceled(user, 1, guildId)
                    }
                }

            } else {

                messageReaction.users.remove(user);
                return;
            }

        }

    } else {

    }

});

client.on('messageReactionRemove', (messageReaction, user) => {

    const msg = messageReaction.message;
    const guildId = msg.guild.id;

    if (msg.author.username === client.user.username && user.id !== client.user.id) {
        let embed = msg.embeds[0];
        if (embed.length > 0) {
            let toUser = embed.fields[0].name;
            let title = embed.title;
            toUser = toUser.split('#');
            if (toUser[1] === user.id) {
                if (title === "Action") {
                    console.log(messageReaction.emoji);
                    if (messageReaction.emoji.name === "✅") {
                        return action.updateActionValidate(user, -1, guildId)
                    } else if (messageReaction.emoji.name === "❌") {
                        return action.updateActionCanceled(user, -1, guildId)
                    }

                } else if (title === "Vérité") {
                    if (messageReaction.emoji.name === "✅") {
                        return truth.updateTruthValidate(user, -1, guildId)
                    } else if (messageReaction.emoji.name === "❌") {
                        return truth.updateTruthCanceled(user, -1, guildId)
                    }
                }

            }

        }

    } else {

    }

});

client.on('guildCreate', (ginfo) => {
    console.log(`Enregistrement nouveau discord`);
    let guildId = ginfo.id;
    let guildName = ginfo.name;
    let guildOwner = ginfo.owner.user.username;
    let guildOwnerId = ginfo.owner.user.id;
    let guildMemberCount = ginfo.memberCount;
    db.collection('guilds').doc(ginfo.id).set({
        'guildId': guildId,
        'guildName': guildName,
        'guildOwner': guildOwner,
        'guildOwnerId': guildOwnerId,
        'guildMemberCount': guildMemberCount,
    });


    ginfo.members.cache.each(function (data) {
        db.collection('users').doc(guildId).collection("users").doc(data.id).set({
            'guildId': ginfo.id,
            'userId': data.id,
            'vocTime': 0,
            'actions': 0,
            'truths': 0,
            'actionsCanceled': 0,
            'truthsCanceled': 0,
            'xp': 0,
            'money': 0,
            'nbcommands': 0,
            'nbMessages': 0,
            'vocState': "false"
        })


    });


});


client.on('guildMemberAdd', member => {
    let guildId = member.guild.name;
    let userId = member.id;
    let nom_serveur = member.guild.name;

    db.collection('users').doc(guildId).collection("users").doc(userId).set({
        'guildId': guildId,
        'userId': userId,
        'vocTime': 0,
        'actions': 0,
        'truths': 0,
        'actionsCanceled': 0,
        'truthsCanceled': 0,
        'xp': 0,
        'money': 0,
        'nbcommands': 0,
        'nbMessages': 0,
        'vocState': "false"
    });
});

client.on('guildMemberRemove', member => {
    let guildId = member.guild.name;
    let userId = member.id;
    let nom_serveur = member.guild.name;

    db.collection('users').doc(guildId).collection("users").doc(userId).delete();


});
let temps = 0;
client.on("voiceStateUpdate", (oldState, newState) => {

    // let statut = "false";
    //console.log(newState.guild.id);
    let userInfo = [];
    let user = client.users.cache.get(newState.id);
    let membres = db.collection('users');
    let query = membres.where('userId', '==', user.id).where('guildId', '==', newState.guild.id).get()

        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Pas de documents correspondant.');

            }
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                let data = doc.data();
                if (newState.serverMute === false && newState.serverDeaf === false && newState.selfDeaf === false && newState.selfMute === false) {

                    var timer = setInterval(function () {
                        temps++;
                        console.log(`${temps} ${user.username}`);


                    }, 1000);
                    (` c'est ok`);

                } else if (newState.serverMute === false || newState.serverDeaf === false || newState.selfDeaf === false || newState.selfMute === false) {

                }

            });
        });

});


client.on('message', async msg => {
    let msgContent = msg.content.toLowerCase();


    // let xpReqBase = 100;
    // let xpMin = 100;
    // let playerXp = 5000;
    // let lvl = 0;
    //
    // while (playerXp > xpMin) {
    //     console.log("xp", xpReqBase);
    //     let xpReq = xpReqBase * lvl;
    //     playerXp -= xpReq;
    //
    //
    //     console.log(xpReq);
    //     console.log("xpPlayer", playerXp);
    //     if (playerXp < 0) playerXp = 0;
    //     lvl++
    // }
    // console.log(lvl, "lvl");

    if (msg.author.id == "647521527209656331" || !msgContent.startsWith(prefix)) {
        return;
    }
    if (!client.cooldownsXp.has(msg.author.id)) {
        client.cooldownsXp.set(msg.author.id, true);
        setTimeout(function () {
            client.cooldownsXp.delete(msg.author.id);
            console.log(client.cooldownsXp, "remove");
        }, 5000)
    } else {

        return;
    }
    console.log(client.cooldownsXp);

    let arg = msgContent.split(' ');
    let command = arg[0];
    arg = arg.slice(1, arg.lenght);
    arg = arg.join(' ');
    let id_channel = msg.channel.id;
    command = command.replace('#', '');


    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(msg, arg);

});


client.login(token);
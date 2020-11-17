let {db} = require('../require/dataBaseComponents');
const Discord = require('discord.js');

module.exports = {
    name: 'profile',
    desc: 'Renvoie le profile de l\'utilisateur mentionné',
    execute(msg, arg) {
        getProfile(msg);

    }
};


function getProfile(msg) {

    let user = msg.mentions.users.first();
    if (!user) {
        user = msg.author;
    }
    let server = msg.guild.id;
    let users = db.collection(`users`).doc(server).collection('users').doc(user.id).get().then(userInfo => {
        displayProfile(msg, user, userInfo.data())
    });
}

function getOwnProfile(msg) {
    let user = msg.author;
}

function displayProfile(msg, user, userInfo) {
    console.log(userInfo);
    let embed = new Discord.MessageEmbed()
        .setColor("#f55ba7")
        .setAuthor(user.username, user.displayAvatarURL())
        .setTitle(`Profile :`)
        .setThumbnail(user.displayAvatarURL())
        .setFooter("")
        .setTimestamp()
        .addField("Expériences", `${userInfo.xp} :sparkles: `, true)
        .addField("money", `${userInfo.money} :dollar: `, true)
        .addField("\u200b", "\u200b", false)

        .addField("Voc time", `${userInfo.vocTime} :clock1: `, true)
        .addField("Nombre de message", `${userInfo.nbMessages} :pencil: `, true)
        .addField("Nombre de commande", `${userInfo.nbcommands} :robot: `, true)
        .addField("\u200b", "\u200b", false)
        .addField("Actions acceptées", `${userInfo.actions} :crossed_swords: `, true)
        .addField("Vérités acceptées", `${userInfo.truths} :shield:  `, true)
        .addField("\u200b", "\u200b", true)
        .addField("\u200b", "\u200b", false)

        .addField("Actions refusées", `${userInfo.actionsCanceled} :crossed_swords: `, true)
        .addField("Vérités refusées", `${userInfo.truthsCanceled} :shield:  `, true)
        .addField("\u200b", "\u200b", true)

    return msg.channel.send(embed);
}



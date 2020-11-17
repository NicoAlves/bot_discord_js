let {db, fieldValue} = require('../require/dataBaseComponents');
const Discord = require('discord.js');

module.exports = {
    name: 'ajout',
    desc: 'ajout action ou vérité',
    execute(msg, arg) {
        add(msg, arg);
    }

};

function add(msg, arg) {

    if (arg.startsWith(" ")) {
        arg = arg.slice(1);
    }

    let pathBdd = "";
    let label = "";
    if (arg.startsWith('action')) {
        arg = arg.replace("action", "");
        pathBdd = "actions";
        label = "Action";
    } else if (arg.startsWith('vérité')) {
        arg = arg.replace("vérité", "");
        pathBdd = "verites";
        label = "Vérité";
    }


    if (pathBdd.length <= 0) return;

    db.collection(`${pathBdd}`).doc(msg.guild.id).collection(pathBdd).doc().set({
        'guildId': msg.guild.id,
        'autorId': msg.author.id,
        'content': arg
    });
    const attachment = new Discord.MessageAttachment('./img/de.png', 'de.png');
    let embed = new Discord.MessageEmbed()
        .setColor("#42eff5")
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTitle("Action ou vérité ?")
        .attachFiles(attachment)
        .setThumbnail('attachment://de.png')
        .setFooter("Ajoutez vous aussi une action ou une vérité à l'aide de la commande #ajout (vérité ou action) (argument)")
        .setTimestamp()
        .addField("Succès", `Ajout de votre ${label} !`, false);

    return msg.channel.send(embed);

}







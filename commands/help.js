const Discord = require('discord.js');
module.exports = {
    name: 'help',
    desc: 'Renvoie la liste des commandes',
    execute(msg, arg) {
        msg.channel.send("```md\nCommandes:\n\nPrefix: # \n\n[dmmessage](tag) Le bot va mp l'utilisateur mentionné.\n" +
            "\n[ask](question) Le bot répond par oui ou non à ta question.\n" +
            "\n[rdm](phrase) Trouve une personne au hasard sur le discord\n" +
            "\n[match](tag) Le bot prend une personne au hasard parmi les tags de la commande .\n" +
            "\n[rate](phrase) Le bot donne une note .\n" +
            "\n[calc](calcul) Le bot calcul pour toi .\n" +
            "\n[google](argument) Le bot trouve une image en rapport avec ton argument .\n" +
            "\n[pseudo](nom_du_joueur) Renvoie l'historique des pseudos du joueur.\n" +
            "\n[ajout](vérité ou action)(phrase) Ajoute votre argument dans la catégorie correspondante.\n" +
            "\n[action ou vérité](tag) Vous envoyez une requête vers un membre du discord.\n" 

            + "```");

    

    }
};

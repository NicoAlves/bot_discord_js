const cheerio = require('cheerio');
const request = require('request');
module.exports = {
    name: 'pseudo',
    desc: 'Renvoie l\'historique des pseudos minecraft du joueur',
    execute(msg, arg) {
        if (arg.length === 0) {
            msg.channel.send("`` Rentre un pseudo``");
            return;
        }

        let options = {
            url: "https://api.mojang.com/users/profiles/minecraft/" + arg,
            method: "GET",
            headers: {
                json: true,
                "User-Agent": "Chrome"
            }

        };

        request(options, function (error, response, responseBody) {

            let data = [];
            console.log(responseBody);
            if (responseBody == 0) {
                msg.channel.send("``Je ne connais pas ce joueur``");
                return;
            }
            data = JSON.parse(responseBody);
            let uuid = data.id;
            msg.channel.send("`` UUID du joueur: " + uuid + "``");
            getPseudos(uuid, msg);

        });

    }

};


function getPseudos(uuid, msg) {
    let options = {

        url: "https://api.mojang.com/user/profile/" + uuid + "/names",
        method: "GET",
        headers: {
            json: true,
            "User-Agent": "Chrome"
        }

    };

    request(options, function (error, response, responseBody) {

        let data = [];
        data = JSON.parse(responseBody);
        console.log(data);
        let message = "";
        if (!data)return;
        data.reverse();
        for (let i in data) {
            let unPseudo = data[i];

            if (i == data.length - 1) {
                message += "[" + i + "](" + unPseudo.name + ") Premier pseudo\n";
            } else {
                let dateChange = new Date(unPseudo.changedToAt).toLocaleDateString("fr-FR");
                dateChange = dateChange.split("/");
                if (dateChange[0].length === 1) {
                    dateChange[0] = "0" + dateChange[0];
                }
                dateChange = dateChange[1] + "/" + dateChange[0] + "/" + dateChange[2];
                let hourChange = new Date(unPseudo.changedToAt).getUTCHours().toLocaleString();
                let minutesChange = new Date(unPseudo.changedToAt).getUTCMinutes().toLocaleString();
                if (minutesChange.length === 1) {
                    minutesChange = "0" + minutesChange;
                }

                message += "[" + i + "](" + unPseudo.name + ") Changer le " + dateChange + " à " + hourChange + "h" + minutesChange + "\n";
            }


        }
        // let message = "rtgr(iotg[heorghrhgrghorgirgoorngorgnr";
        let msgLength = message.length;
        //
        // console.log(msgLength);
        //
        // const searchTerm = "[";
        //
        // if (msgLength > 20 && msgLength < 40) {
        //     let msg1 = message.slice(0, 20, 20);
        //     let indexOf = msg1.lastIndexOf(searchTerm);
        //     msg1 = msg1.slice(0, indexOf);
        //     let msg2 = message.slice(indexOf, msgLength);
        //     console.log("supp 20");
        //
        // } else if (msgLength > 40 && msgLength < 60) {
        //     let msg1 = message.slice(0, 20, 20);
        //     let indexOf = msg1.lastIndexOf(searchTerm);
        //     msg1 = msg1.slice(0, indexOf);
        //     let msg2 = message.slice(indexOf, msgLength);
        //     let msg3 = msg2.slice();
        //     console.log("supp 40");
        //
        // } else {
        //     let msg1 = message.slice(0, 20, 20);
        //     let indexOf = msg1.lastIndexOf(searchTerm);
        //     msg1 = msg1.slice(0, indexOf);
        //     let msg2 = message.slice(indexOf, msgLength);
        //     console.log("supp 60");
        //
        // }

        if (msgLength > 2000) {
            let msg1 = msg.slice(0, 2000, 2000);
            let msg2 = msg.slice(2000, msgLength, msgLength);

            console.log("msg 1:" + msg1);
            console.log("msg 2:" + msg2);

        } else {
            return msg.channel.send("```md\n" +
                message +
                "```");
        }


    });
}





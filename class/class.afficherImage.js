const cheerio = require('cheerio');
const request = require('request');


module.exports = class afficherImage {

    static afficher(msg, options) {
        let _this = this;
        let cheerioLoader;
        let urls;
        console.log("afficher image réussi");
        request(options, function (error, response, responseBody) {
            if (error) {
                return;
            }


            cheerioLoader = cheerio.load(responseBody);

            if (msg.content.startsWith('#sticker')) {
                let links = cheerioLoader('a[title="Copier le lien noelshack"]');

                urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));


            } else if (msg.content.startsWith('#topic')) {
                let links = cheerioLoader('a.lien-jv');

                urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            } 

             else {

                let links = cheerioLoader(".image a.link");
                urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

            }

            if (!urls.length >= 1) {

                return;
            }

            let max = urls.length - 3;
            let nb = Math.floor(Math.random() * (max - 0) + 0);

            if (msg.content.startsWith('#topic')) {
                let urltopic = urls[nb];

                _this.getTopic(urltopic, msg);

            } else {
                msg.channel.send(urls[nb]).then(setTimeout(function () {
                    msg.channel.lastMessage.react('💪')
                }, 500));
            }


        });


    }

    static getTopic(url, msg) {

        let topic = "http://www.jeuxvideo.com/" + url;

        let options = {
            url: topic,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };


        request(options, function (error, response, body) {
            let cheerioLoader = cheerio.load(body);
            let links = cheerioLoader('div.txt-msg').first();

            let txt = new Array(links.length).fill(0).map((v, i) => links.eq(i).children('p').text());

            console.log(txt);

            if (txt.length > 2000) {
                msg.channel.send("Le topic fait plus de 2000 caractères clique sur le lien!").then(setTimeout(function () {
                    msg.channel.send("Lien vers le Topic : " + topic);
                    msg.channel.lastMessage.react('💪')
                }, 500));
            }else {
                msg.channel.send(txt).then(setTimeout(function () {
                    msg.channel.send("Lien vers le Topic : " + topic);
                    msg.channel.lastMessage.react('💪')
                }, 500));
            }


        });
    };



};
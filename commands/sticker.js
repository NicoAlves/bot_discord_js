const afficherImage = require("../class/class.afficherImage");
const cheerio = require('cheerio');
const request = require('request');
module.exports = {
    name: 'sticker',
    desc: 'Renvoie un sticker jvc',
    execute(msg, arg) {
        let options = {
            url: "https://risibank.fr/",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        afficherImage.afficher(msg, options);
        console.log(options.url);

    }
};

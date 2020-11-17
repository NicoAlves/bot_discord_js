const afficherImage = require("../class/class.afficherImage");
const cheerio = require('cheerio');
const request = require('request');
module.exports = {
    name: 'topic',
    desc: 'Renvoie un topic',
    execute(msg, arg) {

        let options = {
            url: "http://www.jeuxvideo.com/forums/0-51-0-1-0-1-0-blabla-18-25-ans.htm",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        console.log(options.url);
        afficherImage.afficher(msg, options);


    }
};

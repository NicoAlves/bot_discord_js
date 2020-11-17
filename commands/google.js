const afficherImage = require("../class/class.afficherImage");
module.exports = {
    name: 'google',
    desc: 'Renvoie une image',
    execute(msg, arg) {
        let options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + arg,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        afficherImage.afficher(msg, options);

    }
};

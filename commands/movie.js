const Discord = require('discord.js');
const unirest = require("unirest");

module.exports = {
    name: 'movie',
    desc: 'Renvoie les information d\' film',
    execute(msg, arg) {
        if (arg.startsWith("proposition")) {

            arg = arg.replace("proposition", "");
            let date = Date.now();
            date = new Date().toLocaleDateString("fr-FR");
            date = date.split("-");
            date = date.reverse().join('/');

            const attachment = new Discord.MessageAttachment('./img/cine.jpg', 'cine.jpg');
            let req = unirest("GET", `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${arg}`);
            req.headers({
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "4becce4507msh34a9203b31d67c6p10ead9jsn8fc5613602c8",
                "useQueryString": true
            });


            req.end(function (res) {
                if (res.error) throw new Error(res.error);
                let id = res.body.titles[0].id;
                let req = unirest("GET", `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${id}`);
                req.headers({
                    "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                    "x-rapidapi-key": "4becce4507msh34a9203b31d67c6p10ead9jsn8fc5613602c8",
                    "useQueryString": true
                });


                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                    if (res.error) return;
                    console.log(res.body);
                    let actors = [];
                    let img, dateMovie, lenght, desc, trailer;
                    img = res.body.poster;
                    dateMovie = res.body.year;
                    lenght = res.body.length;
                    desc = res.body.plot;
                    let i = 0;
                    while (i < 3) {
                        if (!res.body.cast[i]) return;

                        actors.push(res.body.cast[i].actor);
                        i++;
                        console.log(actors);
                    }
                    trailer = res.body.trailer.link;

                    let embed = new Discord.MessageEmbed()
                        .attachFiles(attachment)
                        .setColor("#a17bf5")
                        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                        .setTitle(`${arg}`)
                        .addField(`Proposé le :`, `${date}`, false)

                        .addField(`durée:`, `${lenght}`, true)
                        .addField(`Date de sortie:`, `${dateMovie}`, true)
                        .addField(`acteurs:`, `${actors}`, true)

                        .addField(`Description:`, `${desc}`, false)
                        .setThumbnail('attachment://cine.jpg')
                        .setURL(`${trailer}`)
                        .setFooter("")
                        .setImage(img)
                        .addField("✅ Clic sur la reaction  ️", `Pour montrer ton aprobation et ou ton éventuelle participation`, true)
                        .addField("❌ Clic sur la reaction ", `Pour montrer ton désaprobation et ou ton absence}`, true)
                        .addField("\u200b", "\u200b", false);

                    msg.channel.send(embed);
                    const filter = msg => msg.embeds;
                    const collector = msg.channel.createMessageCollector(filter, {time: 500});
                    collector.on("end", collected => {
                        // msg.channel.send(`${collected.size} messages collectés.`);
                        collected.last().react('✅').then(collected.last().react("❌"));

                    });

                });

            });

        } else {

        }


    }
};

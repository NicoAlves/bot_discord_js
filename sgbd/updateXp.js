let {db, fieldValue} = require('../require/dataBaseComponents');

module.exports = class sgbd {
    static updateTruthValidate(user, nb, guildId) {
        const increment = fieldValue.increment(nb);

        const truths = db.collection('users').doc(guildId).collection('users').doc(user.id);
        truths.update({
            truths: increment
        });

    }


    static updateTruthCanceled(user, nb, guildId) {
        const increment = fieldValue.increment(nb);
        const truths = db.collection('users').doc(guildId).collection('users').doc(user.id);
        truths.update({
            truthsCanceled: increment
        })

    }

};

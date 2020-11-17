let {db, fieldValue} = require('../require/dataBaseComponents');

module.exports = class sgbd {
    static updateIncrement(user, nb, guildId, champ) {
        const increment = fieldValue.increment(nb);

        const collection = db.collection('users').doc(guildId).collection('users').doc(user.id);
        collection.update({
            champ: increment
        });

    }




};

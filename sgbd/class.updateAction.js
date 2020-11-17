let {db, fieldValue} = require('../require/dataBaseComponents');

module.exports = class sgbd {
    static updateActionValidate(user, nb, guildId) {
        const increment = fieldValue.increment(nb);

        const actions = db.collection('users').doc(guildId).collection('users').doc(user.id);
        actions.update({
            actions: increment
        });

    }


    static updateActionCanceled(user, nb, guildId) {
        const increment = fieldValue.increment(nb);
        const actions = db.collection('users').doc(guildId).collection('users').doc(user.id);
        actions.update({
            actionsCanceled: increment
        })

    }

};

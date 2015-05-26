/**
 * Created by mosluce on 15/5/27.
 */
module.exports = {
    attributes: {
        identity: {
            type: 'string'
        },
        accounts: {
            collection: 'account',
            via: 'domains'
        }
    }
};
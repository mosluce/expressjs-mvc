/**
 * Created by mosluce on 15/5/27.
 */
module.exports = {
    attributes: {
        email: {
            type: 'email'
        },
        pass: {
            type: 'string'
        },
        username: {
            type: 'string'
        },
        domains: {
            collection: 'domain',
            via: 'accounts'
        }
    }
};
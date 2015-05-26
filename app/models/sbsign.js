/**
 * Created by mosluce on 15/5/27.
 */
module.exports = {
    attributes: {
        domain: {
            model: 'domain'
        },
        action: {
            type: 'string'
        },
        signer: {
            model: 'appuser'
        },
        at: {
            type: 'datetime'
        },
        ll: {
            type: 'json'
        },
        comment: {
            type: 'string'
        }
    }
};
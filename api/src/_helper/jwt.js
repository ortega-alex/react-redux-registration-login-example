const expressjwt = require('express-jwt');
const config = require('../config/config.json');
const userServices = require('../user/user_services');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressjwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/authenticate',
            '/api/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userServices.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
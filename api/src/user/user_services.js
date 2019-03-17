const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcript = require('bcryptjs');
const db = require('../_helper/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    console.log( password == user.hash);
    if (user && bcript.compareSync(password, user.hash)) {
        console.log(user.toObject());
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hast');
}

async function getById(id) {
    return await User.findById(id).select('-hast');
}

async function create(userParan) {

    console.log(userParan);
    //validate
    if (await User.findOne({ username: userParan.username })) {
        throw 'Username "' + userParan.username + '" is already take ';
    }

    const user = new User(userParan);
    console.log(user);

    //hash password
    if (userParan.password) {
        user.hash = bcript.hashSync(userParan.password, 10);
    }

    //save user
    await user.save();
}

async function update(id, userParan) {
    const user = await User.findById(id);

    //validate
    if (!user) throw 'user not fount';
    if (user.username !== userParan.username && await User.findOne({ username: userParan.username })) {
        throw 'Username "' + userParan.username + '" is already take';
    }

    //hash password if it was entered
    if (userParan.password) {
        userParan.hash = bcript.hashSync(userParan.password, 10);
    }

    //copy userParam properties to user
    Object.assign(user, userParan);
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndDelete(id);
}
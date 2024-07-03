const validator = require('fastest-validator')

const v = new validator()

const schema = {
    name: {
        type: 'string',
        min: 3,
        max: 200,
    },
    username: {
        type: 'string',
        min: 3,
        max: 100,
    },
    email: {
        type: 'email',
        min: 10,
        max: 100,
    },
    phone: {
        type: 'number',
        maxLength: 12,
    },
    password: {
        type: 'string',
        min: 8,
        max: 100,
    },
    confirmedpassword: {
        type: 'equal',
        field: 'password',
    },
    $$strict: true,
}

const check = v.compile(schema)

module.exports = check;
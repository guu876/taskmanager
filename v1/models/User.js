const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    methods: {
        validatePassword:  async function(password) {
            return (await bcrypt.compare(password, this.password));
        },
        setPassword: async function(password) {
            this.password = await bcrypt.hash(password, parseInt(process.env.SALT));
        }
    }
});

module.exports = new mongoose.model("User", userSchema);
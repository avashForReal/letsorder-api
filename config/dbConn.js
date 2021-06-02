const mongoose = require('mongoose')

const dbConn = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Connected to mongo database ${conn.connection.name}`);
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = dbConn
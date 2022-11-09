require('dotenv').config();
require('./database')
const {server, port} = require('./app')

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})
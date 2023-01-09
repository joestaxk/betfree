require('dotenv').config();
require('./database');
const { server, port, initialize } = require('./app');
require("./model/teamModel");
server.listen(port, () => {
    initialize();
    console.log(`listening on port ${port}`);
});

require('dotenv').config();
require('./config/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 9000
const sequelize = require('./config/db');
const Routers = require('./router/index');

(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json())

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs')

app.use('/',Routers)


app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
// npm packages
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const chalk = require('chalk');
const path = require('path');

const staticPath = path.join(__dirname , '/public/');

app.use(express.static(staticPath));

app.get('/' , (req , res) => {
    res.sendFile( path.join(staticPath , 'index.html'));
});

app.listen(port , (error) =>{
    if (error) {
        console.log(`Error Found => ${error}`);
    } else {
        console.log( chalk.red.bgBlue.bold(`server listening on port ${port}`));
    }
});
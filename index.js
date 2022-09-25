const express = require('express');
const app = express();
const path = require('path');

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/build/index.html'));
  });

app.listen(3000);
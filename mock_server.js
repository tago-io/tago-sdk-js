'use strict';
const express = require('express');
const app     = new express();
app.all('*', function (req, res) {
    let model = {
        'url'  : req.url,
        'token': req.headers.token,
        'body' : req.body,
        'query': req.query,
        'method': req.method
    };
    res.send({'status': true, 'result':model});
});
app.listen(5000);

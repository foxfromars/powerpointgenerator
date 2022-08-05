const express = require('express');
const app =  express();
const pptxgen = require('pptxgenjs')
const ejs = require('ejs')
const path = require('path')

app.use('/static', express.static(__dirname + '/public'));
app.use(express.static('public'));
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('we are listening to you')
})

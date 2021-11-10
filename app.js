'use strict';

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');
const formidable = require('formidable')
const fs = require('fs');
const fileUpload = require('express-fileupload')

//static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use(express.static('uploads'))
app.use(fileUpload())

//set editable files 
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('home')
})
app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/help', (req, res) => {
    res.render('help')
})
app.get('/output', (req, res) => {
    res.render('output')
})
app.get('/demo', (req, res) => {
    res.render('demo')
})
app.post('/demo', function (req, res) {

    if (!req.files) {
        return res.send('No files were uploaded.')
    }

    if (req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./uploads/'+filename, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.send("File Uploaded")
            }
        })
    }
})
app.listen(port, () => console.info(`App listening on port ${port}`))











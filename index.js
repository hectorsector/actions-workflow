var path = require('path')
var http = require('http')
require('dotenv').config()
let express = require('express')
let app = express()

app.set('port', process.env.PORT || 3000)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'))
app.engine('.ejs', require('ejs').__express)

app.get('*', function (req, res) {
  if (process.env.GITHUB_ACTOR && process.env.GITHUB_SHA) {
    res.render('index', {sha: process.env.GITHUB_SHA.substring(process.env.GITHUB_SHA, 6), name: process.env.GITHUB_ACTOR})
  } else {
    res.render('almost')
  }
})

let port = process.env.PORT || 3000;

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app

console.log('hello')

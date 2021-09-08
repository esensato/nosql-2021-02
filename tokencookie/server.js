const express = require('express')
const redis = require('redis')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

var redisCli = redis.createClient()
var app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const tokencookie = req.cookies.tokencookie
    if (tokencookie != null) {
        redisCli.hgetall(tokencookie, (err, ret) => {
            res.render('home', {corfundo: ret.corFundo, corfrente: ret.corfrente})
        })    
    } else {
        res.sendFile(__dirname + '/public/login.html')
    }

})

app.post('/login', (req, res) => {
    
    const username = req.body.username
    const password = req.body.senha
    console.log('Username: ' + username + ' - senha: ' + password)

    redisCli.get(username, (err, ret) => {
        if (ret == null || ret != password) {
            res.status(403).send('Login invalido')    
        } else {
            const token = jwt.sign({username}, 'minhachavesecreta')
            console.log(token)

            redisCli.hmset(token, "corfrente", "#", "corFundo", "#", (err, ret) => {
                console.log(err)
                console.log(ret)
                res.cookie('tokencookie', token)
                res.sendFile(__dirname + '/public/perfil.html')
            })
        }
    })

})

app.post('/perfil', (req, res) => {

    const corfrente = req.body.corfrente
    const corfundo = req.body.corfundo
    const token = req.cookies.tokencookie

    redisCli.hmset(token, "corfrente", corfrente, "corFundo", corfundo, (err, ret) => {
        console.log(err)
        console.log(ret)
        res.render('home', {corfundo: corfundo, corfrente: corfrente})
    })
})

app.listen(5000, () => {
    console.log('Servidor iniciado...')
})
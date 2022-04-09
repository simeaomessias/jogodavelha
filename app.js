// CARREGAMENTO DE MÓDULOS

const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')

app = express()

// CONFIGURAÇÕES

// Express (comandos em substituição ao body-parser)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Handlebars
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Public
app.use(express.static(path.join(__dirname,"public")))

// ROTAS
app.get('/', (req, res) => {
    return res.render('index', {layout: 'main'});
})

// SERVIDOR
//const PORT = 8081
const PORT = process.env.PORT || 8081 //código para rodar no Heroku
app.listen(PORT, () => {
    console.log("Servidor rodando na porta: "+PORT);
})

//const app=require('express')
const main = require('../app/controllers/main')
require('../app/controllers/pp')

function routes(app)
{
    app.get('/',main().home)
    app.get('/reg',main().reg)
    app.post('/reg',main().regpost)

    app.get('/login',main().login)
    app.post('/login',main().postLogin)
    app.get('/login',main().logout)

    app.get('/list',main().list)
    app.get('/:id',main().edit)
    app.get('/delete/:id',main().delete)
}

module.exports = routes


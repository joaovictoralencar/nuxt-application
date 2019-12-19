import express from '../server/index'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
    //ao fazer um POST na página /login
    if (req.body.username === 'demo' && req.body.password === 'demo') { //define o único usuário demo
        req.session.authUser = { username: 'demo' } //define que ele é um usuário autenticado no store
        return res.json({ username: 'demo' }) //retorna como resposta justamente o usuário
    }
    res.status(401).json({ message: 'Bad credentials' }) // caso o usuário não exista
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
    //ao fazer um POST na página /logout
    delete req.session.authUser //deleta o usuário autenticado no store
    res.json({ ok: true })// reporta ok
})

// Export the server middleware
export default {
    path: '/api',
    handler: router
}

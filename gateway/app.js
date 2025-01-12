const express = require('express')
const expressProxy = require('express-http-proxy')

const app = express()


app.use('/user', expressProxy('http://user-service.m321.svc.cluster.local:3001'))
app.use('/captain', expressProxy('http://captain-service.m321.svc.cluster.local:3002'))
app.use('/ride', expressProxy('http://ride-service.m321.svc.cluster.local:3003'))


app.listen(3000, () => {
    console.log('Gateway server listening on port 3000')
})
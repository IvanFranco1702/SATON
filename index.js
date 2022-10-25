const express = require('express')

const app = express()

app.use(cors())

app.use('/api/hola',require('./routes/ruta'))

app.use( express.static('public') );

app.listen(4000 ,()=>{
    console.log('el servidor esta corriendo')
})


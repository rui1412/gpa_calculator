const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const axios = require('axios')

const connectDB = require('./server/database/connection')
const controller = require('./server/controller/controller')

const app = express()
dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))
connectDB() //mongodb connection


//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//view engine
app.set("view engine", "ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.get('/', (req, res) => {
    //get all courses
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index',{course:response.data});
        })
        .catch(err=>{
            res.send(err);
        })
})

//API
app.post('/api/users', controller.create)
app.get('/api/users', controller.find)
app.put('/api/users/:id', controller.update)
app.delete('/api/users', controller.delete)

app.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)})
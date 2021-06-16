const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app=express()

// Define Path for Express Config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname , '../templates/partial')

// Setup handlebar engine aand views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Neel Shah'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:"Don't Worry we are here to help",
        name:'Neel Shah'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Neel Shah'
    })
})

app.get( '/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error:' Please Provide an Address'
        })
    }
    geocode( req.query.address , (error , { latitude ,longitude , location } = {} )=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
    name:'Neel Shah',
    title:'Error 404',
    errorMessage: 'Help Article Not Found'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
    name:'Neel Shah',
    title:'Error 404',
    errorMessage: 'Page Not Found'
    })
})

app.listen(3000,() => {
    console.log('Listening on 3000')
})
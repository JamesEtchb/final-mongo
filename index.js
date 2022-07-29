import { MongoClient } from "mongodb"
import { uri } from './secret.js'
import express from 'express'
import cors from 'cors'

const client = new MongoClient(uri)
const db = client.db('final-mongo')
const rubs = db.collection('rubs')
const sauces = db.collection('sauces')

const app = express()
const PORT = 4002

app.use(express.json())
app.use(cors())

app.post('/addtorub', (req, res) => {
    const adding = req.body
    rubs.insertOne(adding, (err, results) => {
        if (err) {
            res.status(500).json({error: true})
        } else {
            res.status(201).json(results)
        }
    })
    
})

app.post('/addtosauces', (req, res) => {
    const adding = req.body
    sauces.insertOne(adding, (err, results) => {
        if (err) {
            res.status(500).json({error: true})
        } else {
            res.status(201).json(results)
        }
    })
    
})







app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
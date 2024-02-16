const fs = require('fs')
const express = require('express')
const path = require('path')

//initialize express
const app = express();

//get a variable for our path
const jsonPath = path.join(__dirname, 'public', 'pokedex.json')

let pokedex

//read our file
fs.readFile(jsonPath, (err, data) => {
    if(err) {
        console.log(err.message)
    }else {
        pokedex = JSON.parse(data)
    }
})

//return our json file to our requestor
app.get('/', (req, resp) => {
    resp.json(pokedex)
})

//pokemon by number
app.get('/pokemon/number/:number', (req, resp) => {
    const pokenum = req.params.number
    const pokemon = pokedex.filter(pokemon => {
        return pokemon.id == pokenum
    })
    resp.json(pokemon)
})

app.get('/pokemon/spattack/:spattack', (req, resp) => {
    const spattack = req.params.spattack
    const pokemon = pokedex.filter(pokemon => {
        return pokemon.base["Sp. Attack"] > spattack
    })
    resp.json(pokemon)
})

let port = process.env.PORT || 8080

app.listen(port, () => {
    console.log("Server running at port= " + port)
})


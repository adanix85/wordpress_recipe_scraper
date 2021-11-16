const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const { html } = require('cheerio/lib/api/manipulation');
const { response } = require('express');
const express = require('express');

const app = express()

// 'npm run start' to initiate express server on PORT

const url = 'https://www.tammileetips.com/crock-pot-gumbo-recipe/'

axios(url)
// JS promise response
    .then(response => {
        const html = response.data        
        const item = cheerio.load(html)
        const recipes = []
//search here for html element class 
        item('.wprm-recipe-ingredient', html).each(function() {
            const ingredients = item(this).text()            
            // server response to JS object
            recipes.push({
                ingredients
            })

        })

        item('.wprm-recipe-instruction-text', html).each(function() {
            const recipeInstructions = item(this).text()
            recipes.push({
                recipeInstructions
            })
        })

        console.log(recipes)
// error log
    }).catch(err => console.log(err))

    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
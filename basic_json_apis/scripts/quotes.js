

const quoteTag = document.querySelector("h1")
const authorTag = document.querySelector("p")
const randomTag = document.querySelector("footer img")
const bodyTag = document.querySelector("body")


// select HTML tags to fill with data
const getQuote = function () {
    if(data.length > 0) {
        // Get random quotes
        const randomNumber = Math.floor(Math.random() * data.length)
        const randomQuote = data[randomNumber]
        quoteTag.innerHTML = "&ldquo; " + randomQuote.quote + " &rdquo;"
        authorTag.innerHTML = "&mdash; " + randomQuote.author

        if (randomQuote.quote.length > 100) {
            quoteTag.classList.add("long")
        } else {
            quoteTag.classList.remove("long")
        }
    }
}

// // get local json data
// let data = []
// fetch("/data/quotes.json").then(response =>
//     response.json()
// ).then(jsonData => {
//     data = jsonData
//     // get initial quote
//     getQuote()
// })

// get external json data
let data = []
fetch("http://localhost:3000/data/quotes.json").then(response =>
    response.json()
).then(jsonData => {
    data = jsonData
    // get initial quote
    getQuote()
})

// get new quote on button press
randomTag.addEventListener("click", function() {
    getQuote()
}) 
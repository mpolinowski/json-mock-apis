const quoteTag = document.querySelector("h1")
const authorTag = document.querySelector("p")


// select HTML tags to fill with data
const getQuote = function () {
    fetch("/data/quote.json")
        .then(response => response.json())
        .then(jsonData => {
            quoteTag.innerHTML = "&ldquo; " + jsonData.quote + " &rdquo;"
            authorTag.innerHTML = "&mdash; " + jsonData.author
        })
}

// get data on page load
getQuote()
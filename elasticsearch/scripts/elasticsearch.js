const titleTag = document.querySelector("main h1")
const abstractTag = document.querySelector("main p")


// select HTML tags to fill with data
const getResults = function () {
    if(data.hits.length > 0) {
        // Get random search result
        const randomNumber = Math.floor(Math.random() * data.hits.length)
        const randomResult = data.hits[randomNumber]
        titleTag.innerHTML = randomResult.title
        abstractTag.innerHTML = randomResult.abstract

        if (randomResult.abstract.length > 100) {
            abstractTag.classList.abstract("long")
        } else {
            abstractTag.classList.remove("long")
        }
    }
}

// get elasticsearch json data
let data = []
fetch("http://localhost:8080/data/es.json").then(response =>
    response.json()
).then(jsonData => {
    data = jsonData
    // process search results
    getResults()
})
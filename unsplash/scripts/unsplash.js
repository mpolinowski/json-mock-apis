const apiUrl = "http://localhost:3000/search/photos/unsplash.json?page=1&per_page=4"
const accessKey = "iuy398ifelfli3ugrsgjpeitoeprgkmlsk2bsdmlsdkg" 

const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultTag = document.querySelector("section.results")

// get search results from api
const searchUnsplash = function(term) {
    console.log(term)
    // fetch data from query with auth headers
    return fetch(apiUrl + term, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    })
        .then(response => response.json())
        .then(jsonData => {
            // extract results and cleanUp
            return jsonData.results.map(results => {
                return {
                    imageSrc: results.urls.regular,
                    background: (results.color || "aliceblue"),
                    width: results.width,
                    height: results.height,
                    username: results.user.username,
                    description: (results.description || "Untitled"),
                    download: results.links.download
                }
            })
        })
}

// process results
const processResults = function(results) {
    // remove loading placeholders
    resultTag.innerHTML = ""
    // loop through results and add to page
    results.forEach(result => {
        resultTag.innerHTML = resultTag.innerHTML + `
            <div class="result_card">
                <div class="image" style="background-color: ${result.background};">
                    <img src="${result.imageSrc}" />
                </div>
                <h2>@${result.username}</h2>
                <p>${result.description}</p>
                <p><a href="${result.download}">Unsplash</a>: Source Image: ${result.width} by ${result.height} pixel.</p>
            </div>
        `
    })
}

// use input to search unsplash
formTag.addEventListener("submit", function(event){
    // get search term
    const searchTerm = inputTag.value
    // get search results and forward to processing
    searchUnsplash(searchTerm).then(results => {
        processResults(results)
    })
    //stop form from loading next page
    event.preventDefault()
})
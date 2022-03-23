// build fetch url for contentful
const baseURL = "http://localhost:3000"
const spaceID = "pvk91asdexs7"
const environmentID = "master"
const accessToken = "87yhwgihrtug475yirugwpjwergj495igry"
const url = `${baseURL}/spaces/${spaceID}/environments/${environmentID}/entries.json?${accessToken}`
// get main section to add entires
const sectionTag = document.querySelector("section")


const fetchContent = function() {
    return fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            // get assets from jsonData for image url
            // images are in a different block and
            // need to be matched by ID to entry
            const assets = jsonData.includes.Assets
            console.log(assets)
            // extract entries from response
            return jsonData.items.map(item => {
                // get image ID from entry
                const imageId = item.fields.image.sys.id
                // get assets block with matching image ID
                const imageBlock = assets.find(asset => {
                    return asset.sys.id == imageId
                })
                //if match get image url
                if (imageBlock) {
                    imgUrl = imageBlock.fields.file.url
                }
                item.fields.image = imgUrl
                return item.fields
            })
        })
}

// fetch data on load
fetchContent()
    .then(data =>{
        console.log(data)

        // remove loader
        sectionTag.innerHTML = ""

        data.forEach(item => {
            sectionTag.innerHTML = sectionTag.innerHTML + `
            
            <div class="item">
                <img src=${item.image} />
                <div class="title">
                    <h3>${item.title}</h3>
                    <p>${item.price}</p>
                </div>
                <p>${item.description}</p>
            </div>
            
            `
        })
})

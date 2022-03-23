// Figma API
const apiUrl = "http://localhost:3000/v1"
const projectID = "jhgfp9348HIUHikfwer"
const apiAccessToken = "3453-234235-124322-32wafc-234sd-vgr6755gdvf"
const apiHeaders = {
    headers: {
        "X-Figma-Token": apiAccessToken
    }
}

// HTML Tags
const sliderTag = document.querySelector("main div.slider")
const loadingTag = document.querySelector('header p.loading')
const nextTag = document.querySelector('footer a.next')
const previousTag = document.querySelector('footer a.previous')
const stepsTag = document.querySelector('footer span.steps')

let currentSlide = 0
let totalSlides = 0

// get content json data from figma
const loadFile = function(key) {
    return fetch(apiUrl + '/files/' + key + '/figma.json', apiHeaders)
    .then(response => response.json())
    .then(data => {

        const ids = data.document.children[0].children.map(frame => {
            return frame.id

        })

        return {
            // export project title to name slide set
            title: data.name,
            // export key to re-use for loading images
            key: key,
            ids: ids
        }
    })
}

// get image frame IDs
const loadImages = function(obj) {
    const key = obj.key
    const ids = obj.ids.join(',')

    console.log(obj.ids)
    console.log(apiUrl + '/images/' + key + '/figma.json' + '?ids=' + ids, apiHeaders)

    return fetch(apiUrl + '/images/' + key + '/figma.json' + '?ids=' + ids, apiHeaders)
        .then(response => response.json())

        .then(jsonData => {
            return obj.ids.map(id => {
                console.log(jsonData)
                return jsonData.images[id]
            })
    })
}

// add images to page
const processImages = function(urls) {
    // get main tag and clear it
    console.log(urls)
    // clear out main canvas
    sliderTag.innerHTML = ""
    totalSlides = urls.length
    // loop over images and add to main
    urls.forEach(url => {
        sliderTag.innerHTML = sliderTag.innerHTML + `
            <div>
                <img src='${url}' />
            </div>
        `
    })
}

// call functions onLoad
loadFile(projectID)
    .then(frames => {
        // replace loading... with project name
        loadingTag.innerHTML = frames.title
        document.title = frames.title
        return frames
    })
    .then(frames => loadImages(frames))
    .then(imageUrls => processImages(imageUrls))


// slider events
const next = function() {
    currentSlide = currentSlide + 1
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0
    }
    moveSlider()
}

const previous = function() {
    currentSlide = currentSlide - 1
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1
    }
    moveSlider()
}

const moveSlider = function() {
    sliderTag.style.transform = `translate(${currentSlide * -100}vw, 0)`
    stepsTag.innerHTML = `${currentSlide + 1} / ${totalSlides}`
}


nextTag.addEventListener('click', function() {
    next()
})


previousTag.addEventListener('click', function() {
    previous()
})


















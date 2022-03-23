const url = "http://localhost:3000/data/btc_value.json"

const priceTag = document.querySelector("main h1")
const navLinks = document.querySelectorAll("nav a")
const spanTag = document.querySelector("main p span")

let currency = "USD"
// set span tag to selected currency
spanTag.innerHTML = currency

// get coindesk json data
const checkPrice = function () {
    fetch(url).then(response =>
        response.json()
    ).then(jsonData => {
            priceTag.innerHTML = jsonData.bpi[currency].rate_float.toFixed(1)
    })
}

// get price on page load and every 60s
checkPrice()

setInterval(function() {
    checkPrice()
}, 60000)

// add click event to currency nav

navLinks.forEach(link => {
    link.addEventListener("click", function() {
        currency = this.getAttribute("data-currency")
        // update to new currency
        checkPrice()

        // remove highlight from all navs
        navLinks.forEach(link => link.classList.remove("selected"))
        
        // highlight selected currency
        this.classList.add("selected")

        // update currency in span tag
        spanTag.innerHTML = currency
    })
}) 
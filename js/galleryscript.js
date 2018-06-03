/*GALLERY SCRIPT*/
let page = 1;
let lookingForData = false;

function fetchGallery() {
    lookingForData = true;

    let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");

    let endpoint = "http://tomasgazi.com/wordpress/wp-json/wp/v2/gallery?_embed&per_page=9&page=" + page
    if (catid) { // DRY
        endpoint = "http://tomasgazi.com/wordpress/wp-json/wp/v2/gallery?_embed&per_page=9&page=" + page + "&categories=" + catid
    }
    fetch(endpoint)
        .then(e => e.json())
        .then(showGallery);
}

function showGallery(data) {
    console.log(data);
    lookingForData = false;
    data.forEach(showSinglePhoto)
}

function showSinglePhoto(aPhoto) {
    console.log(aPhoto);
    let template = document.querySelector("#galtemp").content;
    let clone = template.cloneNode(true);
    clone.querySelector("img").setAttribute("src", aPhoto._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url);
    let galposts = document.querySelector("#galposts");
    galposts.appendChild(clone);

}

fetchGallery();

setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        page++;
        fetchGallery();
    }
}, 1000)


function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

let page = 1;
let lookingForData = false;

function fetchBlog() {
    lookingForData = true;
    fetch("http://tomasgazi.com/wordpress/wp-json/wp/v2/blog?_embed&per_page=4&page=" + page)
        .then(e => e.json())
        .then(showBlog)
}

function showBlog(data) {
    console.log(data);
    lookingForData = false;
    data.forEach(showSinglePost)
}

function showSinglePost(aPost) {
    console.log(aPost);
    let template = document.querySelector("#blogtemp").content;
    let clone = template.cloneNode(true);
    clone.querySelector("h1").innerHTML = aPost.title.rendered;
    clone.querySelector("img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url);
    let blogposts = document.querySelector("#blogposts");
    clone.querySelector('.readmore').href = "subpage.html?id=" + aPost.id;
    blogposts.appendChild(clone);

}

fetchBlog();

setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        page++;
        fetchBlog();
    }
}, 100)


function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


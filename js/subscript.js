let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

fetch("http://tomasgazi.com/wordpress/wp-json/wp/v2/blog/" + id + "?_embed")
    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(aPost) {
    console.log(aPost);
    let singlePost = document.querySelector("#singlePost");
    document.querySelector("h1").textContent = aPost.title.rendered;
    document.querySelector(".desc").innerHTML = aPost.content.rendered;
    document.querySelector(".subimage").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url);
}

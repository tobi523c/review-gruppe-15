let albums;
let filter = "alle";
let filterpop = "";
let filterrock = "";
let filterjazz = "";
let filterhiphop = "";
let filterEdm = "";
const popop = document.querySelector("#popop");

document.addEventListener("DOMContentLoaded", loadJSON)

async function loadJSON() {
    const JSONData = await fetch("https://spreadsheets.google.com/feeds/list/1BGsWxPo26S0q3MziijrBCP8GVN1qP2hOO3wCT_hygCk/od6/public/values?alt=json");
    albums = await JSONData.json();
    addEventListenersToButtons();
    visAlbums();

}

function visAlbums() {

    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector(".loopview");
    listPointer.innerHTML = "";
    albums.feed.entry.forEach(album => {
        if (filter == "alle" || filterpop == album.gsx$genre.$t.toLowerCase() || filterrock == album.gsx$genre.$t.toLowerCase() || filterjazz == album.gsx$genre.$t.toLowerCase() || filterhiphop == album.gsx$genre.$t.toLowerCase() || filterEdm == album.gsx$genre.$t.toLowerCase()) {
            console.log(album);
            const klon = templatePointer.cloneNode(true).content;
            klon.querySelector(".navn").textContent = album.gsx$navn.$t;
            klon.querySelector(".genre").textContent = album.gsx$genre.$t;
            klon.querySelector(".kunstner").textContent = album.gsx$kunstner.$t;

            klon.querySelector("img").src = album.gsx$billede.$t;

            klon.querySelector("article").addEventListener("click", () => visDetaljer(album))



            listPointer.appendChild(klon);
        }
    })


}

function visDetaljer(album) {
    popop.style.display = "block";
    popop.querySelector(".navn_popop").textContent = album.gsx$navn.$t;
    popop.querySelector(".beskrivelse").textContent = album.gsx$beskrivelse.$t;
    popop.querySelector(".genre").textContent = album.gsx$genre.$t;
    popop.querySelector(".kunstner").textContent = album.gsx$kunstner.$t;

    popop.querySelector("img").src = album.gsx$billede.$t;



}

document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");



function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);


        console.log(filter)

    });


}

function filterBTNs() {
    filter = this.dataset.genre;

    this.classList.toggle("valgt");

    document.querySelector("#filter-alle").classList.remove("valgt");
    console.log(filter)


    if (this.dataset.genre == "pop") {
        if (filterpop == "") {

            filterpop = "pop";

        } else {
            filterpop = "";
        }
    } else if (this.dataset.genre == "rock") {
        if (filterrock == "") {
            filterrock = "rock";

        } else {
            filterrock = "";
        }
    } else if (this.dataset.genre == "jazz") {
        if (filterjazz == "") {
            filterjazz = "jazz";

        } else {
            filterjazz = "";
        }
    } else if (this.dataset.genre == "edm") {
        if (filterEdm == "") {
            filterEdm = "edm";

        } else {
            filterEdm = "";
        }
    } else if (this.dataset.genre == "hip-hop") {
        if (filterhiphop == "") {
            filterhiphop = "hip-hop";

        } else {
            filterhiphop = "";
        }

    }



    visAlbums();


}

let albums;
let filterår = "alle";
let filter = "alle";
let filterpop = "";
let filterrock = "";
let filterjazz = "";
let filterhiphop = "";
let filterEdm = "";
let filter1980 = "";
let filter1990 = "";
let filter2000 = "";
let filter2010 = "";
let filter2020 = "";
const popop = document.querySelector("#popop");
const kategoriOpen = document.querySelector(".kategori");

document.addEventListener("DOMContentLoaded", loadJSON)

async function loadJSON() {
    const JSONData = await fetch("https://spreadsheets.google.com/feeds/list/1BGsWxPo26S0q3MziijrBCP8GVN1qP2hOO3wCT_hygCk/od6/public/values?alt=json");
    albums = await JSONData.json();
    addEventListenersToButtons();
    addEventListenersToButtons2();
    visAlbums();

}

function visAlbums() {

    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector(".loopview");
    listPointer.innerHTML = "";
    albums.feed.entry.forEach(album => {
        if ((filter == "alle" || filterpop == album.gsx$genre.$t.toLowerCase() || filterrock == album.gsx$genre.$t.toLowerCase() || filterjazz == album.gsx$genre.$t.toLowerCase() || filterhiphop == album.gsx$genre.$t.toLowerCase() || filterEdm == album.gsx$genre.$t.toLowerCase()) && (filterår == "alle" || filter1980 == album.gsx$årstal.$t.toLowerCase() || filter1990 == album.gsx$årstal.$t.toLowerCase() || filter2000 == album.gsx$årstal.$t.toLowerCase() || filter2010 == album.gsx$årstal.$t.toLowerCase() || filter2020 == album.gsx$årstal.$t.toLowerCase())) {
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

function addEventListenersToButtons2() {
    document.querySelectorAll(".filterår").forEach((btn) => {
        btn.addEventListener("click", filterBTNs2);


        console.log(filterår)

    });


}

function filterBTNs() {
    filter = this.dataset.genre;


    this.classList.toggle("valgt");


    console.log(filter)


    if (this.dataset.genre == "pop") {
        if (filterpop == "") {
            document.querySelector("#filter-alle").classList.remove("valgt");
            filterpop = "pop";

        } else {
            filterpop = "";
        }
    } else if (this.dataset.genre == "rock") {
        if (filterrock == "") {
            document.querySelector("#filter-alle").classList.remove("valgt");
            filterrock = "rock";

        } else {
            filterrock = "";
        }
    } else if (this.dataset.genre == "jazz") {
        if (filterjazz == "") {
            document.querySelector("#filter-alle").classList.remove("valgt");
            filterjazz = "jazz";

        } else {
            filterjazz = "";
        }
    } else if (this.dataset.genre == "edm") {
        if (filterEdm == "") {
            document.querySelector("#filter-alle").classList.remove("valgt");
            filterEdm = "edm";

        } else {
            filterEdm = "";
        }
    } else if (this.dataset.genre == "hip-hop") {
        if (filterhiphop == "") {
            document.querySelector("#filter-alle").classList.remove("valgt");
            filterhiphop = "hip-hop";

        } else {
            filterhiphop = "";
        }

    }

    visAlbums();


}


function filterBTNs2() {
    filterår = this.dataset.årstal;
    console.log("filterBTNs2")


    this.classList.toggle("valgt");




    // Her starter årstal-filter

    if (this.dataset.årstal == "1980") {
        if (filter1980 == "") {

            filter1980 = "1980";

        } else {
            filter1980 = "";
        }
    } else if (this.dataset.årstal == "1990") {
        if (filter1990 == "") {
            filter1990 = "1990";
        } else {
            filter1990 = "";
        }
    } else if (this.dataset.årstal == "2000") {
        if (filter2000 == "") {
            filter2000 = "2000";
        } else {
            filter2000 = "";
        }
    } else if (this.dataset.årstal == "2010") {
        if (filter2010 == "") {
            filter2010 = "2010";
        } else {
            filter2010 = "";
        }
    } else if (this.dataset.årstal == "2020") {
        if (filter2020 == "") {
            filter2020 = "2020";
        } else {
            filter2020 = "";
        }
    }




    visAlbums();


}








document.querySelector(".pil_menu_open").addEventListener("click", openKategori);



function openKategori() {
    console.log("openKategori");

    document.querySelector("#mellem1").classList.toggle("display_filter")
    document.querySelector("#mellem2").classList.toggle("display_filter")
    document.querySelector("#mellem3").classList.toggle("display_filter")
    document.querySelector("#kategori_alle").classList.toggle("display_filter")
    document.querySelector("#kategori_alle1").classList.toggle("display_filter")
    document.querySelector("#kategori_alle2").classList.toggle("display_filter")
    document.querySelector(".pil_menu_open").classList.toggle("rotete")



}

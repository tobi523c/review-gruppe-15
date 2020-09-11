let retter;
let filter = "alle"
const popop = document.querySelector("#popop");
document.addEventListener("DOMContentLoaded", loadJSON)


async function loadJSON() {
    const loadJSON = await fetch("https://spreadsheets.google.com/feeds/list/1BGsWxPo26S0q3MziijrBCP8GVN1qP2hOO3wCT_hygCk/od6/public/values?alt=json")
    retter = await loadJSON.json();
    addEventListenerToButtons();
    visRetter();
}

function visRetter() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector(".loopview");
    listPointer.innerHTML = "";
    retter.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {

            const klon = templatePointer.cloneNode(true).content;
            klon.querySelector(".navn").textContent = ret.gsx$navn.$t;
            klon.querySelector(".genre").textContent = ret.gsx$genre.$t;
            klon.querySelector(".kunstner").textContent = ret.gsx$kunstner.$t;



            klon.querySelector("img").src = ret.gsx$billede.$t;




            klon.querySelector("article").addEventListener("click", () => visDetaljer(ret))

            listPointer.appendChild(klon);
        }
    })
}


function visDetaljer(ret) {
    popop.style.display = "block";
    popop.querySelector("h2").textContent = ret.gsx$navn.$t;
    popop.querySelector(".lang").textContent = ret.gsx$lang.$t;
    popop.querySelector(".oprindelse").textContent = ret.gsx$oprindelse.$t;
    popop.querySelector(".pris").textContent = ret.gsx$pris.$t + "kr";

    popop.querySelector("img").src = "imgs/large/" + ret.gsx$billede.$t + ".jpg";





}

document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");





function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h2").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");

    })
    this.classList.add("valgt");
    visRetter();
}

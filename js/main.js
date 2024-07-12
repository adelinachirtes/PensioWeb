import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

document.addEventListener('DOMContentLoaded', function() {
    var sideMenuButton = document.getElementById("side-menu-toggle");
    if (sideMenuButton) {
        sideMenuButton.onclick = show;
    }

    

    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var images = document.querySelectorAll(".gallery img");
    var currentIndex;

    if (modal && modalImg && images.length > 0) {
        images.forEach((img, index) => {
            img.onclick = function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                currentIndex = index;
            }
        });

        var span2 = document.getElementsByClassName("close")[0];
        if (span2) {
            span2.onclick = function() {
                modal.style.display = "none";
            }
        }

        var prev = document.getElementsByClassName("prev")[0];
        var next = document.getElementsByClassName("next")[0];

        if (prev) {
            prev.onclick = function() {
                currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
                modalImg.src = images[currentIndex].src;
            }
        }

        if (next) {
            next.onclick = function() {
                currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
                modalImg.src = images[currentIndex].src;
            }
        }
    }
});

function show() {
    document.getElementById("side-menu").classList.toggle("show");
}

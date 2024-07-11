function show(){
    document.getElementById("side-menu").classList.toggle("show")
    
}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        height: 'auto',
        contentHeight: 'auto',
        events: [
            {
                title: 'Rezervat',
                start: '2024-07-15',
                end: '2024-07-18'
            },
            {
                title: 'Rezervat',
                start: '2024-08-06',
                end: '2024-08-08'
            },
            {
                title: 'Rezervat',
                start: '2024-07-20',
                end: '2024-07-22'
            }
        ],
        selectAllow: function(selectInfo) {
            var now = new Date();
            // Normalize time parts to start of day for comparison
            now.setHours(0, 0, 0, 0);
            return selectInfo.start >= now;
        },
        select: function(info) {
            var events = calendar.getEvents();
            var existingEvent = null;

            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                if (info.start < event.end && info.end > event.start) {
                    existingEvent = event;
                    break;
                }
            }

            if (existingEvent) {
                existingEvent.remove();
            } else {
                calendar.addEvent({
                    title: 'Rezervat',
                    start: info.startStr,
                    end: info.endStr
                });
            }

            calendar.unselect();
        }
    });

    calendar.render();
});




// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');

//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         events: [
//             {
//                 title: 'Rezervat',
//                 start: '2024-07-15',
//                 end: '2024-07-18'
//             },
//             {
//                 title: 'Rezervat',
//                 start: '2024-08-06',
//                 end: '2024-08-08'
//             },
//             {
//                 title: 'Rezervat',
//                 start: '2024-07-20',
//                 end: '2024-07-22'
//             }
//         ]
//     });

//     calendar.render();
// });






// document.querySelector(".contact-form form").addEventListener("submit", function(e) {
//     e.preventDefault();
    
//     var formData = new FormData(this);

//     fetch('../php/send_email.php', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         if (response.ok) {
//             alert("Mesajul a fost trimis cu succes.");
//             this.reset();
//         } else {
//             return response.text().then(text => { throw new Error(text) });
//         }
//     })
//     .catch(error => {
//         alert("A apărut o problemă la trimiterea mesajului: " + error.message);
//     });
// });



var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var images = document.querySelectorAll(".gallery img");
var currentIndex;

images.forEach((img, index) => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        currentIndex = index;
    }
});

var span = document.getElementsByClassName("close")[0];
span.onclick = function() { 
    modal.style.display = "none";
}

var prev = document.getElementsByClassName("prev")[0];
var next = document.getElementsByClassName("next")[0];

prev.onclick = function() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    modalImg.src = images[currentIndex].src;
}

next.onclick = function() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    modalImg.src = images[currentIndex].src;
}
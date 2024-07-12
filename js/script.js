import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
//import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
//import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  push,
  remove,
  query,
  equalTo,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";



 const firebaseConfig = {
     apiKey: "AIzaSyDqk1nLdLqzsFg3_W_iS6ODpprR0ZCbRkY",
     authDomain: "pensioweb.firebaseapp.com",
     databaseURL: "https://pensioweb-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "pensioweb",
     storageBucket: "pensioweb.appspot.com",
     messagingSenderId: "542268812244",
     appId: "1:542268812244:web:368d845fabc412e7a50441",
     measurementId: "G-13S94ERMNR"
 };

 const app = initializeApp(firebaseConfig);

 const db = getDatabase(app);

 document.getElementById("submit").addEventListener("click", function (e) {
   e.preventDefault();
   set(ref(db, "user/" + document.getElementById("nume").value), {
     nume: document.getElementById("nume").value,
     email: document.getElementById("email").value,
     mesaj: document.getElementById("mesaj").value,
     start_date: document.getElementById("start_date").value,
     end_date: document.getElementById("end_date").value,
   });

   document.querySelector(".alert").style.display = "block";
   
   setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);
 });



 document.addEventListener('DOMContentLoaded', function(){
  var calendarEl = document.getElementById('calendar');
    if (calendarEl) {
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

                var endDate = new Date(info.end);
                endDate.setDate(endDate.getDate() - 1);
                var endDateStr = endDate.toISOString().split('T')[0];

                if (existingEvent) {
                    existingEvent.remove();
                }
                else {
                    calendar.addEvent({
                        title: 'Rezervat',
                        start: info.startStr,
                        end: info.endStr
                    });
                }

                document.getElementById('start_date').value = info.startStr;
                document.getElementById('end_date').value = info.endStr;

                calendar.unselect();
            }
        });

        calendar.render();
        
        function loadReservations() {
            const reservationsRef = ref(db, 'user');
            get(reservationsRef).then((snapshot) => {
                console.log(snapshot);
                if (snapshot.exists()) {
                    console.log('Snapshot exists:', snapshot.val());
                    const reservations = snapshot.val();
                    for (const key in reservations) {
                        console.log('Reservation key:', key);
                        const reservation = reservations[key];
                        console.log('Reservation:', reservation);
                        const start = reservation.start_date;
                        const end = reservation.end_date;
                        console.log('Start date:', start, 'End date:', end);
                        calendar.addEvent({
                            title: 'Rezervat',
                            start: start,
                            end: end,
                            color: 'red' // Opțional, pentru a marca evenimentele diferit
                        });
                    }
                } else {
                    console.log('No data available in snapshot.');
                }
            }).catch(error => {
                console.error('Error retrieving data:', error);
            });
        }
        
        loadReservations();
    }
 });
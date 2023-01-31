(function(){
    //https://www.google.cl/maps/@-32.967291,-71.5440427,15z

    const lat = -33.4525756; // 20.67444163271174;
    const lng = -70.6184675; // -103.38739216304566;
    const map = L.map('map-start').setView([lat, lng ], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);    

})()
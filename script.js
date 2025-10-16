const ipAddress = document.getElementById('ip-address');
const locationDiv = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');



document.addEventListener('DOMContentLoaded', async function(){
    try{
        //we're requesting the api using the fetch function which inspects the url,
        //await keyword pauses the function and waits ffor the response from the api to 
        //come back to us to be used
        const response = await fetch ('https://geo.ipify.org/api/v2/country,city?apiKey=at_eXFIkij3E8EOA8KMaghXnuXDiTaL3');
            //ok property returns boolean true if we got a response and vice versa
            // if we dont get a response that is ok then we throw a new error
            //error class is a more advanced javascript way to show errors
        if(!response.ok ) {
            throw new Error('failed to fetch the data')
        }
        //parsing the data that was sent by the api 
        //data = obj
        const data = await response.json()
        //updating ipaddress div with the data we got back from the api
        ipAddress.textContent = `IP Address ${data.ip}`
        locationDiv.textContent = `Location ${data.location.city} ${data.location.region} ${data.location.postalCode}`
        timezone.textContent = `Timezone UTC- ${data.location.timezone}`
        isp.textContent = `ISP- ${data.isp}`
        console.log(data);

    } catch(error) {
        console.error(error.message);
    }
});

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
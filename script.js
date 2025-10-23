const ipAddress = document.getElementById('ip-address');
const locationDiv = document.getElementById('location');
const timezoneDiv = document.getElementById('timezone');
const isp = document.getElementById('isp');
const mapDiv = document.getElementById('map');
const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

const map = L.map(mapDiv)


searchBtn.addEventListener('click', async function(){
    try{
        const response = await fetch (`https://geo.ipify.org/api/v2/country,city?apiKey=at_j3vyWp88clcBzGJjqqU2mwBiSvhx5&ipAddress=${searchInput.value}`); 

        const data = await response.json()
       console.log(data);

       updateUI(data);
    } catch(error) {
        console.error(error.message);
    }
});



document.addEventListener('DOMContentLoaded', async function(){
    try{
        //we're requesting the api using the fetch function which inspects the url,
        //await keyword pauses the function and waits ffor the response from the api to 
        //come back to us to be used
        const response = await fetch ('https://geo.ipify.org/api/v2/country,city?apiKey=at_j3vyWp88clcBzGJjqqU2mwBiSvhx5');
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
        updateUI(data);
    } catch(error) {
        console.error(error.message);
    }

});

function updateUI(data){

     ipAddress.textContent = `IP Address ${data.ip}`
        locationDiv.textContent = `Location ${data.location.city} 
        ${data.location.region} 
        ${data.location.postalCode}`
        timezoneDiv.textContent = `Timezone UTC- ${data.location.timezone}`
        isp.textContent = `ISP- ${data.isp}`
        console.log(data);

   map.setView(
      [data.location.lat, data.location.lng],
      13,
    );

    const marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
   

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    marker.bindPopup("<b>Here you are!</b><br>Location!").openPopup();

}
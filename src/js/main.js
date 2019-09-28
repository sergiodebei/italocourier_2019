{/* <span class="temperature-degree">34</span>
var temperatureDegree = document.querySelector('.temperature-degree');
temperatureDegree.textContent = '13'; */}

function setRain(){
    colorsky = "#4a7994";
    $("body").addClass("raining");
    for (i = 0; i <= 100; i++){
        $(".rain-wrapper").append("<div class='rain rain-" + i + "'></div>");
    }
    $(".lightning").addClass('flashit');
}

function isHome(){
    return document.body.classList.contains('page-home');
}

// if( isHome() ) {
    window.addEventListener("load", 
        function(){ 
            var long = 4.7846749;
            var lat = 52.4127875;

            // var options = {
            //     enableHighAccuracy: true,
            //     timeout: 5000,
            //     maximumAge: 0
            // };
            
            // function success(pos) {
            //     var crd = pos.coords;
            //     console.log(crd);
            // }
            
            // function error(err) {
            // }

            // if(navigator.geolocation) {
            //     navigator.geolocation.getCurrentPosition(success, error, options);
            // }

            var proxy = "https://cors-anywhere.herokuapp.com/";
            var api = proxy + 'https://api.darksky.net/forecast/51f1f9da9836124aa7303ee8ee2daa24/' + lat + ',' + long;
                
            fetch(api)
                .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function(data) {
                        // console.log(data);
                        if(data.daily.icon == 'rain'){
                            setRain();
                        }
                    });
                }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });

    });
// }
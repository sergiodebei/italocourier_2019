$(document).ready(function() {

    var colorsky = "#1a8bcb";

    $(this).scrollTop(0);

    var hours = (new Date()).getHours();
    if(hours < 6 || hours >= 19){
        colorsky = "#1d4e69";
        $("body").addClass("night");
        for (i = 0; i < 100; i++){
            $('.stars-wrapper').append("<div class='stars s" + i +"'></div>");
        }
    }else{
        $("body").removeClass("night");
    }
    
    function initMap() {
        var myLatLng = {lat: 52.4127875, lng: 4.7846749};
        var map = new google.maps.Map(document.getElementById('map'), {
            scrollwheel: false,
            scaleControl: false,
            draggable: false,
            center: myLatLng,
            zoom: 12,
            disableDefaultUI: true,
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f3f3ee"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": colorsky
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }]
        });
    
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Click for info',
    /*        animation: google.maps.Animation.DROP,*/
            icon: {
                url: templateUrl + '/assets/img/map_icon.png',
                anchor: new google.maps.Point(75,50),
                size: new google.maps.Size(130,100)
            }
        });
    
        google.maps.event.addListener(map, 'zoom_changed', function() {
            marker.setIcon(icon);
        });
    
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    
        var popup = new google.maps.InfoWindow({
            content: '<h1><strong>Italo Express Courier</strong></h1>Penningweg 112C <br />1507 DH Zaandam<br />Netherlands',
            maxWidth: 300
        });
    
        google.maps.event.addListener(marker, "click", function() {
            // console.log('click');
            popup.open(map, marker);
        });
    
        google.maps.event.addListener(popup, "closeclick", function() {
          //  map.panTo(center);
        });
    
    }

    // INIT
    if ($('body').hasClass('page-home')) initMap();

    $('.toggle_menu').click(function() {
        // console.log('click');
        $(this).toggleClass('active');
        $('.magic').toggleClass('active');
    });

    $('.nav-item > a').click(function() {
        // console.log('remove');
        $('.magic').removeClass('active');
    });

});

$(window).scroll(function(){
    if($(this).scrollTop() > 200) {
        $(".auto-scroll-to-top").addClass("visible");
    } else {
        $(".auto-scroll-to-top").removeClass("visible");
    }
});

$(".auto-scroll-to-top").click(function(){
    $("html, body").animate({scrollTop: 0}, 600);
});




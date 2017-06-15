
//Caches script from the get script
$.ajaxSetup( {
    cache: true
});



function setHeader( xhr ) {

    xhr.setRequestHeader( 'Access-Control-Allow-Origin' );
}

$.get( "/googleMapsApiKey", function ( googleMapsApiKey ) {


    var googleMapsApiScript = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;

    $.getScript( googleMapsApiScript, function ( data, textStatus, jqxhr ) {
        console.log( "Google maps script loaded" );
        var myData;
        //$.ajax( {

        //    url: `https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=${googleMapsApiKey}`,
        //    data: myData,
        //    type: 'GET',
        //    crossDomain: true,
        //    dataType: 'jsonp',
        //    success: function (data) { console.log( "Success", data ); },
        //    error: function (data) { console.log( "Failed", data ); },
        //    beforeSend: setHeader
        //});




        //$.get( `https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=${googleMapsApiKey}`, function( data ){
        //    console.log( data );

        //})

    });


});


var uluru = { lat: -25.363, lng: 131.044 };
var sydney = { lat: -33.868937, lng: 151.207788 };

function initMap() {

    var map = new google.maps.Map( document.getElementById( 'map' ), {
        zoom: 4,
        center: uluru
    });

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    directionsDisplay.setMap( map );
    calculateAndDisplayRoute( directionsService, directionsDisplay );




    var uluruMarker = new google.maps.Marker( {
        position: uluru,
        map: map
    });
    var sydneyMarker = new google.maps.Marker( {
        position: sydney,
        map: map
    });


}

function calculateAndDisplayRoute( directionsService, directionsDisplay ) {
    var selectedMode = "DRIVING"
    directionsService.route( {
        origin: uluru,  // Haight.
        destination: sydney,  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
    }, function ( response, status ) {
        if ( status == 'OK' ) {
            directionsDisplay.setDirections( response );
        } else {
            window.alert( 'Directions request failed due to ' + status );
        }
    });
}

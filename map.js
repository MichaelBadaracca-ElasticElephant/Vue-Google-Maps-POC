
//Caches script from the get script
$.ajaxSetup( {
    cache: true
});

$.get( "/googleMapsApiScript", function ( googleMapsApiScript ) {
    $.getScript( googleMapsApiScript, function ( data, textStatus, jqxhr ) {
        console.log( "Google maps script loaded" );
    });
});

function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    var sydney = { lat: -33.868937, lng: 151.207788 };
    var map = new google.maps.Map( document.getElementById( 'map' ), {
        zoom: 4,
        center: uluru
    });
    var uluruMarker = new google.maps.Marker( {
        position: uluru,
        map: map
    });
    var sydneyMarker = new google.maps.Marker( {
        position: sydney,
        map: map
    });


}

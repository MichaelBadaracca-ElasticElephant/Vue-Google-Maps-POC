var mainAppVm = new Vue( {
    el: '#app',
    data: {
        test: "TEST",
        startLat: -25.363,
        startLng: 131.044,
        directionsDisplay: null,
        directionsService: null,  
    },


    computed: {
        mapLocations: function () {
            //this.initMap()
            return {
                uluru: { lat: this.startLat, lng: this.startLng },
                sydney: { lat: -33.868937, lng: 151.207788 },
                brisbane: { lat: -27.465970, lng: 153.027510 },
                wayPoints: [{ location: "Brisbane, Queensland", stopover: true },
                { location: new google.maps.LatLng( - 24.990553, 151.954581 ), stopover: true }, { location: "Bundaberg, Queensland", stopover: true }]
            }
        },
        map: function () {
            console.log("map recomputed")
            return new google.maps.Map( document.getElementById( 'map' ), {
                zoom: 4,
                center: this.mapLocations.uluru
            });
        },
        uluruMarker: function () {
            return new google.maps.Marker( {
                position: this.mapLocations.mapLocationsuluru,
                map: this.map
            })
        },
        sydneyMarker: function () {
            return new google.maps.Marker( {
                position: this.mapLocations.sydney,
                map: this.map
            })
        },
        brisbaneMarker: function () {
            return new google.maps.Marker( {
                position: this.mapLocations.brisbane,
                map: this.map
            })
        }

    },
    watch: {
        // whenever question changes, this function will run
        mapLocations: function () {
            this.drawMap();
        }
    },
    methods: {

        getMapScript: function () {
            this.$http.get( "/googleMapsApiKey", function ( googleMapsApiKey ) {
                var googleMapsApiScript = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=mainAppVm.initMap`;
                $.getScript( googleMapsApiScript, function ( data, textStatus, jqxhr ) {
                    console.log( "Google maps script loaded" );
                });
            });
        },
        //refreshMap: function () {
        //    google.maps.event.trigger( this.map, 'resize' );
        //},

        initMap: function () {

            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay.setMap( this.map );
            this.drawMap();
        },

        drawMap: function () {
            this.calculateAndDisplayRoute( this.directionsService, this.directionsDisplay, this.mapLocations );
        },

        calculateAndDisplayRoute: function ( directionsService, directionsDisplay, mapLocations ) {
            var selectedMode = "DRIVING"
            directionsService.route( {
                origin: mapLocations.uluru,
                destination: mapLocations.sydney,
                waypoints: mapLocations.wayPoints,
                optimizeWaypoints: false,
                travelMode: google.maps.TravelMode[selectedMode]
            }, function ( response, status ) {
                if ( status == 'OK' ) {
                    directionsDisplay.setDirections( response );
                } else {
                    window.alert( 'Directions request failed due to ' + status );
                }
            });
        }
    }
})


// Caches script from the get script
$.ajaxSetup( {
    cache: true
});


var express = require( 'express' )
var secrets = require( "./secrets.js" );
var app = express()

app.use(express.static('./'))

//The Google Maps script is loaded from the server to keep the API key out of source control and not easily revealed on the client side
app.get( "/googleMapsApiScript", function ( req, res ) {
    var googleMapsScriptUrlWithApiKey = secrets.googleMapsScriptUrlWithApiKey;
    res.status( 200 );
    res.send( googleMapsScriptUrlWithApiKey );
});

app.listen( 3000 );


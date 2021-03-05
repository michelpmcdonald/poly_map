mapboxgl.accessToken = '';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    center: [-105.295517, 40.013245],
    zoom: 15
});

var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            polygon: true,  
            trash: true
        },
        styles: [
            // ACTIVE (being drawn)
            // line stroke
            {
                "id": "gl-draw-line",
                "type": "line",
                "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                "layout": {
                "line-cap": "round",
                "line-join": "round"
                },
                "paint": {
                "line-color": "#D20C0C",
                "line-dasharray": [0.2, 2],
                "line-width": 2
                }
            },
            // polygon fill
            {
            "id": "gl-draw-polygon-fill",
            "type": "fill",
            "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            "paint": {
                "fill-color": "#D20C0C",
                "fill-outline-color": "#D20C0C",
                "fill-opacity": 0.5
            }
            },
            // polygon outline stroke
            // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
            {
            "id": "gl-draw-polygon-stroke-active",
            "type": "line",
            "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#D20C0C",
                "line-dasharray": [0.2, 2],
                "line-width": 2
            }
            },
            // vertex point halos
            {
            "id": "gl-draw-polygon-and-line-vertex-halo-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
                "circle-radius": 5,
                "circle-color": "#FFF"
            }
            },
            // vertex points
            {
            "id": "gl-draw-polygon-and-line-vertex-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
                "circle-radius": 3,
                "circle-color": "#D20C0C",
            }
            },

            // INACTIVE (static, already drawn)
            // line stroke
            {
                "id": "gl-draw-line-static",
                "type": "line",
                "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
                "layout": {
                "line-cap": "round",
                "line-join": "round"
                },
                "paint": {
                "line-color": "#000",
                "line-width": 5
                }
            },
            // polygon fill
            {
            "id": "gl-draw-polygon-fill-static",
            "type": "fill",
            "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
            "paint": {
                "fill-color": "#000",
                "fill-outline-color": "#000",
                "fill-opacity": 1
            }
            },
            // polygon outline
            {
            "id": "gl-draw-polygon-stroke-static",
            "type": "line",
            "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#000",
                "line-width": 10
            }
            }
        ],
});
map.addControl(draw);

map.on('draw.create', createPoly);

function createPoly(e) {
    console.log(e.features.length);
    console.log();
    
    // for now, just create first added feature, not sure if there ever could
    // be more than 1, research
    if(e.features.length == 1) {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", '/api/v1/crop_polygons');
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(e.features[0]));

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                alert('upload successful!');
                //getData(datasetId);
            } 
            else if (xmlhttp.readyState == 4 && xmlhttp.status !== 200){
                alert('looks like something went wrong');
            }
        }
    }
}

map.on('draw.delete', deletePoly);
function deletePoly(e) {
}

map.on('draw.update', updatePoly);
function updatePoly(e) {
}


map.on('load', function() {
    
    // add source and layer  for topo vectors
    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
    });
    map.addLayer({
        'id': 'contours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'contour',
        'layout': {
            // make layer visible by default
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#FF7043',
            'line-width': 2
        }
    });
    
    // Fetch crop polys and add them to draw tool layer
    var request = new XMLHttpRequest();
    //request.open('GET', 'http://0.0.0.0:3000/api/v1/crop_polygons.json', true);
    request.open('GET', '/api/v1/crop_polygons', true);
    request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        // retrieve the JSON from the response
        console.log(this.response);
        var json = JSON.parse(this.response);
        console.log(json);
        draw.set(json);
    }};
    request.send();

    // add Crop polygon layers
    //map.addSource('some id', {
    //    type: 'geojson',
    //    data: 'http://0.0.0.0:3000/api/v1/crop_polygons.json'
    //});
    
    /*map.addLayer({
        'id': 'some id',
        'type': 'fill',
        'source': 'some id',
        'layout': {},
        'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }
    });*/
    //draw.set(map.getSource('some id')._data);

    
});
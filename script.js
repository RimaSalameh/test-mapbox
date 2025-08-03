mapboxgl.accessToken = "pk.eyJ1IjoiZnJhbmNpc2RvbW9udGUiLCJhIjoiY21kcHV1YzA4MGpsYjJtczN4dGZuMDd1OCJ9.NiFtYtbyn-pDeakZkkF-zg ";

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.5, 54],
    zoom:4.2,
})

function generatePopupHTML(props) {
    const rows = Object.entries(props).map(([key, val]) => {
        return `<div><strong>${key}:</strong> ${val}</div>`;
    });
    return rows.join('');
}

map.on('load', () => {
    map.addSource('mrcs', {
        type: 'geojson',
        data:'qc_mrcs2.geojson',
    });


    map.addLayer({
        id: 'mrcs-layer',
        type: 'fill',
        source: 'mrcs',
        paint: {
          'fill-color': '#BE398D',
          'fill-opacity': 0.5
        }
    });

    map.on('click', 'mrcs-layer', (e) => {
        const props = e.features[0].properties;
        const name = props.NOM_MRC || 'MRC';
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`<strong>${name}</strong><br/>${generatePopupHTML(props)}`)
          .addTo(map);
    });
    
    map.on('mouseenter', 'mrcs-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'mrcs-layer', () => {
        map.getCanvas().style.cursor = '';
    });
    
})
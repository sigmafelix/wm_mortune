// Navigation (layer on-off control
// setting ids and labels for nav buttons
var toggleableLayerIds = ['UE-rc1', 'UE-rc2', 'UE-rc3'];
var toggleableLayerLabels = ['The first recession (1992)',
                             'The second recession (2002)',
                             'The Great Recession (2010)'];


// adding contents to nav buttons using for-statement
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    var labeler = toggleableLayerLabels[i];
    
    // add a in nav
    var link = document.createElement('a');
    link.href = '#';
    link.className = 'visible';
    // text content as the layerlabel
    link.textContent = labeler;
    // its actual link as the layerid
    link.label = id;

    // to toggle click
    link.onclick = function (e) {
        var clickedLayer = this.label;
        e.preventDefault();
        e.stopPropagation();

        // make the visibility retrieved from clickedLayer as a variable 
        var visibility = ueMap.getLayoutProperty(clickedLayer, 'visibility');

        // if the clicked layer is with the status 'visible'
        if (visibility === 'visible') {
            // set visibility as 'none'
            ueMap.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            // else set visibility as 'visible'
            this.className = 'active';
            ueMap.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    // finally, add the 'a' element to nav
    var layers = document.getElementById('layerlist');
    layers.appendChild(link);
}

  

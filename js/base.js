function countyTitle(e){
    thisCounty = e.features[0];
    document.getElementById('countytitle').innerHTML = thisCounty.properties.STCNTYN;

};


function makeJson(e, ds, dis) {
    thisCounty = e.features[0];

    var ds1 = ['UE1991', 'UE1992', 'UE1993', 'UE1994', 'UE1995',
                'UE1996', 'UE1997', 'UE1998', 'UE1999', 'UE2000',
                'UE2001', 'UE2002', 'UE2003', 'UE2004', 'UE2005',
                'UE2006', 'UE2007', 'UE2008', 'UE2009', 'UE2010',
                'UE2011', 'UE2012', 'UE2013', 'UE2014'];

    var ds2 = ds;

    var de = [];
    var dd = [];
    var years = [];
    for (i = 0; i < ds1.length; i++) {
        dd.push(thisCounty.properties[ds1[i]]);
    };
    for (i = 0; i < ds2.length; i++) {
        de.push(thisCounty.properties[ds2[i]]);
    };
    for (var i = 1991; i <= 2014; i++) {
        years.push(i);
    }
    var ues = {
        'x': years,
        'y': dd,
        'name': "Unemployment rate",
        'type': "scatter"
    };
    var cds = {
        'x': years,
        'y': de,
        'yaxis': 'y2',
        'name': "Mortality rate",
        'type': "scatter"
    };
    var myJSON = JSON.parse(JSON.stringify(ues));
    var myJSON2 = JSON.parse(JSON.stringify(cds));

    var layout = {
        title: null,
        font: {
            family: "Fjalla One, sans-serif"  
        },
        xaxis: {
            tickfont: {
                color: 'rgb(255, 255, 255)'
            }  
        },
        yaxis: {
            nticks: 5,
            title: 'Unemployment rate (%)',
            titlefont: {
                color: 'rgb(255, 255, 255)'
            },
            tickfont: {
                color: 'rgb(255, 255, 255)'
            },
        },
        yaxis2: {
            nticks: 5,
            title: dis + ' mortality rate (per 100k)',
            titlefont: {
                color: 'rgb(255, 255, 255)'
            },
            tickfont: {
                color: 'rgb(255, 255, 255)'
            },
            overlaying: 'y',
            side: 'right'
        },
        width: 400,
        legend: {
            x: 0,
            y: 1.2,
            font: {
                color: 'rgb(255, 255, 255)'
            }
        },
        plot_bgcolor: "#0003",
        paper_bgcolor: "#0003"
    };

    Plotly.newPlot('plotmenu', [myJSON, myJSON2], layout);
    //return myJSON, myJSON2

};


function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

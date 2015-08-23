var currentLocation = "Dublin, IE";
var education = {
    "schools": [
        {
            "name": "FATEC - Senac RS",
            "degree": "Higher Level",
            "dates": "2013",
            "city": "Porto Alegre, RS, Brazil",
            "major": "Ver o que colocar aqui"
        }
    ],
    "onlineCourses": [
        {
            "title": "Front-End Web Developer Nanodeegree",
            "school": "Nanodeegree",
            "dates": "2015",
            "url": "https://www.udacity.com"
        },
        {
            "title": "Learn how to learn",
            "school": "Coursera",
            "dates": 2015,
            "url": "http://www.coursera.com"
        }
    ]
};

var work = {
    "jobs": [
        {
            "employer": "Xetec LTDa",
            "title": "Software Developer",
            "dates": "December 2013 until now",
            "location": "Bray, IE",
            "description": "Work as a Back-End and Front-End on a small team, doing several taks."
        },
        {
            "employer": "Terra.com",
            "title": "Web Developer",
            "dates": "March 2012 until August 2013",
            "location": "Porto Alegre, RS, Brazil",
            "description": "Worked on several teams and different fronts, such as special pages for the London Olympics, and UX CMS migration standardization for Spain, calendar pages of sports, new pages of videos portal Terra."
        },
        {
            "employer": "Procergs",
            "title": "Software Developer",
            "dates": "January 2012 until April 2012",
            "location": "Porto Alegre, RS, Brazil",
            "description": "Worked with Java EE and Oracle on a ERP."
        },
        {
            "employer": "Cia Salux",
            "title": "Software Developer",
            "dates": "January 2011 until January 2012",
            "location": "Porto Alegre, RS, Brazil",
            "description": "Worked with Powerbuilder and Oracle on a ERP for Hospitals."
        },
        {
            "employer": "Cia Star4",
            "title": "Software Developer",
            "dates": "June 2010 until January 2011",
            "location": "Taquara, RS, Brazil",
            "description": "Worked with Javascript and Php on a ERP for the footwear market."
        }
    ]
};


var map;

function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  function locationFinder() {
    var locations = [];

    locations.push(currentLocation);

    for (var school in education.schools) {
      locations.push(education.schools[school].city);
    }

    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  function createMapMarker(placeData) {
    var lat = placeData.geometry.location.lat();
    var lon = placeData.geometry.location.lng();
    var name = placeData.formatted_address;
    var bounds = window.mapBounds;

    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map,marker);
      map.setZoom(8);
      map.setCenter(marker.getPosition());
    });

    bounds.extend(new google.maps.LatLng(lat, lon));
    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  function pinPoster(locations) {
    var service = new google.maps.places.PlacesService(map);

    for (var place in locations) {
      var request = {
        query: locations[place]
      };

      service.textSearch(request, callback);
    }
  }

  window.mapBounds = new google.maps.LatLngBounds();
  locations = locationFinder();
  pinPoster(locations);

}
window.addEventListener('load', initializeMap);

window.addEventListener('resize', function(e) {
  map.fitBounds(mapBounds);
});

$(document).on("ready",function(){
	
	var contenido = $("#contenido");
	var panelMapa = $("#panelMapa");
	var buton	  = $("#enviar");
	var btnatras  = $("#btnatras");
	
	contenido.slideDown(500);
	
	var butonMapa = $("#btnmostrarmapa");
	
	butonMapa.on("click",function(){
		contenido.slideUp();
		panelMapa.slideDown(1000,function(){
			actualizaGeo();
		});
		
	});
	btnatras.on("click",function(){
		contenido.slideDown(500);
		panelMapa.slideUp(500);	
	});
	
	
	buton	  = $("#enviar").on("click",function(){
		$(location).attr('href', 'menu.html');	
	});
	
	
});

function mostrarMapaInicio(lat,longi){
	var map,geoPos,mapOptions,marker;

	geoPos = new google.maps.LatLng(lat,longi);

  	mapOptions = {
	    zoom: 14,
	    center: geoPos,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
	
	map = new google.maps.Map(document.getElementById('mapaInicio'),mapOptions);
  	
	marker = new google.maps.Marker({
		map:map,
		draggable:true,
		animation: google.maps.Animation.DROP,
		position: geoPos
  	    });

}


var onSuccess = function(position) {
	var lat = position.coords.latitude;
	var lonGi = position.coords.longitude;
	var alt = position.coords.altitude;
	//alert(lat+" "+lonGi);
	google.maps.event.addDomListener(window, 'load', mostrarMapaInicio(lat,lonGi));
	
};

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function actualizaGeo(){
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}





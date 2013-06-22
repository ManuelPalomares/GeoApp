$(document).on("ready",function(){
	var contenido = $("#contenido");
	var contactos = $("#contactos");
	var btnContactos = $("#btnContactos");
	var buscarContacto= $("#buscarContacto");
	var btntouch	= $("#touch");
	
	contenido.slideDown(500);
	
	btnContactos.on("click",function(){
		contenido.slideUp(500);
		contactos.slideDown(500);	
	});
	
	btntouch.on("click",function(){
		$(location).attr('href', 'touchEvents.html').show(100);
	});
		
	
	buscarContacto.on("click",buscarContactos);
	
	/*Touch Scrooll*/
	touchScroll("listadoContactos");
});

function cargarContactos(contacts){
	
	var tpl = "<div class=\"fila\"><div class=\"filaleft\"><img src={photo} onerror=\"this.src='css/img/icons/fotoContact.png'\" width=\"80%\" height=\"100%\" id=\"imgContact\"></div><div class=\"filarigth\"><div class=\"filatitulo\">{name}</div><div class=\"filasubTitulo\"></div></div></div>";
	var photo = "css/img/icons/fotoContact.png";
	
	var listadoContactos = $("#listadoContactos");
	//limpia contactos
	listadoContactos.html("");
	
	for(var i =0 ; i <= contacts.length; i++ ){
		if(contacts[i].displayName !=null){
			
			var tpl1 = tpl;
			
			var nombre 		 = contacts[i].displayName;
			var photoContact = contacts[i].photos[0].value;
			var id			 = contacts[i].id;		
			var phones 	     = [];
			
			
			
			//carga nombre
			tpl1 = tpl1.replace("{name}",nombre);
			// Carga foto
			tpl1 = tpl1.replace("{photo}",photoContact);
			
			//agrega numero si tiene.
			/*for(var a = 0 ; a < contacts[i].phoneNumbers[a].length; a++){
				
					tpl1 = tpl1.replace("{phone}",contacts[i].phoneNumbers[a].value);
			}*/
			
						
			
			listadoContactos.append(tpl1);
		}
	}
}

function buscarContactos(){

	var texto = $("#texto").val();
	if(texto ==""){
		alert("Digita un nombre de Contacto ej: Manuel");
		return;
	}
	
	// find all contacts with 'Bob' in any name field
	var options = new ContactFindOptions();
	options.filter= texto;
	options.multiple=true; 
	var fields = ["displayName", "name","phoneNumbers","photos"];
	navigator.contacts.find(fields, cargarContactos, onErrorSearh, options);
}

function onErrorSearh(contactError) {
    alert('onError!');
};



function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        return true;
    }catch(e){
        return false;
    }
}

function touchScroll(id){
    if(isTouchDevice()){ //if touch events exist...
        var el=$("#"+id);
        //document.getElementById(id);
        var scrollStartPos=0;
        
     
       document.getElementById(id).addEventListener("touchstart", function(event) {
            scrollStartPos=this.scrollTop+event.touches[0].pageY;
            event.preventDefault();
        },false);
              
       
        document.getElementById(id).addEventListener("touchmove", function(event) {
            //this.scrollTop=scrollStartPos-event.touches[0].pageY;
            //event.preventDefault();
        	var scrollStartPosDown = scrollStartPos-event.touches[0].pageY;
        	
        	if(scrollStartPosDown < 0){
        		$("#listadoLoader").show(20);
        		$("#listadoLoader").animate({
        			width : "100"
        		},
        		100
        		);
        	}
        	
        	if(scrollStartPosDown > 0){
        		$("#listadoLoader").animate({
        			width : "0"
        		},
        		100
        		);
        	}
        	
        	
            $("#"+id).animate({
            		scrollTop : scrollStartPos-event.touches[0].pageY
            	},
            	50
            );
            
        },false);
        
        
        
}
} 
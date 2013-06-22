$(document).on("ready",function(){
	$("#contenido").show(20);
	
	objtoTouch("bola");
});


function objtoTouch(id){
	var content =  $("#"+id);
	var ancho 	=  parseInt(content.css("width"));
	var alto	=  parseInt(content.css("height"));
	
	console.log(ancho+" ____________"+alto);
	
	
	if(touchEvents){
		document.getElementById(id).addEventListener("touchstart",function(e){
			
			//console.log(ancho+" ____________"+alto);
			e.preventDefault();
	    	var touch = e.touches[0];
	    	content.css("background-color","rgba(0,200,0,0.8)");
			content.css("top",touch.pageY-(alto*1.8));
			content.css("left",touch.pageX-(ancho/1.7));
			 
		},false);
		
	   document.getElementById(id).addEventListener("touchend",function(e){
			e.preventDefault();
			content.css("background-color","white");
		},false);
	       
       document.getElementById(id).addEventListener("touchmove",function(e){
    	   e.preventDefault();
    	   var touch = e.touches[0];
    	   
    	   content.css("background-color","rgba(0,200,0,0.8)");
    	   content.css("top",touch.pageY-(alto*1.8));
			content.css("left",touch.pageX-(ancho/1.7));
			 
    	   console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);
    	   
       },false);
	}
}


function touchEvents(){
	try{
	    document.createEvent("TouchEvent");
	    return true;
	}catch(e){
	    return false;
	}
}
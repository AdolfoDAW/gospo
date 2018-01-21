$(document).ready(function(){
                                         //Latitud: 39.4271073   Longitud: -0.4118602  PAIPORTA
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

      console.log("Latitud: "+pos.lat+"Longitud: "+pos.lng);  
            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+pos.lat+","+pos.lng+"&key=AIzaSyBiTt0JoSwwww7v-t8xbt_40Ph6MvxeTMY",function(data){
                console.log(data.results);
                lastPos = data.results[0].address_components.length-1;
                //provincia = data.results[0].address_components[3].long_name;
                //console.log(provincia);
                
                codigopostal = data.results[0].address_components[lastPos].long_name;
                subcadena = codigopostal.substring(0,2);
                switch(subcadena){
                    case '46': provincia = "Valencia"; break;
                    case '03': provincia = "Alicante"; break;
                    case '12': provincia = "Castellon"; break; //sin tilde
                    default: alert("Provincia no registrada en el sistema");
                }
            });
      
          }, function() {
            
          });
        } else {
          // Browser doesn't support Geolocation
         alert("¡Error! Este navegador no soporta la Geolocalización.");
        }
      
     
    
/*
        function refrescarUbicacion() {	
	navigator.geolocation.watchPosition(mostrarUbicacion);
    }	
*/   
    resultados = "";
    
    $.ajax({
       
       url: 'model/seleccion/seleccion_deportes.php',
       dataType: 'json',
       success: function(deportesmoda){
           deportesmoda.forEach(n=>{
            
               resultados += '<div class="col-sm-6 col-md-4 col-lg-3 mt-4">'+
                                '<div id="'+n.id_deporte+'" class="card">'+
                                    '<img class="card-img-top" src="resources/img/Deportes/'+n.imagen+'" alt="'+n.nombre+'">'+
                                    '<div class="card-block"><h5 class="text-bold">'+n.nombre+'</h5></div>'+
                                '</div>'+
                            '</div>';
               
               
           });
           
           $('#deportes-moda').append(resultados);
       }
        
    });
    
    $('#deportes-moda').on('click','.card',function(){  //tiene que funcionar como si el user clicka en Buscar del formulario principal
        
        //alert("evento click");
        
        /* Llamada ajax para enviar coordenadas o ubicación al servidor y consultar*/
        deporteID = $(this).attr("id");
        //console.log(deporteID+" "+provincia);
        $.ajax({
            url: "model/seleccion/mostrar_centros_cerca.php",         
           // url: "model/seleccion/mostrar_centros_cerca.php?deporte="+deporteID+"&provincia="+provincia, 
            data: "deporte=" + deporteID + "&provincia=" + provincia,
            dataType: 'json',
            success: function(centros){
                    //TODO 
                    centros.forEach(n => {
                    console.log(n);
                    });
                    //window.location="model/seleccion/resultado_seleccion_deportes.php?deporte="+deporteID+"&provincia="+provincia;
                    window.location="layout/resultado_seleccion_deportes.php?deporte="+deporteID+"&provincia="+provincia;
                    
            }
            
        });
        
    });
    
    
});

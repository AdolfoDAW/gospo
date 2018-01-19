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
                console.log(data.results[0].address_components[3].long_name);
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
    resultado = "";
    
    $.ajax({
       
       url: 'model/seleccion/seleccion_deportes.php',
       dataType: 'json',
       success: function(deportesmoda){
           deportesmoda.forEach(n=>{
            
               resultado += '<div class="col-sm-6 col-md-4 col-lg-3 mt-4">'+
                                '<div id="'+n.id_deporte+'" class="card">'+
                                    '<img class="card-img-top" src="resources/img/Deportes/'+n.imagen+'" alt="'+n.nombre+'">'+
                                    '<div class="card-block"><h5 class="text-bold">'+n.nombre+'</h5></div>'+
                                '</div>'+
                            '</div>';
               
               
           });
           
           $('#deportes-moda').append(resultado);
       }
        
    });
    
    $('#deportes-moda').on('click','.card',function(){
        
        alert("evento click");
        
        /* Llamada ajax para enviar coordenadas o ubicación al servidor y consultar*/
        
        
        $.ajax({
                       
            url: 'model/seleccion/seleccion_deportes.php',
            dataType: 'json',
            success: function(array){
       //TODO          
            }
            
        });
        
    });
    
    
});

$(document).ready(function(){
    
    $.ajax({
        
       url: 'seleccion_deportes.php',
       dataType: 'json',
       success: function(deportesmoda){
           deportesmoda.foreach(n=>{
            
               resultado += "<li style='' class='deportes-moda-imagenes'><a><img src='"+n.imagen+"' alt='"+n.imagen+"de"+n.nombre+"'></img></a></li>";
               
               
           });
           
           $('#deportes-moda-imagenes').append(resultado);
       }
        
    });
    
    
    
    
});



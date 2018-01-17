$(document).ready(function(){
    
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
        
    })
    
    
});



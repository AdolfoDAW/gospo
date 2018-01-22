


$(document).ready(function () {
    articulos();
//    $(".carrito__item__boton").on("click", function () {
//        alert("funciono");
//    });

    $(".nav-item__carro").on("click", function () {

        var url = "";
        if (document.referrer === "http://localhost/gospo/index.html") {
            url = "url(\'../resources/img/Centros/olimpia.jpg\')";
        } else {
            url = "url(\'resources/img/Centros/olimpia.jpg\')";
        }

        var myvar = '<div class="contenedor__carrito">' + ' <div class="carrito__productos">';
        var precioFinal = 0;
        reservas.forEach(n => {
            myvar += '<div id="' + n.id + '"class="carrito__item">' +
                    ' <div class="carrito__item__imagen" style="background-image:' + url + ';" ></div>' +
                    ' <div class="carrito__valores">' +
                    '<div class="carrito__item__descripcion">' + n.direccion + '</div>' +
                    '<div class="carrito__item__horario"><strong>Horario inicio:</strong>' + n.hora + '<p><strong>Fecha</strong>' + n.fecha + '</p> </div>' +
                    '<div class="carrito__item__precio"><strong>Precio:</strong>' + n.precio + '€</div>' +
                    ' <div class="carrito__item__boton"><button type="button" class="boton__carrito--cancelar"><i class="fas fa-times-circle"></i></button></div></div></div></div>';
            precioFinal += n.precio;
        });

        myvar += '<div class="carrito__footer">' +
                '<div class="carrito__footer--precio-total"><strong>Precio Total: </strong><span id="carrito__precioTotal">' + precioFinal + ' €</span></div>' +
                '</div>' +
                '</div>';

        $("#carrito__contenido").html("");
        $("#carrito__contenido").append(myvar);


        // Carga de functiones en botones del carro  //

        $(".contenedor__carrito").ready(function () {
            $(".carrito__item__boton").on("click", function () {

                var id_padre = $(this).parent().parent().attr("id");

                for (var i = 0; i < reservas.length; i++) {
                    if (reservas[i].id == id_padre) {
                        reservas.splice(i, 1);
                    }
                }
                var reservaBorrar = document.getElementById(id_padre);
                reservaBorrar.parentNode.removeChild(reservaBorrar);
                precioTotal();
                articulos();
            });
            $("#boton__vaciar").on("click", function () {
                $("#carrito__contenido").html("");
                reservas = "";
            });
            $("#boton__reservar").on("click",function (){
                 $.ajax({
        url: 'model/cart/reservas.php',
        type: 'get',
        dataType: 'json',
        data: "value="+reservas,
        error: alert("no hace anda"),
        success:  function (reservado) {
            alert("si va");
        }
            
         
            });
            });
        });
    });

});

function articulos() {
var cantidad = reservas.length;
if (cantidad >=1){
$(".nav-item__carro__contador").text(cantidad);
}else{
    $(".nav-item__carro__contador").text("");
}
};

function precioTotal() {
    var total = 0;
    reservas.forEach(n => {
        total += n.precio;
    });
    $("#carrito__precioTotal").text(total + " €");

};


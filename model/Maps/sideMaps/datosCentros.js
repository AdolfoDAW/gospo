$(document).ready(function () {
    $.ajax({
        url: '../model/Maps/sideMaps/datosCentros.php',
        dataType: 'json',
        success: function (centros) {

            function rate(puntuacion) {

                var rate = Number.parseFloat(puntuacion);

                var resultado = '<i class="far fa-star"></i>' +
                        '<i class="far fa-star"></i>' +
                        '<i class="far fa-star"></i>' +
                        '<i class="far fa-star"></i>' +
                        '<i class="far fa-star"></i>';

                if (rate <= 1.4) {
                    var resultado = '<i class="fas fa-star"></i>' +
                            '<i class="far fa-star"></i>' +
                            '<i class="far fa-star"></i>' +
                            '<i class="far fa-star"></i>' +
                            '<i class="far fa-star"></i>';
                } else if (rate <= 2.4) {
                    var resultado = '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="far fa-star"></i>' +
                            '<i class="far fa-star"></i>' +
                            '<i class="far fa-star"></i>';
                } else if (rate <= 3.4) {
                    var resultado = '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="far fa-star"></i>' +
                            '<i class="far fa-star"></i>';
                } else if (rate <= 4.4) {
                    var resultado = '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="far fa-star"></i>';
                } else if (rate >= 4.5) {
                    var resultado = '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>' +
                            '<i class="fas fa-star"></i>';
                }
                return resultado;
            }

            var resultados = "";
            centros.forEach(n => {
                resultados = resultados + '<div class="item-card panel panel-default panel-horizontal">' +
                        '<div class="panel-body">' +
                        '<h5>' + n.nombre + '</h5>' +
                        '<h7>Dirección: ' + n.direccion + '</h7>' +
                        '<p> Tlf: ' + n.telefono + '</p>' +
                        '<p class="rate-stars">' + (n.media).substring(0, 3) + '<span>' + rate(n.media) + '</span>(' + n.votos + ')</p>' +
                        '</div>' +
                        '<div class="panel-footer"><img src="' + n.url_img + '"></div>' +
                        ' </div>';

            });
            $("#center-result").append(resultados);


            $('.sidebar').on('click', '.item-card', function () {

                $("#content_sidebar").empty("");
                $("#content_sidebar").append("<button id='volver-resultados-centros'>volver</button>");



                /*------ Funcion Volver ----------------*/
                $('#volver-resultados-centros').click(function () {
                    console.log(resultados);
                    $("#content_sidebar").empty("");
                    $("#content_sidebar").append('<h2 clas="conten_sidebar_title">Resultados</h2>' +
                            '<div><input type="search" class="form-control" id="input-search" placeholder="Filtrar..." >' +
                            '</div><!-- LAS TARJETAS DE BUSQUEDA -->' +
                            '<div id="center-result" class="searchable-container">' +
                            resultados +
                            '</div>');
                    $('#input-search').on('keyup', function () {
                        var rex = new RegExp($(this).val(), 'i');
                        $('.searchable-container .item-card').hide();
                        $('.searchable-container .item-card').filter(function () {
                            return rex.test($(this).text());
                        }).show();
                    });
                });

            });

        }
    });
});



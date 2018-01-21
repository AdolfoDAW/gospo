
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Gospo</title>
        <!-- FAVICON -->
        <link rel="icon" type="image/png" href="../resources/img/favicon.png" />
        <!-- Bootstrap core CSS -->
        <link href="../vendor/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <!-- Custom styles for this template -->
        <link href="../styles/css/half-slider.css" rel="stylesheet" type="text/css"/> 
        <!-- Jquery User Interface-->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <!-- Google Maps -->
        <link href="../styles/css/google_maps.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <!--Jquery and Jquery UI -->
        <script src="../vendor/jquery/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <!-- Bootstrap core JavaScript -->
        <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- Data picker -->
        <script src="../vendor/jquery/components/data_picker/data_picker.js" type="text/javascript"></script>
        <!-- Font Awesome -->
        <script src="../vendor/fontawesome-all.js" type="text/javascript"></script>
        <!-- Google Maps -->
        <?php 
        $deporte = $_GET["deporte"];
        $provincia = $_GET["provincia"];
        //print_r($deporte+" "+$provincia);
       // include '../model/seleccion/initMap_seleccion_markers.php?deporte='+$deporte+'&provincia'+$provincia; ?>
        <script>
                function initMap() {

                    var markadores = [];
                    var prev_infowindow;
                    var centrado = {lat: 39.478758, lng: -0.414405};
                    var positionSelected = "<?php echo($_GET["provincia"]);?>";
                    console.log("hola"+positionSelected);
                    console.log(centrado);
                            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+positionSelected+"&key=AIzaSyBiTt0JoSwwww7v-t8xbt_40Ph6MvxeTMY", function (data) {
                            centrado = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng};
                            var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 9,
                                center: centrado
                            });
                            //primera llamada
                            $.ajax({

                            url: '../model/seleccion/initMap_seleccion_markers.php',
                            data: "deporte="+<?php echo($_GET["deporte"]);?>+"&provincia="+"<?php echo($_GET["provincia"]);?>",  //si es String, se ponen comillas para tratarlo como string
                                    dataType: 'json',
                                    success: function (markers) {

                                    markers.forEach(n => {
                                //console.log(n);
                                    var posicion = new google.maps.LatLng(n.coordenada_x, n.coordenada_y);
                                            var infowindow = new google.maps.InfoWindow({
                                            content: "<h6>" + n.nombre + "</h6>"

                                                    });
                                            var marker = new google.maps.Marker({
                                            position: posicion,
                                                    map: map,
                                                    animation: google.maps.Animation.DROP,
                                                    _value: n.id_centro
                                                    });
                                            markadores.push(marker);
                                            //Esto asigna el bote
                                            marker.addListener('click', toggleBounce);
                                            function toggleBounce() {
                                            if (marker.getAnimation() !== null) {
                                            marker.setAnimation(null);
                                                    } else {
                                            marker.setAnimation(google.maps.Animation.BOUNCE);
                                                    }
                                            }
                                    marker.addListener('dblclick', function () {
                                    map.setZoom(14);
                                            map.setCenter(marker.getPosition());
                                            });
                                            google.maps.event.addListener(infowindow, 'closeclick', function () {
                                            marker.setAnimation(null);
                                                    });
                                            marker.addListener('click', function () {
                                            // Esto para el bote y hace zoom
                                            for (var i = 0; i < markadores.length; i++) {
                                            markadores[i].setAnimation(null);
                                                    infowindow.close(map, markadores[i]);
                                                    }
                                            toggleBounce(this);
                                                    // hasta aqui
                                                    //--- Close and open infowindow ----
                                                    if (prev_infowindow) {
                                            prev_infowindow.close();
                                                    }
                                            prev_infowindow = infowindow;
                                                    infowindow.open(map, marker);
                                                    //Hasta aquiS
                                                    var id = this._value;
                       
            ///////fumada ajax anidado
                                                //segunda llamada
                                                    $.ajax({
                                                    url: '../model/seleccion/seleccion_deportes_centro.php',
                                                            dataType: 'json',
                                                            data: "value=" + id + "&deporte=" + <?php echo($_GET["deporte"]);?> ,
                                                            success: function (seleccionado) {

                                                            seleccionado.forEach(n => {
                                                            var barraLateral = document.getElementById("center-result");
                                                                    barraLateral.innerHTML = "";
                                                                    var centro = document.createElement("div");
                                                                    var foto = document.createElement("img");
                                                                    var nombre = document.createElement("p");
                                                                    var horaApertura = document.createElement("p");
                                                                    var horaCierre = document.createElement("p");
                                                                    var direccion = document.createElement("p");
                                                                    var municipio = document.createElement("p");
                                                                    var provincia = document.createElement("p");
                                                                    var pais = document.createElement("p");
                                                                    centro.setAttribute("class", "centro" + n.id_centro);
                                                                    foto.src = n.img_url;
                                                                    nombre.textContent = n.nombre;
                                                                    horaApertura.textContent = "Hora de apertura: " + n.hora_apertura;
                                                                    horaCierre.textContent = "Hora de cierre: " + n.hora_cierre;
                                                                    direccion.textContent = "Calle :" + n.direccion;
                                                                    municipio.textContent = "Población :" + n.municipio;
                                                                    provincia.textContent = "Provincia: " + n.provincia;
                                                                    pais.textContent = "Pais: " + n.pais;
            //                                
                                                                    centro.appendChild(nombre);
                                                                    centro.appendChild(foto);
                                                                    centro.appendChild(horaApertura);
                                                                    centro.appendChild(horaCierre);
                                                                    centro.appendChild(direccion);
                                                                    centro.appendChild(municipio);
                                                                    centro.appendChild(provincia);
                                                                    centro.appendChild(pais);
                                                                    barraLateral.insertBefore(centro, barraLateral.childNodes[0]);
                                                                    }); //forEach
                                                                    }   //success
                                                    });   //Ajax2
            //////
                                                    });
                                           });
                                           }
                            });
                                    }
                            );
                }

</script>   
        <script async defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBiTt0JoSwwww7v-t8xbt_40Ph6MvxeTMY&callback=initMap">

        </script>

    <script type="text/javascript">  
        //equivalente a datosCentros.js
    $(document).ready(function () {
    $.ajax({
        url: '../model/seleccion/mostrar_centros_cerca.php',
        data: "deporte="+<?php echo($_GET["deporte"]);?>+"&provincia="+"<?php echo($_GET["provincia"]);?>",
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
                resultados = resultados + '<div id="' + n.id_centro + '" class="item-card panel panel-default panel-horizontal">' +
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

                var id = this.id;
                console.log(id);
                
                
                $.ajax({
                    url: '../model/seleccion/seleccion_deportes_centro.php',
                    dataType: 'json',
                    data: "value="+id+"&deporte="+<?php echo($_GET["deporte"]);?>,
                    success: function (seleccionado) {
                        console.log(seleccionado);
                       //TODO REVISAR RETORNO CONSULTA
                        seleccionado.forEach(n => {
                            
                            $("#content_sidebar").empty("");
                            if ($('.left_inner').resizable()) {
                                $('.left_inner').resizable('destroy');
                            }
                            $('.left_inner').width('550');

                            $("#content_sidebar").empty("");
                            $("#content_sidebar").append("<button id='volver-resultados-centros'>volver</button><div id='center-result'></div>");
                            /*------ Funcion Volver ----------------*/
                            $('#volver-resultados-centros').click(function () {
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

                            $("#center-result").append('<div class="container-center-result">' +
                                    '<section class="columna1"><img src="' + n.url_img + '"></section>' +
                                    '<section class="columna2"><p>' + n.nombre + '</p></section>' +
                                    '<section class="columna3"><hr>'
                                    + "<p><b>Apertura: </b>" + n.hora_apertura + "</p><hr>" +
                                    "<p><b>Cierre: </b>" + n.hora_cierre + "</p><hr>" +
                                    "<p><b>Dirección: </b>" + n.direccion + "</p><hr>" +
                                    "<p><b>Municipio: </b>" + n.municipio + "</p><hr>" +
                                    "<p><b>Provincia: </b>" + n.provincia + "</p><hr>" +
                                    '</section>' +
                                    '</div>');
                         
            }); 

        }
    });
}); //evento onclick

 }
    });
});

    </script>
        <!-- Effects-->
        <script src="../vendor/jquery/effects/slider.js" type="text/javascript"></script>

        <div class="container-grid">
            <div class="header">
                <!-- Navigation -->
                <nav class="navbar navbar-expand-lg navbar-dark bg-main-header-custom fixed-top">
                    <div class="container">
                        <div class="navbar-brand">
                            <a href="../index.html"><img src="../resources/img/logo-3.PNG" alt=""/></a>
                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" href="../index.html">Home
                                        <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="https://danialba96.wixsite.com/gospo">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Contact</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn btn-primary nav-login" href="#">Log In</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="sidebar left_inner">
                <!-- El div de arria existe exclusivamente para el posicionamiento del resizer-->
                <div id="content_sidebar">
                    <h2 clas="conten_sidebar_title">Resultados</h2>
                    <div>
                        <input type="search" class="form-control" id="input-search" placeholder="Filtrar..." >
                    </div>
                    <!-- LAS TARJETAS DE BUSQUEDA -->
                    <div id="center-result" class="searchable-container">

                    </div>
                </div>
            </div>
            <div class="map-container">
                <div id="map"></div>
            </div>
        </div>
        <script>
                    $('.left_inner').resizable();
                    $(function () {
                        $('#input-search').on('keyup', function () {
                            var rex = new RegExp($(this).val(), 'i');
                            $('.searchable-container .item-card').hide();
                            $('.searchable-container .item-card').filter(function () {
                                return rex.test($(this).text());
                            }).show();
                        });
                    });
        </script>

    </body>
</html>


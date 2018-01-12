function initMap() {

    var markadores = [];
    var prev_infowindow;
    var centrado = {lat: 39.478758, lng: -0.414405};
    console.log(centrado);
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=Alicante&key=AIzaSyBiTt0JoSwwww7v-t8xbt_40Ph6MvxeTMY", function (data) {
        centrado = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng};
        console.log(centrado);



        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: centrado
        });
        $.ajax({

            url: '../model/Maps/initMap.php',
            dataType: 'json',
            success: function (markers) {

                markers.forEach(n => {
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
                    /*Esto asigna el bote*/
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
                        /* Esto para el bote y hace zoom*/
                        for (var i = 0; i < markadores.length; i++) {
                            markadores[i].setAnimation(null);
                            infowindow.close(map, markadores[i]);
                        }
                        toggleBounce(this);
                        /* hasta aqui*/
                        /*--- Close and open infowindow ----*/
                        if (prev_infowindow) {
                            prev_infowindow.close();
                        }
                        prev_infowindow = infowindow;
                        infowindow.open(map, marker);
                        /* Hasta aqui*/
                        var id = this._value;

                        ///////fumada ajax anidado
                        $.ajax({
                            url: '../model/Maps/sideMaps/datosSeleccionado.php',
                            dataType: 'json',

                            data: "value=" + id,
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

                                });

                            }
                        });
                        //////
                    });

                });
            }
        });
    });

}




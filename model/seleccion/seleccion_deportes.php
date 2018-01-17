<?php

include '../DBA/DBA.php';

if($conection){
    $deportesmoda = [];
    $queryModa = $conection->query("SELECT d.nombre,d.imagen,d.id_deporte FROM deportes d WHERE d.id_deporte in (SELECT DISTINCT dpc.id_deporte FROM pistas_deporte_centro dpc ORDER BY puntuacion_total DESC) LIMIT 4");
    
    while($fila = $queryModa->fetch_array(MYSQLI_ASSOC)){
        array_push($deportesmoda,$fila);
        
    }
}

echo json_encode($deportesmoda);
?>

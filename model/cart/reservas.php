<?php
 
include '../DBA/DBA.php';

if ($conection) {
   
        echo $_GET["value"];
        echo $_POST["value"];
    
}
echo json_encode($conection);
?>
<?php

$nombre=$_POST['nombre'];
$telefono=$_POST['telefono'];
$email=$_POST['email'];
$fecha=$_POST['fecha'];
$msj=$_POST['especi'];

//datos para el correo

$destinatario = "kev47hobbie@gmail.com";
$asunto= "Citas veterinaria CloverVET.";

$carta= "De : $nombre \n";
$carta .="Correo: $email \n";
$carta .="Teléfono: $telefono \n";
$carta .="Fecha: $fecha \n";
$carta .="Especificación de la cita: $msj";

//enviar el msj

mail($destinatario,$asunto,$carta);

?>

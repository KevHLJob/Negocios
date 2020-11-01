const compra= new Carrito();
const listaCompra= document.querySelector('#lista-compra tbody');
const carrito=document.getElementById('carrito');
const ProcesarComprabtn= document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo= document.getElementById('correo');

cargareventos();
function cargareventos(){
    document.addEventListener('DOMContentLoaded', compra.LeerLSCompra());
carrito.addEventListener('click', (e)=>{compra.EliminarProducto(e)});

compra.CalcularTotal();

ProcesarComprabtn.addEventListener('click',ProcesarCompra);
}

function ProcesarCompra(e){
e.preventDefault();

if(compra.ObtenerProductosLocalStorage().length===0){
    Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: '¡No hay productos en la factura!',
        timer:2000,
        showConfirmButton: false
      }).then(function(){
          window.location="productos.html";
      })

}
else if(cliente.value==='' || correo.value===''){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Por favor completa los espacios requeridos.!',
        timer:2000,
        showConfirmButton: false
      })
}
else{
    const cargarGIF= document.querySelector('#cargando');
    cargarGIF.style.display='block';

    const  enviado = document.createElement('img');
    enviado.src='Imagenes/cargando.gif';
    enviado.style.display='block';
    enviado.width='150';

    setTimeout(()=> {
        cargarGIF.style.display='none';
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(()=>{
enviado.remove();
compra.VaciarLS();
window.location="productos.html";
        },2000);

    },3000);
}
}


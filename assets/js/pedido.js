
const carro= new Carrito();
const carrito=document.getElementById('carrito');
const productos= document.getElementById('lista-productos');
const listaProductos= document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn= document.getElementById('vaciar-carrito')
const procesarPedidobtn= document.getElementById('procesar-pedido');
cargarEventos();
function cargarEventos(){
    productos.addEventListener('click',(e)=>{carro.ComprarProducto(e)});

    carrito.addEventListener('click',(e)=>{carro.EliminarProducto(e)});

    vaciarCarritobtn.addEventListener('click', (e)=>{carro.VaciarCarrito(e)});

document.addEventListener('DOMContentLoaded', carro.LeerLS());

procesarPedidobtn.addEventListener('click',(e)=>{carro.procesarPedido(e)});
}


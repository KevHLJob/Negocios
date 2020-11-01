class Carrito{
    //añadir  el producto al carrito
    ComprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
const producto= e.target.parentElement.parentElement;
this.LeerDatosProducto(producto);

        }
    }

LeerDatosProducto(producto){
    const infoProducto ={
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id:producto.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
let productosLS;
productosLS=this.ObtenerProductosLocalStorage();
productosLS.forEach(function(productoLS){
if(productoLS.id===infoProducto.id){
    productosLS=productoLS.id;
}
});
if(productosLS===infoProducto.id){
    Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: '¡Su producto ya está agregado al carritos!',
        timer:1000,
        showConfirmButton: false
      })
    }
else{
    this.InsertarCarrito(infoProducto);
}
  
}
InsertarCarrito(producto){
    const row= document.createElement('tr');
    row.innerHTML=`
    <td>
        <img src="${producto.imagen}" width=100>
    </td>
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td> 

    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
    </td>

    
    `;
listaProductos.appendChild(row);
this.GuardarProductosLS(producto);
}

EliminarProducto(e){
    e.preventDefault();
    let producto, productoID;
    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        producto=e.target.parentElement.parentElement;
        productoID=producto.querySelector('a').getAttribute('data-id');

    }
    this.EliminarProductoLS(productoID);
    this.CalcularTotal();
}

VaciarCarrito(e){
    e.preventDefault();
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
    this.VaciarLS();
    return false;

}

GuardarProductosLS(producto){
let productos;
productos=this.ObtenerProductosLocalStorage();
productos.push(producto);
localStorage.setItem('productos', JSON.stringify(productos));
}

ObtenerProductosLocalStorage(){
    let productoLS;

    if(localStorage.getItem('productos')===null){
        productoLS=[];
    }
    else{
        productoLS= JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}

EliminarProductoLS(productoID){
let productosLS;
productosLS= this.ObtenerProductosLocalStorage();
productosLS.forEach(function(productoLS, index){
if(productoLS.id===productoID){
    productosLS.splice(index, 1);

}
    
});
localStorage.setItem('productos', JSON.stringify(productosLS));

}

LeerLS(){
    let productosLS;
    productosLS=this.ObtenerProductosLocalStorage();
    productosLS.forEach(function(producto){
        const row= document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td> 
    
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
    
        
        `;
    listaProductos.appendChild(row);
    });
}

VaciarLS(){
    localStorage.clear();
}


procesarPedido(e){
    e.preventDefault();
    if(this.ObtenerProductosLocalStorage().length===0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No tienes nada en el carrito, agrega algo!',
            timer:2000,
            showConfirmButton: false
          })
    }else{
        location.href="compra.html"; 
    }
   

}

LeerLSCompra(){
    let productosLS;
    productosLS=this.ObtenerProductosLocalStorage();
    productosLS.forEach(function(producto){
        const row= document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <input type ="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
        </td>
        <td>${producto.precio * producto.cantidad}</td>
        <td> 
    
        <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
        </td>
    
        
        `;
    listaCompra.appendChild(row);
    });
}

CalcularTotal(){
    let productoLS;
    let total=0 , subtotal=0 , igv=0;
    productoLS= this.ObtenerProductosLocalStorage();
    for(let i=0;i<productoLS.length; i++){
        let element= Number(productoLS[i].precio*productoLS[i].cantidad);
        total= total+element;

    }
    igv=parseFloat(total*0.13).toFixed(2);
    subtotal=parseFloat(total).toFixed(2);
    total=parseFloat(total).toFixed(2);
    
    document.getElementById('subtotal').innerHTML="C/. "+ subtotal;
    document.getElementById('igv').innerHTML="C/. "+ igv;
    
    document.getElementById('total').innerHTML="C/. "+total;
}
 

}

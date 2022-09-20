const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];


cargarEventListeners()
function cargarEventListeners(){
    //Cuando agregaas un curso presionando Agregar carrito
    listaCursos.addEventListener('click', agregarCurso);
    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito de cursos añadido
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
   
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const cusroSelecionado = e.target.parentElement.parentElement;
       leerDatosCurso(cusroSelecionado);

    }
}
//vacia el carrito 
function vaciarCarrito(e){

    if (e.target.classList.contains('button')) {
        articulosCarrito = [];
        localStorage.removeItem('carrito');
        limpiarHTML();
    }
}
//eliminar el curso
function eliminarCurso(e){
  if (e.target.classList.contains('borrar-curso')) {
      const cursoId = e.target.getAttribute('data-id');
      //elimina del arreglo de artiicculosCarrito por el data-id
      articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
     
      carritoHTML();//vvolvemos a iterar sobre carrito y mostrar el html
  }
}

//Lee el contenido del HTML al que le dimos clicks y extrae la informacion del curso

function leerDatosCurso(curso){
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        docente: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisar si un elemento ya existe en el curso
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    //si exite es igual a true ya viene un articulo y validamos y aumnetamos la cantidad al curso existente
       
    if (existe) {
         const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso;//retorna los objetos que no son actualizados
            }
         });
         articulosCarrito = [...cursos];
        }else{
            //arregla elementos al carrito
            articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();

}

//muestra el carrito de compras en el HTML
function carritoHTML(){

    //limpiar html
    limpiarHTML();
    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img  width="90" src="${imagen}" /></td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}">x</a></td>
          `;

          //Agrega el HTML al carrito en el body
          contenedorCarrito.appendChild(row);
    });

    //agrega al local storage
    sincronizarStorage();
}

function sincronizarStorage(){
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito))

}

//Elimina los cursos del table body
function limpiarHTML(){
    //contenedorCarrito.innerHTML = '';

    //otra forma mas rapida de limpiar el html
    while(contenedorCarrito.firstChild){
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


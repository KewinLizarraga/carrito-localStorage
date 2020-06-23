/** Variables */
const carrito = document.querySelector('#carrito')
const cursos = document.querySelector('#lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')

/** Event Listener */
cargarEventListener()

function cargarEventListener() {
  // Btn 'agregar al carrito'
  cursos.addEventListener('click', comprarCurso)
  // Btn 'eliminar uno del carrito'
  listaCursos.addEventListener('click', eliminarCurso)
}

/** Funciones */
// Agrega curso al carrito
function comprarCurso(e) {
  e.preventDefault()
  // Delegation para agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement
    leerDatosCursos(curso)
  }
}
// Leer datos del curso
function leerDatosCursos(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoCurso);
}
// Muestra el curso seleccionado en el carrito
function insertarCarrito(infoCurso) {
  const row = document.createElement('tr')
  row.innerHTML = `
    <td>
      <img src="${infoCurso.imagen}" style="width: 100px" />
    </td>
    <td>${infoCurso.titulo}</td>
    <td>${infoCurso.precio}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${infoCurso.id}">x</a>
    </td>
  `

  listaCursos.appendChild(row)
}
// Eliminar curso del carrito
function eliminarCurso(e) {
  e.preventDefault()
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove()
  }
}
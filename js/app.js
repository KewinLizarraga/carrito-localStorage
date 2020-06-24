/** Variables */
const carrito = document.querySelector('#carrito')
const cursos = document.querySelector('#lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

/** Event Listener */
cargarEventListener()

function cargarEventListener() {
  // Btn 'agregar al carrito'
  cursos.addEventListener('click', comprarCurso)
  // Btn 'eliminar uno del carrito'
  listaCursos.addEventListener('click', eliminarCurso)
  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
  // Contenido cargado
  document.addEventListener('DOMContentLoaded', localStorageListo)
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
  agregarCursoLocalStorage(infoCurso)
}
// Eliminar curso del carrito
function eliminarCurso(e) {
  e.preventDefault()
  let curso
  let cursoId
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove()
    curso = e.target.parentElement.parentElement
    cursoId = curso.querySelector('a').getAttribute('data-id')
  }
  borrarCursoLocalStorage(cursoId)
}
// Vaciar el carrito
function vaciarCarrito() {
  // Forma lenta (no recomendada)
  listaCursos.innerHTML = ""
  // Forma rapida (recomendada)
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild)
  }
  // Variar localStorage
  vaciarLocalStorage()
  return false
}

// Mostrar datos del localStorage en la lista-carrito
function localStorageListo() {
  let infoCursos
  infoCursos = obtenerCursosLocalStorage()

  infoCursos.forEach(infoCurso => {
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
  });
}

// Agregar curso al localStorage
function agregarCursoLocalStorage(curso) {
  let cursos
  cursos = obtenerCursosLocalStorage()
  cursos.push(curso)
  localStorage.setItem('cursos', JSON.stringify(cursos))
}
// Comprueba que exisa elementos en localStorage
function obtenerCursosLocalStorage() {
  let cursos
  if (localStorage.getItem('cursos') === null) {
    cursos = []
  } else {
    cursos = JSON.parse(localStorage.getItem('cursos'))
  }
  return cursos
}
// Eliminar curso del localStorage
function borrarCursoLocalStorage(borrarCurso) {
  let cursos
  cursos = obtenerCursosLocalStorage()

  cursos.forEach((curso, i) => {
    if (curso.id === borrarCurso) {
      cursos.splice(i, 1)
    }
  })
  localStorage.setItem('cursos', JSON.stringify(cursos))
}
// Elimina todos los cursos del localStorage
function vaciarLocalStorage() {
  localStorage.clear()
}
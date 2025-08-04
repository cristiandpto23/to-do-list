// variable global para almacenar tareas
let tareas = [];

// Inicialización de la aplicación  cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // configurar el formulario
    // busca el formulario por id y añade event listener para 'submit'
    document.getElementById('formularioTarea').addEventListener('submit', function (e) {
        // previene comportamiento por defecto
        e.preventDefault();

        // llamar funcion añadir tarea
        agregarTarea();
    });

    // mostrar tareas
    mostrarTareas();
});

// funcion que añade una nueva tarea
function agregarTarea() {
    const input = document.getElementById('entradaTarea');
    const texto = input.value.trim();

    // validación en JavaScript
    if (!texto || texto.length === 0) {
        alert('Por favor, escribe una tarea antes de agregar.');
        return;
    }

    if (texto.length > 100) {
        alert('La tarea es muy larga. Máximo 100 caracteres.');
        return;
    }

    // crear y agregar tarea
    const nuevaTarea = {
        id: Date.now() + Math.floor(Math.random() * 1000), // id para uso interno, timestamp + Math.random
        texto: texto, // la tarea
        fecha: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), // timestamp en formato legible -> "04/08/2025 14:30"
    };

    // se añade tarea al array global de tareas
    tareas.push(nuevaTarea);
    input.value = '';
    mostrarTareas();
}

// función que elimina un tarea de la lista
function eliminarTarea(id) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        tareas = tareas.filter((tarea) => tarea.id !== id);
        mostrarTareas();
    }
}

// función que muestra todas las tareas en la interfaz
function mostrarTareas() {
    const lista = document.getElementById('listaTareas');
    // se muestra cuando la lista está vacía
    const estadoVacio = document.getElementById('estadoVacio');

    // limpia las tareas
    lista.innerHTML = '';

    // validador de existencia de tareas
    if (tareas.length === 0) {
        // si hay tareas, se pone el "no hay tareas aun"
        // (quitando el 'display: none' de bootstrap)
        estadoVacio.classList.remove('d-none');
        return;
    }

    // si hay tareas, ponemos el 'display: none' de bootstrap
    estadoVacio.classList.add('d-none');

    // recorre las tareas e imprímelas en el html
    tareas.forEach((tarea) => {
        const item = document.createElement('div');
        item.className = `list-group-item bg-dark text-light border-light d-flex align-items-center`;

        item.innerHTML = `
            <div class="flex-grow-1">
                <span>${tarea.texto}</span>
                <small class="d-block text-secondary">Creada: ${tarea.fecha}</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="eliminarTarea(${tarea.id})">
                <i class="bi bi-trash"></i>
            </button>
        `;

        lista.appendChild(item);
    });
}

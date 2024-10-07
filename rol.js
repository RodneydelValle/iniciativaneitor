// Función para agregar una nueva fila
document.getElementById('agregar-fila').addEventListener('click', function() {
    const cuerpoTabla = document.getElementById('tabla-iniciativas');
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td><input type="text" class="nombre" placeholder="Nombre del PJ"></td>
        <td><input type="number" class="numero" placeholder="Iniciativa"></td>
    `;
    cuerpoTabla.appendChild(nuevaFila);
});

// Función para quitar la última fila
document.getElementById('quitar-fila').addEventListener('click', function() {
    const cuerpoTabla = document.getElementById('tabla-iniciativas');
    const filas = cuerpoTabla.getElementsByTagName('tr');
    if (filas.length > 0) {
        cuerpoTabla.removeChild(filas[filas.length - 1]);
    }
});

// Función para ordenar las iniciativas y guardar en LocalStorage sin borrar datos anteriores
document.getElementById('ordenar').addEventListener('click', function() {
    const filas = Array.from(document.querySelectorAll('#tabla-iniciativas tr'));
    let iniciativas = [];

    // Recuperar las iniciativas ya guardadas en el LocalStorage, si existen
    let iniciativasGuardadas = JSON.parse(localStorage.getItem('listaIniciativasOrdenadas')) || [];

    // Obtener las nuevas iniciativas ingresadas
    filas.forEach(fila => {
        const nombre = fila.querySelector('.nombre').value;
        const numero = parseInt(fila.querySelector('.numero').value);
        if (nombre && !isNaN(numero)) {
            // Verificar que la iniciativa no esté duplicada
            if (!iniciativasGuardadas.some(iniciativa => iniciativa.nombre === nombre && iniciativa.numero === numero)) {
                iniciativasGuardadas.push({ nombre, numero });
            }
        }
    });

    // Ordenar todas las iniciativas (las nuevas y las guardadas)
    iniciativasGuardadas.sort((a, b) => b.numero - a.numero);

    // Crear casillas de iniciativas ordenadas y mostrarlas
    const listaIniciativasOrdenadas = document.getElementById('lista-iniciativas-ordenadas');
    listaIniciativasOrdenadas.innerHTML = ''; // Limpiar la lista

    // Mostrar iniciativas ordenadas en casillas separadas pero en la misma fila
    iniciativasGuardadas.forEach(ini => {
        const div = document.createElement('div');
        div.classList.add('iniciativa');

        // Crear casilla separada para el nombre
        const nombreDiv = document.createElement('div');
        nombreDiv.classList.add('nombre-casilla');
        nombreDiv.innerText = ini.nombre;

        // Crear casilla separada para el número
        const numeroDiv = document.createElement('div');
        numeroDiv.classList.add('numero-casilla');
        numeroDiv.innerText = ini.numero;

        // Crear un contenedor para ambos, nombre y número, en una misma fila
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila-iniciativa');

        // Agregar nombre y número al contenedor
        filaDiv.appendChild(nombreDiv);
        filaDiv.appendChild(numeroDiv);

        // Agregar la fila completa a la lista
        listaIniciativasOrdenadas.appendChild(filaDiv);
    });

    // Guardar la lista completa (con las nuevas iniciativas) en el LocalStorage
    localStorage.setItem('listaIniciativasOrdenadas', JSON.stringify(iniciativasGuardadas));
    alert('Iniciativas ordenadas y guardadas.');
});

// Función para cargar la lista de iniciativas ordenadas desde LocalStorage
function cargarListaGuardada() {
    const iniciativasGuardadas = JSON.parse(localStorage.getItem('listaIniciativasOrdenadas'));
    if (iniciativasGuardadas) {
        const listaIniciativasOrdenadas = document.getElementById('lista-iniciativas-ordenadas');
        listaIniciativasOrdenadas.innerHTML = ''; // Limpiar la lista

        iniciativasGuardadas.forEach(ini => {
            const div = document.createElement('div');
            div.classList.add('iniciativa');

            // Crear casilla separada para el nombre
            const nombreDiv = document.createElement('div');
            nombreDiv.classList.add('nombre-casilla');
            nombreDiv.innerText = ini.nombre;

            // Crear casilla separada para el número
            const numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numero-casilla');
            numeroDiv.innerText = ini.numero;

            // Crear un contenedor para ambos, nombre y número, en una misma fila
            const filaDiv = document.createElement('div');
            filaDiv.classList.add('fila-iniciativa');

            // Agregar nombre y número al contenedor
            filaDiv.appendChild(nombreDiv);
            filaDiv.appendChild(numeroDiv);

            // Agregar la fila completa a la lista
            listaIniciativasOrdenadas.appendChild(filaDiv);
        });
    }
}

// Función para borrar la lista guardada en LocalStorage
document.getElementById('borrar-lista').addEventListener('click', function() {
    localStorage.removeItem('listaIniciativasOrdenadas');
    document.getElementById('lista-iniciativas-ordenadas').innerHTML = ''; // Limpiar la lista visible
    alert('Lista de iniciativas guardada ha sido borrada.');
});

// Cargar la lista guardada al cargar la página
window.onload = function() {
    cargarListaGuardada();
};

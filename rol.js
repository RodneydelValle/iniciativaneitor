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
    const listaIniciativas = document.getElementById('lista-iniciativas-ordenadas');
    listaIniciativas.innerHTML = ''; // Limpiar la lista

    iniciativasGuardadas.forEach(iniciativa => {
        const resultadoItem = document.createElement('div');
        resultadoItem.className = 'resultado-item';

        const inputNombre = document.createElement('input');
        inputNombre.className = 'casilla';
        inputNombre.type = 'text';
        inputNombre.value = iniciativa.nombre;

        const inputNumero = document.createElement('input');
        inputNumero.className = 'casilla';
        inputNumero.type = 'number';
        inputNumero.value = iniciativa.numero;

        // Crear checkbox para marcar la fila
        const checkbox = document.createElement('input');
        checkbox.className = 'casilla casilla-checkbox';
        checkbox.type = 'checkbox';

        // Evento para marcar en rojo cuando se selecciona el checkbox
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                resultadoItem.classList.add('fila-marcada');
            } else {
                resultadoItem.classList.remove('fila-marcada');
            }
        });

        resultadoItem.appendChild(inputNombre);
        resultadoItem.appendChild(inputNumero);
        resultadoItem.appendChild(checkbox);

        listaIniciativas.appendChild(resultadoItem);
    });

    // Guardar la lista completa (con las nuevas iniciativas) en el LocalStorage
    localStorage.setItem('listaIniciativasOrdenadas', JSON.stringify(iniciativasGuardadas));
    alert('Iniciativas ordenadas y guardadas.');
});

// Función para cargar la lista de iniciativas ordenadas desde LocalStorage
function cargarListaGuardada() {
    const iniciativasGuardadas = JSON.parse(localStorage.getItem('listaIniciativasOrdenadas'));
    if (iniciativasGuardadas) {
        const listaIniciativas = document.getElementById('lista-iniciativas-ordenadas');
        listaIniciativas.innerHTML = ''; // Limpiar la lista

        iniciativasGuardadas.forEach(iniciativa => {
            const resultadoItem = document.createElement('div');
            resultadoItem.className = 'resultado-item';

            const inputNombre = document.createElement('input');
            inputNombre.className = 'casilla';
            inputNombre.type = 'text';
            inputNombre.value = iniciativa.nombre;

            const inputNumero = document.createElement('input');
            inputNumero.className = 'casilla';
            inputNumero.type = 'number';
            inputNumero.value = iniciativa.numero;

            // Crear checkbox para marcar la fila
            const checkbox = document.createElement('input');
            checkbox.className = 'casilla casilla-checkbox';
            checkbox.type = 'checkbox';

            // Evento para marcar en rojo cuando se selecciona el checkbox
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    resultadoItem.classList.add('fila-marcada');
                } else {
                    resultadoItem.classList.remove('fila-marcada');
                }
            });

            resultadoItem.appendChild(inputNombre);
            resultadoItem.appendChild(inputNumero);
            resultadoItem.appendChild(checkbox);

            listaIniciativas.appendChild(resultadoItem);
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

document.getElementById('ordenar').addEventListener('click', function() {
    const iniciativas = [];
    const rows = document.querySelectorAll('#tabla-iniciativas tr');

    rows.forEach(row => {
        const nombre = row.querySelector('.nombre').value;
        const numero = row.querySelector('.numero').value;
        if (nombre && numero) {
            iniciativas.push({ nombre, numero: parseInt(numero) });
        }
    });

    // Ordenar las iniciativas
    iniciativas.sort((a, b) => b.numero - a.numero);

    // Limpiar el contenedor de iniciativas ordenadas
    const listaIniciativasOrdenadas = document.getElementById('lista-iniciativas-ordenadas');
    listaIniciativasOrdenadas.innerHTML = '';

    // Mostrar iniciativas ordenadas en casillas separadas
    iniciativas.forEach(ini => {
        const div = document.createElement('div');
        div.classList.add('iniciativa');

        // Crear casillas separadas para el nombre y el número de iniciativa
        const nombreDiv = document.createElement('div');
        nombreDiv.classList.add('nombre-casilla');
        nombreDiv.innerText = ini.nombre; // Solo el nombre

        const numeroDiv = document.createElement('div');
        numeroDiv.classList.add('numero-casilla');
        numeroDiv.innerText = `: ${ini.numero}`; // Solo ":" seguido del número

        // Agregar las casillas al contenedor
        div.appendChild(nombreDiv);
        div.appendChild(numeroDiv);
        listaIniciativasOrdenadas.appendChild(div);
    });
});


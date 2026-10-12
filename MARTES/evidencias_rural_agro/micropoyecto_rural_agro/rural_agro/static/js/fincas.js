const listaFincas = document.getElementById("listaFincas");
const mensajeCarga = document.getElementById("mensajeCarga");
const formFinca = document.getElementById("formFinca");
const mensajeErrorFinca = document.getElementById("mensajeErrorFinca");

// Guardamos aquí si estamos editando una finca (y cuál), o creando una nueva
let fincaEditandoId = null;

// --- Cargar y mostrar las fincas ---
async function cargarFincas() {
    try {
        const respuesta = await fetch(`${API_URL}/fincas/`);

        if (!respuesta.ok) {
            mensajeCarga.textContent = "No se pudieron cargar las fincas.";
            return;
        }

        const fincas = await respuesta.json();
        mensajeCarga.classList.add("oculto");

        if (fincas.length === 0) {
            listaFincas.innerHTML = "<p>Todavía no hay fincas registradas.</p>";
            return;
        }

        // Guardamos las fincas en una variable global para poder leerlas al editar,
        // sin tener que volver a pedirlas a la API.
        window.fincasCargadas = fincas;

        listaFincas.innerHTML = fincas.map(finca => `
            <div class="tarjeta-finca">
                <h3>${finca.nombre_fincas}</h3>
                <p>📍 ${finca.ubicacion_fincas}</p>
                <a href="/static/parcelas.html?finca_id=${finca.id_fincas}">Ver parcelas →</a>
                <div class="acciones-tarjeta">
                    <button onclick="editarFinca(${finca.id_fincas})" class="btn-accion btn-editar">✏️ Editar</button>
                    <button onclick="eliminarFinca(${finca.id_fincas})" class="btn-accion btn-eliminar">🗑️ Eliminar</button>
                </div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error al cargar fincas:", error);
        mensajeCarga.textContent = "Error de conexión con el servidor.";
    }
}

cargarFincas();

// --- Mostrar / ocultar formulario (para crear) ---
const btnMostrarForm = document.getElementById("btnMostrarForm");
btnMostrarForm.addEventListener("click", () => {
    fincaEditandoId = null; // nos aseguramos de que no quede en "modo edición"
    formFinca.reset();
    document.querySelector("#formFinca button[type=submit]").textContent = "Guardar finca";
    formFinca.classList.toggle("oculto");
});

// --- Entrar en modo edición ---
function editarFinca(id) {
    const finca = window.fincasCargadas.find(f => f.id_fincas === id);
    if (!finca) return;

    fincaEditandoId = id;

    document.getElementById("nombreFinca").value = finca.nombre_fincas;
    document.getElementById("ubicacionFinca").value = finca.ubicacion_fincas;

    document.querySelector("#formFinca button[type=submit]").textContent = "Guardar cambios";
    formFinca.classList.remove("oculto");
    formFinca.scrollIntoView({ behavior: "smooth" });
}

// --- Eliminar finca ---
async function eliminarFinca(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar esta finca? Esto también borrará sus parcelas y cultivos asociados.");
    if (!confirmar) return;

    try {
        const respuesta = await fetchConToken(`${API_URL}/fincas/${id}`, { method: "DELETE" });
        if (!respuesta) return;

        if (!respuesta.ok) {
            const error = await respuesta.json();
            alert(error.detail || "No se pudo eliminar la finca.");
            return;
        }

        cargarFincas();

    } catch (error) {
        console.error("Error al eliminar finca:", error);
        alert("Error de conexión con el servidor.");
    }
}

// --- Crear o editar finca (submit del formulario) ---
formFinca.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensajeErrorFinca.textContent = "";

    const esEdicion = fincaEditandoId !== null;

    // En edición, el backend no necesita usuarios_id de nuevo ni coordenada_fincas obligatoriamente
    // (FincaUpdate solo exige lo que mandes), pero en creación sí es obligatorio.
    const datosFinca = esEdicion
        ? {
            nombre_fincas: document.getElementById("nombreFinca").value,
            ubicacion_fincas: document.getElementById("ubicacionFinca").value
          }
        : {
            nombre_fincas: document.getElementById("nombreFinca").value,
            ubicacion_fincas: document.getElementById("ubicacionFinca").value,
            coordenada_fincas: {},
            usuarios_id: obtenerUsuarioIdDelToken()
          };

    const url = esEdicion ? `${API_URL}/fincas/${fincaEditandoId}` : `${API_URL}/fincas/`;
    const metodo = esEdicion ? "PUT" : "POST";

    try {
        const respuesta = await fetchConToken(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosFinca)
        });

        if (!respuesta) return;

        if (!respuesta.ok) {
            const error = await respuesta.json();
            mensajeErrorFinca.textContent = error.detail || "No se pudo guardar la finca.";
            return;
        }

        formFinca.reset();
        formFinca.classList.add("oculto");
        fincaEditandoId = null;
        cargarFincas();

    } catch (error) {
        console.error("Error al guardar finca:", error);
        mensajeErrorFinca.textContent = "Error de conexión con el servidor.";
    }
});
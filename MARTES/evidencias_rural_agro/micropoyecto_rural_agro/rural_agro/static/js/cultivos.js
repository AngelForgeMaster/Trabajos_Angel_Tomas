const parametros = new URLSearchParams(window.location.search);
const parcelaId = parametros.get("parcela_id");

if (!parcelaId) {
    window.location.href = "/static/fincas.html";
}

document.getElementById("tituloParcela").textContent = `🌽 Cultivos de la parcela #${parcelaId}`;

const listaCultivos = document.getElementById("listaCultivos");
const mensajeCarga = document.getElementById("mensajeCarga");
const formCultivo = document.getElementById("formCultivo");
const mensajeErrorCultivo = document.getElementById("mensajeErrorCultivo");
let cultivoEditandoId = null;

// --- Cargar y mostrar cultivos ---
async function cargarCultivos() {
    try {
        const respuesta = await fetchConToken(`${API_URL}/cultivos/parcela/${parcelaId}`);

        if (!respuesta) return;

        if (!respuesta.ok) {
            mensajeCarga.textContent = "No se pudieron cargar los cultivos.";
            return;
        }

        const cultivos = await respuesta.json();
        mensajeCarga.classList.add("oculto");

        if (cultivos.length === 0) {
            listaCultivos.innerHTML = "<p>Todavía no hay cultivos registrados en esta parcela.</p>";
            return;
        }

        window.cultivosCargados = cultivos;

        listaCultivos.innerHTML = cultivos.map(cultivo => `
            <div class="tarjeta-finca">
                <h3>${cultivo.tipo_cultivos} — ${cultivo.variedad_cultivos}</h3>
                <p>🌱 Semilla: ${cultivo.tipo_semilla} (${cultivo.cantidad_semilla} kg)</p>
                <p>💰 Precio semilla: $${cultivo.precio_semilla}</p>
                <p>📅 Sembrado: ${cultivo.fecha_siembra}</p>
                <p>📌 Estado: ${cultivo.estado_siembra}</p>
                <div class="acciones-tarjeta">
                    <button onclick="editarCultivo(${cultivo.id_cultivos})" class="btn-accion btn-editar">✏️ Editar</button>
                    <button onclick="eliminarCultivo(${cultivo.id_cultivos})" class="btn-accion btn-eliminar">🗑️ Eliminar</button>
                </div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error al cargar cultivos:", error);
        mensajeCarga.textContent = "Error de conexión con el servidor.";
    }
}

cargarCultivos();

// --- Entrar en modo edición ---
function editarCultivo(id) {
    const cultivo = window.cultivosCargados.find(c => c.id_cultivos === id);
    if (!cultivo) return;

    cultivoEditandoId = id;

    document.getElementById("tipoCultivo").value = cultivo.tipo_cultivos;
    document.getElementById("variedadCultivo").value = cultivo.variedad_cultivos;
    document.getElementById("tipoSemilla").value = cultivo.tipo_semilla;
    document.getElementById("cantidadSemilla").value = cultivo.cantidad_semilla;
    document.getElementById("precioSemilla").value = cultivo.precio_semilla;
    document.getElementById("fechaSiembra").value = cultivo.fecha_siembra;
    document.getElementById("fechaCosecha").value = cultivo.fecha_estimada_cosecha || "";

    document.querySelector("#formCultivo button[type=submit]").textContent = "Guardar cambios";
    formCultivo.classList.remove("oculto");
    formCultivo.scrollIntoView({ behavior: "smooth" });
}

// --- Eliminar cultivo ---
async function eliminarCultivo(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar este cultivo?");
    if (!confirmar) return;

    try {
        const respuesta = await fetchConToken(`${API_URL}/cultivos/${id}`, { method: "DELETE" });
        if (!respuesta) return;

        if (!respuesta.ok) {
            const error = await respuesta.json();
            alert(error.detail || "No se pudo eliminar el cultivo.");
            return;
        }

        cargarCultivos();

    } catch (error) {
        console.error("Error al eliminar cultivo:", error);
        alert("Error de conexión con el servidor.");
    }
}

// --- Mostrar / ocultar formulario ---
const btnMostrarForm = document.getElementById("btnMostrarForm");
btnMostrarForm.addEventListener("click", () => {
    cultivoEditandoId = null;
    formCultivo.reset();
    document.querySelector("#formCultivo button[type=submit]").textContent = "Guardar cultivo";
    formCultivo.classList.toggle("oculto");
});

// --- Registrar nuevo cultivo ---
formCultivo.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensajeErrorCultivo.textContent = "";

    const esEdicion = cultivoEditandoId !== null;
    const fechaCosechaValor = document.getElementById("fechaCosecha").value;

    const datosCultivo = esEdicion
        ? {
            tipo_cultivos: document.getElementById("tipoCultivo").value,
            variedad_cultivos: document.getElementById("variedadCultivo").value,
            cantidad_semilla: parseFloat(document.getElementById("cantidadSemilla").value),
            precio_semilla: parseFloat(document.getElementById("precioSemilla").value)
          }
        : {
            tipo_cultivos: document.getElementById("tipoCultivo").value,
            variedad_cultivos: document.getElementById("variedadCultivo").value,
            tipo_semilla: document.getElementById("tipoSemilla").value,
            cantidad_semilla: parseFloat(document.getElementById("cantidadSemilla").value),
            precio_semilla: parseFloat(document.getElementById("precioSemilla").value),
            fecha_siembra: document.getElementById("fechaSiembra").value,
            fecha_estimada_cosecha: fechaCosechaValor || null,
            parcelas_id: parseInt(parcelaId)
          };

    const url = esEdicion ? `${API_URL}/cultivos/${cultivoEditandoId}` : `${API_URL}/cultivos/`;
    const metodo = esEdicion ? "PUT" : "POST";

    try {
        const respuesta = await fetchConToken(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosCultivo)
        });

        if (!respuesta) return;

        if (!respuesta.ok) {
            const error = await respuesta.json();
            mensajeErrorCultivo.textContent = error.detail || "No se pudo guardar el cultivo.";
            return;
        }

        formCultivo.reset();
        formCultivo.classList.add("oculto");
        cultivoEditandoId = null;
        cargarCultivos();

    } catch (error) {
        console.error("Error al guardar cultivo:", error);
        mensajeErrorCultivo.textContent = "Error de conexión con el servidor.";
    }
});
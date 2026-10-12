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
        
                <!-- Sección de Riego Dinámica -->
                <div class="seccion-riego" style="margin: 8px 0; padding: 10px; background: #e3f2fd; border-radius: 6px; font-size: 13px;">
                    <p style="margin: 2px 0;">💧 <strong>Último riego:</strong> <span id="txtUltimoRiego-${cultivo.id_cultivos}">${cultivo.ultimo_riego || 'No registrado'}</span></p>
                    <p style="margin: 2px 0;">⏳ <strong>Próximo riego:</strong> <span id="txtProximoRiego-${cultivo.id_cultivos}" style="font-weight: bold; color: #0277bd;">${cultivo.proximo_riego || 'Pendiente'}</span></p>
            
                    <div style="margin-top: 8px; display: flex; gap: 5px; align-items: center;">
                        <input type="date" id="inputFechaRiego-${cultivo.id_cultivos}" style="font-size: 11px; padding: 3px;" title="Fecha último riego">
                        <input type="number" id="inputDiasRiego-${cultivo.id_cultivos}" placeholder="Días intervalo" min="1" style="width: 80px; font-size: 11px; padding: 3px;" title="Cada cuántos días se riega">
                        <button onclick="calcularProximoRiego(${cultivo.id_cultivos})" class="btn-primary btn-pequeno" style="padding: 3px 6px; font-size: 11px;">Actualizar</button>
                    </div>
                </div>

                <!-- Sección de Foto del Cultivo -->
                <div class="seccion-foto" style="margin-top: 12px; padding: 10px; background: #f1f8e9; border-radius: 6px;">
                    <label style="font-size: 12px; font-weight: bold; color: #2e7d32; display: block; margin-bottom: 5px;">📸 Foto del estado actual:</label>
                    <input type="file" accept="image/*" onchange="cargarFotoCultivo(event, ${cultivo.id_cultivos})" style="font-size: 11px; width: 100%;">
            
                    <div id="previewFoto-${cultivo.id_cultivos}" style="margin-top: 8px; text-align: center;">
                        ${cultivo.foto_temp ? `<img src="${cultivo.foto_temp}" style="max-width: 100%; height: 120px; object-fit: cover; border-radius: 4px;">` : '<span style="font-size: 11px; color: #666;">Sin foto registrada</span>'}
                    </div>
                </div>

                <!-- Contenedor del Test de Rentabilidad -->
                <div class="seccion-rentabilidad" id="rentabilidad-${cultivo.id_cultivos}" style="margin-top: 10px;">
                    <button onclick="mostrarFormularioRentabilidad(${cultivo.id_cultivos})" class="btn-secundario btn-pequeno" style="background-color: #2e7d32; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                        📊 Calcular Rentabilidad
                    </button>
                </div>

                <div class="acciones-tarjeta" style="margin-top: 12px;">
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

function mostrarFormularioRentabilidad(idCultivo) {
    const contenedor = document.getElementById(`rentabilidad-${idCultivo}`);
    
    // Si ya está abierto, lo cerramos o alternamos
    if (contenedor.querySelector('.form-rentabilidad')) {
        contenedor.innerHTML = `<button onclick="mostrarFormularioRentabilidad(${idCultivo})" class="btn-secundario btn-pequeno">📊 Calcular Rentabilidad</button>`;
        return;
    }

    contenedor.innerHTML = `
        <div class="form-tarjeta form-rentabilidad" style="margin-top: 10px; padding: 15px; background: #f9f9f9; border-radius: 6px;">
            <h4>Test de Rentabilidad</h4>
            <div class="campo" style="margin-bottom: 8px;">
                <label style="font-size: 12px;">Gastos extras (Abono, riego, mano de obra $):</label>
                <input type="number" id="gastosExtra-${idCultivo}" value="0" style="width: 100%; padding: 5px;">
            </div>
            <div class="campo" style="margin-bottom: 8px;">
                <label style="font-size: 12px;">Kilos esperados de cosecha:</label>
                <input type="number" id="kilosCosecha-${idCultivo}" placeholder="Ej. 300" style="width: 100%; padding: 5px;">
            </div>
            <div class="campo" style="margin-bottom: 10px;">
                <label style="font-size: 12px;">Precio de venta por kilo ($):</label>
                <input type="number" id="precioVenta-${idCultivo}" placeholder="Ej. 4500" style="width: 100%; padding: 5px;">
            </div>
            <button onclick="ejecutarCalculo(${idCultivo})" class="btn-primary btn-pequeno">Calcular Ahora</button>
            <div id="resultadoRentabilidad-${idCultivo}" style="margin-top: 10px; font-size: 14px;"></div>
        </div>
    `;
}

function ejecutarCalculo(idCultivo) {
    // Tomamos los valores del cultivo actual (asegúrate de tener acceso al objeto o precio/cantidad de semilla)
    // Supongamos que guardaste los cultivos en una variable global 'window.cultivosCargados'
    const cultivo = window.cultivosCargados.find(c => c.id_cultivos === idCultivo);
    
    const costoSemillaOriginal = (cultivo.cantidad_semilla || 0) * (cultivo.precio_semilla || 0);
    
    const gastosExtra = parseFloat(document.getElementById(`gastosExtra-${idCultivo}`).value) || 0;
    const kilos = parseFloat(document.getElementById(`kilosCosecha-${idCultivo}`).value) || 0;
    const precioVenta = parseFloat(document.getElementById(`precioVenta-${idCultivo}`).value) || 0;

    // Fórmulas
    const costoTotal = costoSemillaOriginal + gastosExtra;
    const ingresoTotal = kilos * precioVenta;
    const gananciaNeta = ingresoTotal - costoTotal;
    const porcentaje = costoTotal > 0 ? ((gananciaNeta / costoTotal) * 100) : 0;

    const divResultado = document.getElementById(`resultadoRentabilidad-${idCultivo}`);
    
    const color = gananciaNeta >= 0 ? "green" : "red";
    const estadoTexto = gananciaNeta >= 0 ? "🟢 Proyecto Rentable" : "🔴 En Pérdida";

    divResultado.innerHTML = `
        <hr style="margin: 8px 0;">
        <p><strong>Costo Total Invertido:</strong> $${costoTotal.toLocaleString()}</p>
        <p><strong>Ingreso Estimado:</strong> $${ingresoTotal.toLocaleString()}</p>
        <p><strong>Ganancia Neta:</strong> <span style="color: ${color}; font-weight: bold;">$${gananciaNeta.toLocaleString()}</span></p>
        <p><strong>Rentabilidad:</strong> ${porcentaje.toFixed(1)}%</p>
        <p style="margin-top: 5px; font-weight: bold;">${estadoTexto}</p>
    `;
}

function cargarFotoCultivo(event, idCultivo) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function(e) {
        const urlImagen = e.target.result;

        // Guardamos temporalmente la imagen en el objeto del cultivo en memoria
        const cultivo = window.cultivosCargados.find(c => c.id_cultivos === idCultivo);
        if (cultivo) {
            cultivo.foto_temp = urlImagen;
        }

        // Pintamos la imagen en el contenedor correspondiente
        const contenedorPreview = document.getElementById(`previewFoto-${idCultivo}`);
        contenedorPreview.innerHTML = `
            <img src="${urlImagen}" style="max-width: 100%; height: 120px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        `;
    };

    // Lee el archivo como una URL de datos (Base64)
    lector.readAsDataURL(archivo);
}

function calcularProximoRiego(idCultivo) {
    const inputFecha = document.getElementById(`inputFechaRiego-${idCultivo}`).value;
    const inputDias = document.getElementById(`inputDiasRiego-${idCultivo}`).value;

    if (!inputFecha || !inputDias) {
        alert("Por favor selecciona la fecha del último riego y el intervalo de días.");
        return;
    }

    // Convertimos la fecha ingresada a objeto Date
    let fechaUltimo = new Date(inputFecha + "T00:00:00");
    let diasIntervalo = parseInt(inputDias);

    // Sumamos los días del intervalo
    fechaUltimo.setDate(fechaUltimo.getDate() + diasIntervalo);

    // Formateamos la fecha resultante a YYYY-MM-DD
    let anio = fechaUltimo.getFullYear();
    let mes = String(fechaUltimo.getMonth() + 1).padStart(2, '0');
    let dia = String(fechaUltimo.getDate()).padStart(2, '0');
    let fechaProximaStr = `${anio}-${mes}-${dia}`;

    // Actualizamos visualmente en la tarjeta
    document.getElementById(`txtUltimoRiego-${idCultivo}`).textContent = inputFecha;
    document.getElementById(`txtProximoRiego-${idCultivo}`).textContent = fechaProximaStr;

    // Opcional: Guardamos temporalmente en el objeto del cultivo en memoria
    const cultivo = window.cultivosCargados.find(c => c.id_cultivos === idCultivo);
    if (cultivo) {
        cultivo.ultimo_riego = inputFecha;
        cultivo.proximo_riego = fechaProximaStr;
    }
}
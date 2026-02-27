// ==========================================
// 1. CONFIGURACIÓN FIREBASE (Placeholders)
// ==========================================
/* Para activar Firebase real, reemplaza este config con el tuyo desde la consola de Firebase.
*/
const firebaseConfig = {
	apiKey: "AIzaSyC8TwHap3v02nWbTeVPEsqfvi5n5vrDU-0",
	authDomain: "sitse-pnp-2f21f.firebaseapp.com",
	projectId: "sitse-pnp-2f21f",
	storageBucket: "sitse-pnp-2f21f.firebasestorage.app",
	messagingSenderId: "96701502418",
	appId: "1:96701502418:web:ba18709948e18838f8ae0b"
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================
// 2. GESTIÓN DE USUARIOS Y AUTENTICACIÓN
// ==========================================
let usuarioActual = null;

// Administrador por defecto
const ADMIN_CRED = { cip: "295418", dni: "19252075" };

function toggleAuthMode() {
    document.getElementById('box-login').classList.toggle('hidden');
    document.getElementById('box-register').classList.toggle('hidden');
    
    // Limpiar todos los campos al cambiar de vista
    const inputs = document.querySelectorAll('#login-screen input');
    inputs.forEach(input => input.value = '');
    document.getElementById('error-msg').innerText = '';
    document.getElementById('reg-msg').innerText = '';
}

// Configurar tecla ENTER e inicializar UI al cargar la pÃ¡gina
// ==========================================
// REEMPLAZA TU window.onload ACTUAL POR ESTO
// ==========================================
window.onload = function() {
    renderizarCasos();
    
    // 1. VERIFICAR SI ES JURADO (Viene del QR)
    let isGuest = sessionStorage.getItem('sitse_is_guest');
    let guestName = sessionStorage.getItem('sitse_guest_name');
    
    if (isGuest === 'true' && guestName) {
        usuarioActual = { nombres: guestName, rol: 'guest', cip: 'INVITADO' };
        aplicarRestriccionesInvitadoUI(); // Ejecuta la pantalla limitada
        return; // IMPORTANTE: Detiene la ejecución aquí para que no pida login normal
    }

    // 2. VERIFICAR USUARIO NORMAL (Policía o Admin)
    let savedUser = localStorage.getItem('sitse_currentUser');
    if(savedUser) {
        usuarioActual = JSON.parse(savedUser);
        
        // Parche de seguridad admin
        if(usuarioActual.rol === 'admin') {
            usuarioActual.cip = ADMIN_CRED.cip;
            localStorage.setItem('sitse_currentUser', JSON.stringify(usuarioActual));
        }

        document.getElementById('login-screen').classList.add('hidden'); // Ocultar login
        iniciarSesionUI();
    }

    // Eventos ENTER para Login
    document.getElementById('input-cip').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') intentarLogin();
    });
    document.getElementById('input-dni').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') intentarLogin();
    });
};

// ==========================================
// FUNCIONES INVITADOS
// ==========================================
function aplicarRestriccionesInvitadoUI() {
    // 1. Ponemos el nombre del jurado en la esquina superior derecha
    document.getElementById('user-name').innerText = usuarioActual.nombres;
    
    // 2. Mostramos la barra de navegación y ocultamos la pantalla de login
    document.getElementById('navbar').classList.remove('hidden');
    document.getElementById('login-screen').classList.add('hidden');
    
    // 3. Ocultamos las pestañas que el jurado no necesita ver
    const navLinks = document.querySelectorAll('.nav-title nav a');
    navLinks.forEach(link => {
        const text = link.innerText.trim();
        // El jurado solo debe ver la pestaña de Simuladores
        if(text === 'Modelo CASEL' || text === 'Respaldo Clínico' || text === 'Mis Resultados' || text === 'Panel Admin') {
            link.style.display = 'none';
        }
    });
    
    // 4. Ocultar la campana de notificaciones (no aplica para invitados)
    document.getElementById('notif-bell').style.display = 'none';

    // 5. Lo enviamos directo a la pantalla de los simuladores
    cambiarPantalla('dashboard-screen');
}

function registrarUsuario() {
    const nombres = document.getElementById('reg-nombres').value;
    const grado = document.getElementById('reg-grado').value;
    const correo = document.getElementById('reg-correo').value;
    const cip = document.getElementById('reg-cip').value;
    const dni = document.getElementById('reg-dni').value;

    if(!nombres || !cip || !dni) {
        alert("Nombres, CIP y DNI son obligatorios.");
        return;
    }

    const newUser = { nombres, grado, correo, cip, dni, rol: 'user' };
    
    // Guardar en Firebase (Simulado localmente para la demo)
    let users = JSON.parse(localStorage.getItem('sitse_users')) || [];
    if(users.find(u => u.cip === cip)) {
        alert("El CIP ya estÃ¡ registrado.");
        return;
    }
    users.push(newUser);
    localStorage.setItem('sitse_users', JSON.stringify(users));

    document.getElementById('reg-msg').innerText = "Registro exitoso. Su usuario es su CIP y contraseÃ±a su DNI.";
    setTimeout(toggleAuthMode, 2000);
}

function intentarLogin() {
    const cip = document.getElementById('input-cip').value.trim();
    const dni = document.getElementById('input-dni').value.trim();
    
    // VerificaciÃ³n de Administrador
    if(cip === ADMIN_CRED.cip && dni === ADMIN_CRED.dni) {
        usuarioActual = { nombres: "Crnl. PNP Manuel ZURITA (Admin)", rol: 'admin', cip: ADMIN_CRED.cip };
        localStorage.setItem('sitse_currentUser', JSON.stringify(usuarioActual)); 
        iniciarSesionUI();
        return;
    }

    // VerificaciÃ³n de Usuario Normal
    let users = JSON.parse(localStorage.getItem('sitse_users')) || [];
    let user = users.find(u => u.cip === cip && u.dni === dni);

    if (user) {
        usuarioActual = user;
        localStorage.setItem('sitse_currentUser', JSON.stringify(usuarioActual)); 
        iniciarSesionUI();
    } else {
        document.getElementById('error-msg').innerText = "Credenciales incorrectas.";
    }
}

function iniciarSesionUI() {
    document.getElementById('user-name').innerText = usuarioActual.nombres;
    document.getElementById('navbar').classList.remove('hidden');
    
    if(usuarioActual.rol === 'admin') {
        document.getElementById('nav-admin').classList.remove('hidden');
    }
	
    actualizarNotificaciones(); // <--- NUEVA LÃNEA
    cambiarPantalla('casel-intro-screen');
    iniciarScrollAnimations();
}

function logout() { 
    localStorage.removeItem('sitse_currentUser'); // Borrar sesiÃ³n al salir
    location.reload(); 
}

// ==========================================
// 3. UI, SONIDOS Y ANIMACIONES
// ==========================================
function cambiarPantalla(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(id !== 'game-screen') detenerTimer();
}

function volverInicio() {
    cambiarPantalla('dashboard-screen');
    renderizarCasos();
}

function playHover() {
    const audio = document.getElementById('audio-hover');
    audio.currentTime = 0;
    audio.play().catch(()=>{});
}

function iniciarScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-element').forEach(el => observer.observe(el));
}

let casoActualId = null;
let historialSesion = [];
let timerObj = null;
let tiempoRestante = 15;
let tiempoInicioOpcion = 0;
let puntajeAcumulado = 0;
let statsAcumulados = { autoconciencia: 0, autocontrol: 0, social: 0, relacional: 0, decisiones: 0, comunicacion: 0 };

function renderizarCasos() {
    const grid = document.querySelector('.grid-casos');
    grid.innerHTML = '';
    Object.keys(baseDatosCasos).forEach(id => {
        const c = baseDatosCasos[id];
        grid.innerHTML += `
            <div class="card-caso" onclick="iniciarCaso('${id}')">
                <div class="card-img" style="background-image: url('${c.imagenBase}'); background-color:#333"></div>
                <div class="card-info">
                    <h3>${c.titulo}</h3>
                    <p>EvalÃºa las 6 dimensiones CASEL bajo estrÃ©s dinÃ¡mico.</p>
                </div>
            </div>`;
    });
}

function iniciarCaso(id) {
    casoActualId = id;
    historialSesion = [];
    puntajeAcumulado = 0;
    statsAcumulados = { autoconciencia: 0, autocontrol: 0, social: 0, relacional: 0, decisiones: 0, comunicacion: 0 };
    
    cambiarPantalla('game-screen');
    document.getElementById('audio-tension').play().catch(()=>{});
    cargarEscena('inicio');
}

function cargarEscena(idEscena) {
    // 1. Obtenemos el caso completo y la escena específica
    const caso = baseDatosCasos[casoActualId];
    const escena = caso.escenas[idEscena];
    
    // 2. Actualizamos el texto de la situación
    document.getElementById('escena-texto').innerText = escena.texto;
    
    // ==========================================
    // 3. NUEVA LÓGICA DEL VIDEO ININTERRUMPIDO
    // ==========================================
    const videoElemento = document.getElementById('escena-video');
    const sourceElemento = document.getElementById('video-source');
    
    // Verificamos si la etiqueta source ya tiene la ruta correcta. 
    // Usamos .includes() porque el navegador a veces le añade "http://localhost..." al inicio.
    // Esto asegura que el video NO se reinicie ni parpadee al cambiar de nivel si es el mismo.
    if (!sourceElemento.src.includes(caso.videoBase)) {
        sourceElemento.src = caso.videoBase;
        videoElemento.load(); // Le dice al HTML que cargue el nuevo archivo
        videoElemento.play().catch(e => console.log("Esperando interacción para reproducir"));
    }
    // ==========================================

    // 4. Limpiamos el contenedor de opciones
    const btnContainer = document.getElementById('opciones-container');
    btnContainer.innerHTML = '';

    // 5. Si es el final, detenemos y enviamos el reporte
    if(escena.final) {
        finalizarSimulacion(escena.texto);
        return;
    }

    // 6. Generamos los botones para las nuevas decisiones
    escena.opciones.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'btn-decision';
        btn.innerText = opt.texto;
        btn.onclick = () => procesarDecision(opt, escena);
        btnContainer.appendChild(btn);
    });

    // 7. Iniciamos el temporizador de 15 segundos
    iniciarTimer(escena.opciones);
}

function iniciarTimer(opcionesDisponibles) {
    detenerTimer();
    tiempoRestante = 15;
    tiempoInicioOpcion = Date.now();
    document.getElementById('timer-count').innerText = tiempoRestante;
    document.getElementById('timer-box').classList.remove('timer-danger');

    timerObj = setInterval(() => {
        tiempoRestante--;
        document.getElementById('timer-count').innerText = tiempoRestante;
        
        if (tiempoRestante <= 5) document.getElementById('timer-box').classList.add('timer-danger');

        if (tiempoRestante <= 0) {
            detenerTimer();
            let peorOpcion = opcionesDisponibles.reduce((prev, curr) => 
                (prev.stats.decisiones < curr.stats.decisiones) ? prev : curr
            );
            
            // Pasamos "opcionesDisponibles" para que el sistema recuerde quÃ© otras opciones tenÃ­as
            procesarDecision(peorOpcion, {texto: "Se acabÃ³ el tiempo. Te congelaste.", opciones: opcionesDisponibles}, true);
        }
    }, 1000);
}

function detenerTimer() { clearInterval(timerObj); }

function procesarDecision(opcion, escenaAnterior, fueTimeout = false) {
    detenerTimer();
    let tiempoUsado = fueTimeout ? 15 : ((Date.now() - tiempoInicioOpcion) / 1000).toFixed(1);
    
    for (let key in opcion.stats) { statsAcumulados[key] += opcion.stats[key]; }

    let puntosBase = opcion.tipo === "IdÃ³neo" ? 100 : opcion.tipo === "Aceptable" ? 60 : opcion.tipo === "En Progreso" ? 20 : -50;
    let bonoVelocidad = (opcion.tipo === "IdÃ³neo" && tiempoUsado < 5) ? 50 : 0;
    let puntosObtenidos = puntosBase + bonoVelocidad;
    puntajeAcumulado += puntosObtenidos;

    document.getElementById('score-display').innerText = `Puntaje: ${puntajeAcumulado}`;

    // NUEVO: Guardamos TODAS las opciones que se te presentaron en esta pantalla
    let opcionesDelPaso = escenaAnterior.opciones ? escenaAnterior.opciones.map(o => ({ texto: o.texto, tipo: o.tipo })) : [];

    historialSesion.push({
        situacion: escenaAnterior.texto,
        decision: fueTimeout ? "NINGUNA (Bloqueo por EstrÃ©s). El sistema ejecutÃ³ el peor escenario." : opcion.texto,
        evaluacion: opcion.tipo,
        feedback: opcion.feedback,
        tiempo: tiempoUsado,
        puntos: puntosObtenidos,
        opcionesDisponibles: opcionesDelPaso // Se guarda en la BD
    });

    cargarEscena(opcion.sig);
}

function finalizarSimulacion(textoFinal) {
    detenerTimer();
    document.getElementById('audio-tension').pause();
    
    // Crear el objeto de resultado
    const fecha = new Date().toLocaleString();
    const resultado = {
        usuario: usuarioActual.cip,
        nombre: usuarioActual.nombres,
        caso: baseDatosCasos[casoActualId].titulo,
        fecha: fecha,
        puntaje: puntajeAcumulado,
        stats: statsAcumulados,
        detalle: historialSesion,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Para ordenar cronológicamente en la BD
    };

    // GUARDAR EN FIREBASE (LA NUBE)
    db.collection("resultados_sitse").add(resultado)
    .then((docRef) => {
        console.log("Misión registrada en la nube con ID: ", docRef.id);
        generarInformeFinal(resultado, textoFinal);
    })
    .catch((error) => {
        console.error("Error al guardar el expediente: ", error);
        alert("Hubo un error de conexión al guardar sus resultados.");
    });
}

// ==========================================
// 4. REPORTES Y ANÁLISIS PSICOMÃ‰TRICO
// ==========================================
function generarInformeFinal(res, textoFinal, indexGlobal = null) {
    cambiarPantalla('result-screen');
    const container = document.getElementById('result-content');
    
    let html = `<h3>Desenlace: ${textoFinal}</h3>`;
    html += `<h2 style="color:var(--pnp-dark);">Puntaje Operativo Final: ${res.puntaje}</h2>`;
    
    html += `<h4>Perfil de Competencias CASEL</h4>`;
    const labels = ["Autoconciencia", "Autocontrol", "Conciencia Social", "Hab. Relacionales", "Toma de Decisiones", "ComunicaciÃ³n"];
    const keys = ["autoconciencia", "autocontrol", "social", "relacional", "decisiones", "comunicacion"];
    
    keys.forEach((k, i) => {
        // NUEVA FÃ“RMULA MATEMÃTICA: Empieza en 50%. Las decisiones buenas suman, las malas restan.
        let val = Math.max(0, Math.min(100, 50 + (res.stats[k] * 0.6)));
        let color = val > 75 ? 'var(--success)' : val > 45 ? 'var(--warning)' : 'var(--danger)';
        
        html += `
            <div class="competency-bar">
                <span style="width:140px; font-size:0.9rem; font-weight:bold;">${labels[i]}</span>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${val}%; background: ${color}"></div>
                </div>
            </div>`;
    });

    html += `<h4 style="margin-top:30px;">AnÃ¡lisis de la Secuencia TÃ¡ctica</h4><div style="text-align:left;">`;
    
    res.detalle.forEach((d, pasoIndex) => {
        let badgeClass = d.evaluacion === "IdÃ³neo" ? "bg-success" : d.evaluacion === "Oportunidad de Mejora" ? "bg-danger" : "bg-warning";
        html += `
            <div style="padding:15px; border-left:4px solid #ccc; margin-bottom:15px; background:#f9f9f9; border-radius:4px;">
                <p><strong>Fase ${pasoIndex+1} (${d.tiempo}s)</strong>: <span class="badge ${badgeClass}">${d.evaluacion}</span></p>
                <p><em>DecisiÃ³n:</em> ${d.decision}</p>
                <p style="color:#555; font-size:0.95rem;"><em>AnÃ¡lisis PsicolÃ³gico:</em> ${d.feedback}</p>`;
        
        // --- SECCIÃ“N DE COMENTARIOS ---
        if (d.comentarioInstructor) {
            html += `
                <div class="admin-comment-box">
                    <span class="admin-comment-title">ðŸ’¡ Nota del Instructor:</span>
                    <p style="margin:0; font-size:0.95rem; color:#333;">${d.comentarioInstructor}</p>
                </div>`;
        }
        
        if (usuarioActual && usuarioActual.rol === 'admin' && indexGlobal !== null) {
            let valorActual = d.comentarioInstructor ? d.comentarioInstructor : "";
            html += `
                <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;">
                    <textarea id="comentario-admin-${pasoIndex}" class="admin-textarea" placeholder="Escriba un comentario o correcciÃ³n aquÃ­...">${valorActual}</textarea>
                    <div style="margin-top:5px;">
                        <button onclick="guardarComentarioAdmin(${indexGlobal}, ${pasoIndex})" class="btn-sm" style="background:#0288d1;">Guardar Comentario</button>
                        ${d.comentarioInstructor ? `<button onclick="borrarComentarioAdmin(${indexGlobal}, ${pasoIndex})" class="btn-sm" style="background:var(--danger); margin-left:10px;">Borrar</button>` : ''}
                    </div>
                </div>`;
        }
        
        html += `</div>`; 
    });
    
    // --- LÃ“GICA CORREGIDA DEL BOTÃ“N VOLVER ---
    let accionVolver = "volverInicio()";
    let textoVolver = "â¬… Volver al MenÃº Principal";
    let botonArbol = ""; 

    if (indexGlobal !== null) {
        if (usuarioActual && usuarioActual.rol === 'admin') {
            // AHORA SIMPLEMENTE REGRESA A LA PANTALLA ADMIN Y MUESTRA LA LISTA QUE YA ESTABA CARGADA
            accionVolver = "cambiarPantalla('admin-screen')";
            textoVolver = "â¬… Volver a la Lista Anterior";
            
            botonArbol = `<button onclick="verArbolDecision(${indexGlobal})" class="btn-primary" style="background:#00b4d8; color:#000; box-shadow: 0 4px 15px rgba(0, 180, 216, 0.4);"><span style="font-size:1.2rem;">ðŸ•¸ï¸</span> Ver Mapa de Trayectoria</button>`;
        } else {
            accionVolver = "verResultadosHistorial()";
            textoVolver = "â¬… Volver a Mis Resultados";
        }
    }

    html += `</div>
    <div class="action-buttons" style="justify-content: center; margin-top: 40px; padding-bottom: 30px;">
        <button onclick="${accionVolver}" class="btn-secondary">${textoVolver}</button>
        ${botonArbol}
    </div>`;
    
    container.innerHTML = html;
}

// ==========================================
// 5. PANEL ADMIN Y VISTA DE USUARIOS
// ==========================================
// FunciÃ³n para ver el detalle exacto de una simulaciÃ³n pasada
function verDetalleGuardado(indexGlobal) {
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    let registro = resultados[indexGlobal];
    
    if(registro) {
        // Si el usuario normal abre su resultado, marcamos los comentarios nuevos como "leÃ­dos"
        if(usuarioActual.rol !== 'admin') {
            let modificado = false;
            registro.detalle.forEach(d => {
                if(d.comentarioInstructor && !d.comentarioLeido) {
                    d.comentarioLeido = true; // Activar bandera de lectura
                    modificado = true;
                }
            });
            // Si hubo cambios, guardamos y apagamos el foco
            if(modificado) {
                resultados[indexGlobal] = registro;
                localStorage.setItem('sitse_resultados', JSON.stringify(resultados));
                actualizarNotificaciones(); 
            }
        }
        
        generarInformeFinal(registro, "REVISIÃ“N DE EXPEDIENTE OPERATIVO", indexGlobal);
    }
}

function guardarComentarioAdmin(indexGlobal, pasoIndex) {
    let textarea = document.getElementById(`comentario-admin-${pasoIndex}`);
    let texto = textarea.value.trim();
    
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    if(resultados[indexGlobal] && resultados[indexGlobal].detalle[pasoIndex]) {
        resultados[indexGlobal].detalle[pasoIndex].comentarioInstructor = texto;
        resultados[indexGlobal].detalle[pasoIndex].comentarioLeido = false; // Al editarlo, vuelve a ser "no leÃ­do" para el alumno
        localStorage.setItem('sitse_resultados', JSON.stringify(resultados));
        alert("Comentario guardado correctamente.");
        verDetalleGuardado(indexGlobal); // Recargar la vista
    }
}

function borrarComentarioAdmin(indexGlobal, pasoIndex) {
    if(confirm("Â¿Eliminar este comentario?")) {
        let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
        if(resultados[indexGlobal] && resultados[indexGlobal].detalle[pasoIndex]) {
            delete resultados[indexGlobal].detalle[pasoIndex].comentarioInstructor;
            localStorage.setItem('sitse_resultados', JSON.stringify(resultados));
            verDetalleGuardado(indexGlobal); // Recargar la vista
        }
    }
}

// NUEVA FUNCIÃ“N PARA EL FOCO DE NOTIFICACIONES
function actualizarNotificaciones() {
    if(!usuarioActual || usuarioActual.rol === 'admin') return; 
    
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    let casosConComentariosNuevos = 0;
    
    resultados.forEach(r => {
        if(r.usuario === usuarioActual.cip) {
            // Solo contamos los que tienen comentario Y NO han sido leÃ­dos
            let tieneNuevo = r.detalle.some(d => d.comentarioInstructor && !d.comentarioLeido);
            if(tieneNuevo) casosConComentariosNuevos++;
        }
    });
    
    const campana = document.getElementById('notif-bell');
    const badge = document.getElementById('notif-badge');
    
    if(casosConComentariosNuevos > 0) {
        campana.style.display = 'flex';
        badge.innerText = casosConComentariosNuevos;
    } else {
        campana.style.display = 'none'; // Ocultar el foco
    }
}

function verResultadosHistorial() {
    cambiarPantalla('history-screen');
    let resultadosGlobales = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    const tbody = document.querySelector('#tabla-resultados tbody');
    tbody.innerHTML = '';
    
    for (let i = resultadosGlobales.length - 1; i >= 0; i--) {
        let r = resultadosGlobales[i];
        
        if (r.usuario === usuarioActual.cip) {
            // Solo resaltar si hay comentarios NO leÃ­dos
            let tieneComentariosNuevos = r.detalle.some(d => d.comentarioInstructor && !d.comentarioLeido);
            let claseFila = tieneComentariosNuevos ? "row-has-comment" : "";
            let indicativo = tieneComentariosNuevos ? "ðŸ’¡ " : "";
            
            tbody.innerHTML += `
                <tr class="${claseFila}">
                    <td>${r.fecha}</td>
                    <td>${indicativo}${r.caso}</td>
                    <td><strong>${r.puntaje}</strong></td>
                    <td>${r.puntaje > 150 ? 'Destacado' : 'En Desarrollo'}</td>
                    <td><button onclick="verDetalleGuardado(${i})" class="btn-sm" style="background:var(--pnp-dark);">Ver Detalle</button></td>
                </tr>`;
        }
    }
    actualizarNotificaciones(); // Refrescar el foco
}

// ==========================================
// LÃ“GICA DEL NUEVO PANEL ADMIN MULTINIVEL
// ==========================================

function verPanelAdmin() {
    cambiarPantalla('admin-screen');
    volverMenuAdmin(); // Asegura que siempre inicie en los 3 botones
}

function volverMenuAdmin() {
    document.getElementById('admin-menu').classList.remove('hidden');
    document.getElementById('admin-content').classList.add('hidden');
    document.getElementById('admin-breadcrumb').innerText = "MenÃº Principal";
}

// --- OPCIÃ“N 1: USUARIOS ---
function mostrarAdminUsuarios() {
    document.getElementById('admin-menu').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    document.getElementById('admin-breadcrumb').innerText = "MenÃº Principal > Personal Evaluado";
    
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    // AHORA LEEMOS LA LISTA DIRECTO DE LOS USUARIOS REGISTRADOS, NO DE LOS RESULTADOS
    let usuariosRegistrados = JSON.parse(localStorage.getItem('sitse_users')) || [];
    
    let html = `<h3>Seleccione un Efectivo:</h3><div style="display:flex; flex-direction:column; gap:10px;">`;
    
    if (usuariosRegistrados.length === 0) {
        html += `<p style="text-align:center; padding: 20px; background:#fff; border-radius:8px;">No hay ningÃºn usuario registrado en el sistema.</p>`;
    } else {
        usuariosRegistrados.forEach(user => {
            let totalSimulaciones = resultados.filter(r => r.usuario === user.cip).length;
            html += `<div class="admin-list-item" onclick="mostrarHistorialUsuario('${user.cip}', '${user.nombres}')">
                        <span><strong>${user.nombres}</strong> (CIP: ${user.cip})</span>
                        <span>${totalSimulaciones} simulaciones completadas âž”</span>
                     </div>`;
        });
    }
    
    html += `</div>`;
    document.getElementById('admin-dynamic-view').innerHTML = html;
}

function mostrarHistorialUsuario(cip, nombre) {
    document.getElementById('admin-breadcrumb').innerText = `MenÃº Principal > Personal Evaluado > ${nombre}`;
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    let historialUsuario = resultados.map((r, index) => ({...r, originalIndex: index})).filter(r => r.usuario === cip);
    
    let html = `<h3>Historial de: ${nombre}</h3>
                <div class="table-container"><table><thead><tr><th>Fecha</th><th>Escenario</th><th>Puntaje</th><th>AcciÃ³n</th></tr></thead><tbody>`;
    
    // SI NO TIENE REGISTROS, MOSTRAMOS EL MENSAJE
    if (historialUsuario.length === 0) {
        html += `<tr><td colspan="4" style="text-align:center; color: var(--accent); font-weight:bold;">NO HAY REGISTROS DE SIMULACIÃ“N PARA ESTE USUARIO.</td></tr>`;
    } else {
        historialUsuario.reverse().forEach(r => {
            html += `<tr>
                        <td>${r.fecha}</td><td>${r.caso}</td><td><strong>${r.puntaje}</strong></td>
                        <td><button onclick="verDetalleGuardado(${r.originalIndex})" class="btn-sm">Ver Detalle</button></td>
                     </tr>`;
        });
    }
    
    html += `</tbody></table></div>
             <div class="action-buttons"><button onclick="mostrarAdminUsuarios()" class="btn-secondary">â¬… Volver a la lista de usuarios</button></div>`;
             
    document.getElementById('admin-dynamic-view').innerHTML = html;
}

// --- OPCIÃ“N 2: RANKING GLOBAL ---
function mostrarAdminListaCasos() {
    document.getElementById('admin-menu').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    document.getElementById('admin-breadcrumb').innerText = "MenÃº Principal > Ranking Global";
    
    let html = `<h3>Seleccione un Simulador para ver el Ranking:</h3><div style="display:flex; flex-direction:column; gap:10px;">`;
    Object.keys(baseDatosCasos).forEach(id => {
        html += `<div class="admin-list-item" onclick="mostrarRankingGlobal('${baseDatosCasos[id].titulo}')">
                    <span><strong>${baseDatosCasos[id].titulo}</strong></span>
                    <span>Ver Tabla âž”</span>
                 </div>`;
    });
    html += `</div>`;
    document.getElementById('admin-dynamic-view').innerHTML = html;
}

function mostrarRankingGlobal(tituloCaso) {
    document.getElementById('admin-breadcrumb').innerText = `MenÃº Principal > Ranking Global > ${tituloCaso}`;
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    let filtrados = resultados.filter(r => r.caso === tituloCaso).sort((a, b) => b.puntaje - a.puntaje);
    
    let html = `<h3>Ranking: ${tituloCaso}</h3>
                <div class="table-container"><table><thead><tr><th>Puesto</th><th>Personal</th><th>CIP</th><th>Puntaje</th></tr></thead><tbody>`;
    
    if (filtrados.length === 0) {
        html += `<tr><td colspan="4" style="text-align:center; color: var(--accent); font-weight:bold;">NO HAY REGISTROS EN ESTE SIMULADOR.</td></tr>`;
    } else {
        filtrados.forEach((r, index) => {
            let claseFila = index === 0 ? "rank-1" : index === 1 ? "rank-2" : index === 2 ? "rank-3" : index < 10 ? "rank-top10" : "rank-normal";
            let trofeo = index === 0 ? "ðŸ†" : index === 1 ? "ðŸ¥ˆ" : index === 2 ? "ðŸ¥‰" : `${index + 1}Â°`;
            html += `<tr class="${claseFila}">
                        <td>${trofeo}</td><td>${r.nombre}</td><td>${r.usuario}</td><td>${r.puntaje} pts</td>
                     </tr>`;
        });
    }
    
    html += `</tbody></table></div>
             <div class="action-buttons"><button onclick="mostrarAdminListaCasos()" class="btn-secondary">â¬… Volver a simuladores</button></div>`;
             
    document.getElementById('admin-dynamic-view').innerHTML = html;
}

// --- OPCIÃ“N 3: RANKING POR COMPETENCIAS ---
function mostrarAdminListaCompetencias() {
    document.getElementById('admin-menu').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    document.getElementById('admin-breadcrumb').innerText = "MenÃº Principal > Ranking por Competencias";
    
    const competencias = [
        { id: 'autoconciencia', nombre: 'Autoconciencia' },
        { id: 'autocontrol', nombre: 'Autocontrol' },
        { id: 'social', nombre: 'Conciencia Social' },
        { id: 'relacional', nombre: 'Habilidades Relacionales' },
        { id: 'decisiones', nombre: 'Toma de Decisiones' },
        { id: 'comunicacion', nombre: 'ComunicaciÃ³n Asertiva' }
    ];

    let html = `<h3>Seleccione una Competencia CASEL:</h3><div style="display:flex; flex-direction:column; gap:10px;">`;
    competencias.forEach(comp => {
        html += `<div class="admin-list-item" onclick="mostrarRankingCompetencia('${comp.id}', '${comp.nombre}')">
                    <span><strong>${comp.nombre}</strong></span>
                    <span>Ver LÃ­deres âž”</span>
                 </div>`;
    });
    html += `</div>`;
    document.getElementById('admin-dynamic-view').innerHTML = html;
}

function mostrarRankingCompetencia(idComp, nombreComp) {
    document.getElementById('admin-breadcrumb').innerText = `MenÃº Principal > Ranking por Competencias > ${nombreComp}`;
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    
    let promedios = {};
    resultados.forEach(r => {
        if(!promedios[r.usuario]) promedios[r.usuario] = { nombre: r.nombre, total: 0, cuenta: 0 };
        promedios[r.usuario].total += r.stats[idComp];
        promedios[r.usuario].cuenta += 1;
    });

    let ranking = Object.keys(promedios).map(cip => ({
        cip: cip,
        nombre: promedios[cip].nombre,
        promedio: (promedios[cip].total / promedios[cip].cuenta).toFixed(1)
    })).sort((a, b) => b.promedio - a.promedio);

    let html = `<h3>LÃ­deres en: ${nombreComp}</h3>
                <div class="table-container"><table><thead><tr><th>Puesto</th><th>Personal</th><th>Promedio HistÃ³rico</th></tr></thead><tbody>`;
    
    if (ranking.length === 0) {
        html += `<tr><td colspan="3" style="text-align:center; color: var(--accent); font-weight:bold;">NO HAY REGISTROS EVALUADOS AÃšN.</td></tr>`;
    } else {
        ranking.forEach((r, index) => {
            let claseFila = index === 0 ? "rank-1" : index === 1 ? "rank-2" : index === 2 ? "rank-3" : index < 10 ? "rank-top10" : "rank-normal";
            let trofeo = index === 0 ? "ðŸ†" : index === 1 ? "ðŸ¥ˆ" : index === 2 ? "ðŸ¥‰" : `${index + 1}Â°`;
            html += `<tr class="${claseFila}">
                        <td>${trofeo}</td><td>${r.nombre} (CIP: ${r.cip})</td><td>${r.promedio} pts</td>
                     </tr>`;
        });
    }
    
    html += `</tbody></table></div>
             <div class="action-buttons"><button onclick="mostrarAdminListaCompetencias()" class="btn-secondary">â¬… Volver a competencias</button></div>`;
             
    document.getElementById('admin-dynamic-view').innerHTML = html;
}

function borrarRegistroAdmin(indexReal) {
    if(confirm("Â¿Eliminar este expediente operativo permanentemente?")) {
        let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
        // Al estar ordenado, el index no coincide directo, habrÃ­a que buscar el ID, pero simplificamos para la demo:
        resultados.splice(indexReal, 1); 
        localStorage.setItem('sitse_resultados', JSON.stringify(resultados));
        verPanelAdmin();
    }
}

// Configurar tecla ENTER e inicializar UI al cargar la pÃ¡gina
window.onload = function() {
    renderizarCasos();
    
    // Recuperar sesiÃ³n si existe (evita que el F5 te saque)
    let savedUser = localStorage.getItem('sitse_currentUser');
    if(savedUser) {
        usuarioActual = JSON.parse(savedUser);
        
        // PARCHE: Si por error de cachÃ© el navegador guardÃ³ al admin antiguo, lo corregimos a la fuerza
        if(usuarioActual.rol === 'admin') {
            usuarioActual.cip = ADMIN_CRED.cip;
            localStorage.setItem('sitse_currentUser', JSON.stringify(usuarioActual));
        }

        document.getElementById('login-screen').classList.add('hidden'); // Ocultar login
        iniciarSesionUI();
    }

    // Eventos ENTER para Login
    document.getElementById('input-cip').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') intentarLogin();
    });
    document.getElementById('input-dni').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') intentarLogin();
    });
};

// --- OPCIÃ“N 4: GESTIÃ“N DE DATOS Y BORRADO MASIVO ---
function mostrarAdminGestionDatos() {
    document.getElementById('admin-menu').classList.add('hidden');
    document.getElementById('admin-content').classList.remove('hidden');
    document.getElementById('admin-breadcrumb').innerText = "MenÃº Principal > GestiÃ³n de Registros";
    
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    
    let html = `<h3>Base de Datos de Simulaciones</h3>
                <div style="display:flex; gap:15px; margin-bottom: 20px;">
                    <button onclick="borrarSeleccionados()" class="btn-primary" style="background:var(--warning); color:#000; box-shadow:none;">ðŸ—‘ï¸ Borrar Seleccionados</button>
                    <button onclick="vaciarBaseDatos()" class="btn-primary" style="background:var(--danger); box-shadow:none;">âš ï¸ Vaciar Toda la Base</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 50px; text-align: center;">
                                    <input type="checkbox" id="chk-all" onclick="toggleSelectAll()" style="transform: scale(1.5); cursor:pointer;">
                                </th>
                                <th>Fecha</th>
                                <th>Personal (CIP)</th>
                                <th>Escenario</th>
                                <th>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    // Necesitamos el Ã­ndice original para borrar exactamente ese registro
    let resultadosConIndex = resultados.map((r, index) => ({...r, originalIndex: index}));
    
    // Mostrar del mÃ¡s nuevo al mÃ¡s viejo
    resultadosConIndex.reverse().forEach(r => {
        html += `<tr>
                    <td style="text-align: center;">
                        <input type="checkbox" class="chk-record" value="${r.originalIndex}" style="transform: scale(1.3); cursor:pointer;">
                    </td>
                    <td>${r.fecha}</td>
                    <td><strong>${r.nombre}</strong><br><small>CIP: ${r.usuario}</small></td>
                    <td>${r.caso}</td>
                    <td><strong>${r.puntaje}</strong></td>
                 </tr>`;
    });
    
    if(resultados.length === 0) {
        html += `<tr><td colspan="5" style="text-align:center;">La base de datos estÃ¡ vacÃ­a.</td></tr>`;
    }

    html += `</tbody></table></div>
             <div class="action-buttons"><button onclick="volverMenuAdmin()" class="btn-secondary">â¬… Volver al MenÃº Principal</button></div>`;
             
    document.getElementById('admin-dynamic-view').innerHTML = html;
}

function toggleSelectAll() {
    let chkAll = document.getElementById('chk-all').checked;
    let checkboxes = document.querySelectorAll('.chk-record');
    checkboxes.forEach(chk => chk.checked = chkAll);
}

function borrarSeleccionados() {
    let checkboxes = document.querySelectorAll('.chk-record:checked');
    if(checkboxes.length === 0) {
        alert("Seleccione al menos un registro de la lista para borrar.");
        return;
    }
    
    if(confirm(`Â¿EstÃ¡ seguro de eliminar ${checkboxes.length} registro(s)? Esta acciÃ³n actualizarÃ¡ los rankings y no se puede deshacer.`)) {
        let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
        
        // Obtener los Ã­ndices a borrar y ordenarlos de mayor a menor 
        // (Es vital borrar de atrÃ¡s hacia adelante para que no se muevan las posiciones del array)
        let indices = Array.from(checkboxes).map(chk => parseInt(chk.value));
        indices.sort((a, b) => b - a);
        
        indices.forEach(idx => {
            resultados.splice(idx, 1);
        });
        
        localStorage.setItem('sitse_resultados', JSON.stringify(resultados));
        mostrarAdminGestionDatos(); // Refrescar la tabla automÃ¡ticamente
    }
}

function vaciarBaseDatos() {
    if(confirm("Â¡ADVERTENCIA CRÃTICA!\n\nÂ¿EstÃ¡ absolutamente seguro de querer VACIAR TODA LA BASE DE DATOS?\nSe perderÃ¡n todos los resultados y rankings de TODOS los usuarios.")) {
        let checkExtra = prompt("Escriba la palabra 'BORRAR' (en mayÃºsculas) para confirmar:");
        if(checkExtra === 'BORRAR') {
            localStorage.removeItem('sitse_resultados'); // Elimina la clave completa
            alert("La base de datos ha sido vaciada exitosamente.");
            mostrarAdminGestionDatos(); // Refrescar la tabla
        } else {
            alert("Palabra incorrecta. OperaciÃ³n cancelada por seguridad.");
        }
    }
}

// ==========================================
// GENERADOR DE DIAGRAMA DE FLUJO (Detroit Style)
// ==========================================
function verArbolDecision(indexGlobal) {
    let resultados = JSON.parse(localStorage.getItem('sitse_resultados')) || [];
    let registro = resultados[indexGlobal];
    
    if(!registro) return;

    const container = document.getElementById('tree-container');
    container.innerHTML = ''; 
    
    registro.detalle.forEach((paso, index) => {
        let claseEval = paso.evaluacion.replace(/\s+/g, '');
        let ramasHtml = '';
        
        // Verificamos si la simulaciÃ³n guardÃ³ las opciones (para los casos nuevos)
        if(paso.opcionesDisponibles && paso.opcionesDisponibles.length > 0) {
            paso.opcionesDisponibles.forEach(opt => {
                // Comparamos si esta fue la opciÃ³n que el alumno eligiÃ³
                let isChosen = (paso.decision === opt.texto) || (paso.decision.includes("NINGUNA") && paso.evaluacion === opt.tipo);
                
                if(isChosen) {
                    ramasHtml += `
                        <div class="tree-node-option tree-node-chosen ${claseEval}">
                            <span style="font-size:0.7rem; color:#00ff00;">â–¶ RUTA ELEGIDA</span><br>
                            ${opt.texto}
                        </div>`;
                } else {
                    ramasHtml += `
                        <div class="tree-node-option tree-node-unchosen">
                            <span style="font-size:0.7rem; color:#888;">â–· Ruta descartada</span><br>
                            ${opt.texto}
                        </div>`;
                }
            });
        } else {
            // Fallback por si intentan ver simulaciones viejas donde aÃºn no guardÃ¡bamos las opciones extra
            ramasHtml += `
                <div class="tree-node-option tree-node-chosen ${claseEval}">
                    <strong>AcciÃ³n Tomada:</strong><br>${paso.decision}
                </div>
                <div class="tree-node-option tree-node-unchosen">Rutas descartadas no registradas en versiones anteriores.</div>`;
        }

        let htmlNodo = `
            <div class="tree-step">
                <div class="tree-scene"><strong style="color:#00b4d8;">FASE ${index + 1}</strong><br><br>${paso.situacion.substring(0, 150)}...</div>
                <div class="tree-branches">
                    ${ramasHtml}
                </div>
            </div>
        `;
        container.innerHTML += htmlNodo;
    });

    document.getElementById('tree-modal').style.display = 'flex';
    document.getElementById('tree-modal').classList.remove('hidden');
}

function cerrarArbol() {
    document.getElementById('tree-modal').style.display = 'none';
    document.getElementById('tree-modal').classList.add('hidden');

}

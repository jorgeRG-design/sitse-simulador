const baseDatosCasos = {
    // =========================================================================
    // CASO 1: DISTURBIO Y CONTROL DE MASAS (10 NIVELES DE PROFUNDIDAD)
    // =========================================================================
    'caso1': {
        titulo: "CASO 1: DISTURBIO URBANO SEVERO",
        videoBase: "Videos/conflictoDisturbio.mp4", // Asegúrate de que la carpeta y nombre coincidan
        imagenBase: "Imagenes/imagenConflicto.png", // Puedes mantenerlo como respaldo
        escenas: {
            // NIVEL 1
            'inicio': {
                texto: "NIVEL 1: 30 manifestantes bloquean una vía principal. Un sujeto exaltado se te acerca a 50cm gritando insultos personales mientras la turba se agita y la prensa graba.",
                opciones: [
                    { texto: "Mantener línea, postura pasiva y ordenar despeje legal por megáfono.", sig: "C1_L2_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 0, decisiones: 10, comunicacion: 10 }, feedback: "Estableciste la base legal sin ceder a la provocación." },
                    { texto: "Acercarte pecho a pecho para imponer autoridad.", sig: "C1_L2_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -5, autocontrol: -5, social: -10, relacional: -5, decisiones: -5, comunicacion: -5 }, feedback: "Perdiste la distancia táctica y escalaste la tensión." }
                ]
            },
            // NIVEL 2
            'C1_L2_A': {
                texto: "NIVEL 2: Al mantenerte firme, el sujeto escupe a tus botas y lanza una botella de vidrio hacia tu escuadra.",
                opciones: [
                    { texto: "Aislar al agresor e intentar detención táctica selectiva.", sig: "C1_L3_A", tipo: "Idóneo", stats: { autoconciencia: 5, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 5 }, feedback: "Aislaste la amenaza en lugar de atacar a toda la masa." },
                    { texto: "Ignorarlo para no avivar a la turba.", sig: "C1_L3_B", tipo: "En Progreso", stats: { autoconciencia: 5, autocontrol: 5, social: 0, relacional: -5, decisiones: -5, comunicacion: 0 }, feedback: "Dejar un delito flagrante impune reduce tu autoridad." }
                ]
            },
            'C1_L2_B': {
                texto: "NIVEL 2: El sujeto te empuja alegando agresión policial. La turba rodea a tu escuadra, reduciendo tu espacio a menos de 1 metro.",
                opciones: [
                    { texto: "Ordenar repliegue inmediato para reformar la línea.", sig: "C1_L3_A", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 5, social: 5, relacional: 5, decisiones: 10, comunicacion: 5 }, feedback: "Corregiste tu error recuperando distancia." },
                    { texto: "Usar la vara para abrir espacio a la fuerza.", sig: "C1_L3_C", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -5, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: 0 }, feedback: "El contacto físico en desventaja numérica es un error crítico." }
                ]
            },
            // NIVEL 3
            'C1_L3_A': {
                texto: "NIVEL 3: De pronto, 10 sujetos encapuchados salen del grupo armados con palos largos y avanzan hacia ti.",
                opciones: [
                    { texto: "Formar muro de escudos (Táctica Tortuga).", sig: "C1_L4_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Absorber el impacto protege a tu unidad." },
                    { texto: "Disparar granadas de gas lacrimógeno directamente a sus cuerpos.", sig: "C1_L4_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: 0, autocontrol: -5, social: -10, relacional: 0, decisiones: -10, comunicacion: -5 }, feedback: "El gas directo al cuerpo es letal y está prohibido." }
                ]
            },
            'C1_L3_B': {
                texto: "NIVEL 3: La impunidad los envalentona. Comienzan a saquear un local cercano.",
                opciones: [
                    { texto: "Carga frontal inmediata para detener el saqueo.", sig: "C1_L4_C", tipo: "En Progreso", stats: { autoconciencia: -5, autocontrol: 0, social: -5, relacional: 0, decisiones: -5, comunicacion: 0 }, feedback: "Maniobra riesgosa causada por tu inacción previa." },
                    { texto: "Filmar a los saqueadores y pedir refuerzos USE.", sig: "C1_L4_A", tipo: "Aceptable", stats: { autoconciencia: 5, autocontrol: 10, social: 5, relacional: 5, decisiones: 5, comunicacion: 5 }, feedback: "Evitaste una masacre, pero perdiste el control del orden público." }
                ]
            },
            'C1_L3_C': {
                texto: "NIVEL 3: El caos estalla. Te arrancan un escudo y golpean a un oficial dejándolo inconsciente en el piso.",
                opciones: [
                    { texto: "Cubrir al oficial caído y usar gas en spray 360 grados.", sig: "C1_L4_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 5, social: 10, relacional: 10, decisiones: 10, comunicacion: 0 }, feedback: "Control de daños. Proteger la vida del compañero es prioridad." },
                    { texto: "Sacar tu arma letal y realizar disparos al aire.", sig: "C1_L4_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Disparos al aire en zona urbana: Falta muy grave." }
                ]
            },
            // NIVEL 4
            'C1_L4_A': {
                texto: "NIVEL 4: La situación se estanca. Los vándalos te arrojan pintura a los visores de los cascos, dejándolos casi ciegos.",
                opciones: [
                    { texto: "Mantener la formación guiados por el tacto y voz.", sig: "C1_L5_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Máximo autocontrol y trabajo en equipo." },
                    { texto: "Romper formación y quitarse los cascos para ver.", sig: "C1_L5_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -5, relacional: -10, decisiones: -10, comunicacion: -5 }, feedback: "Quitarse el equipo protector en un disturbio es un suicidio táctico." }
                ]
            },
            'C1_L4_B': {
                texto: "NIVEL 4: Tus acciones violentas provocan una estampida. Un civil es pisoteado y sufre un paro cardíaco.",
                opciones: [
                    { texto: "Frenar la intervención y correr a realizarle RCP.", sig: "C1_L5_C", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 5, social: 10, relacional: 5, decisiones: 5, comunicacion: 0 }, feedback: "Intentas reparar el daño letal que tu mala praxis causó." },
                    { texto: "Dejarlo y perseguir a los que te quitaron el escudo.", sig: "C1_L5_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Omisión de socorro. Delito penal grave." }
                ]
            },
            'C1_L4_C': {
                texto: "NIVEL 4: Logras repeler a la masa, pero tu equipo está exhausto y herido. La prensa se te acerca exigiendo respuestas.",
                opciones: [
                    { texto: "Delegar a un vocero y ordenar a tu equipo rehidratarse.", sig: "C1_L5_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Buen manejo de crisis y cuidado de tu personal." },
                    { texto: "Gritarle a la prensa que no estorbe.", sig: "C1_L5_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -5, comunicacion: -10 }, feedback: "Perdiste el control emocional frente a las cámaras." }
                ]
            },
            // NIVEL 5
            'C1_L5_A': {
                texto: "NIVEL 5: Llegan refuerzos de USE. Un comandante te pregunta si los manifestantes están armados letalmente.",
                opciones: [
                    { texto: "Dar un reporte objetivo: 'Armas contundentes y pintura, sin fuego'.", sig: "C1_L6_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Comunicación precisa que previene el uso excesivo de fuerza por parte del apoyo." },
                    { texto: "Exagerar diciendo: 'Nos quieren matar a todos, entren con todo'.", sig: "C1_L6_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -5, social: -10, relacional: -5, decisiones: -10, comunicacion: -10 }, feedback: "Infundir pánico en tropas de apoyo causará una tragedia." }
                ]
            },
            'C1_L5_B': {
                texto: "NIVEL 5: Al quitarte el casco, recibes una pedrada en la frente. Empiezas a sangrar profusamente.",
                opciones: [
                    { texto: "Entregar el mando a tu segundo y evacuarte.", sig: "C1_L6_C", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Reconocer tu incapacidad física protege a la misión." },
                    { texto: "Seguir al mando sangrando para no 'mostrar debilidad'.", sig: "C1_L6_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -5, social: 0, relacional: -5, decisiones: -10, comunicacion: -5 }, feedback: "El ego policial por encima de la eficiencia. Estás comprometiendo la operación." }
                ]
            },
            'C1_L5_C': {
                texto: "NIVEL 5: Mientras haces RCP, la turba regresa y te empieza a lanzar piedras por la espalda.",
                opciones: [
                    { texto: "Proteger al paciente con tu cuerpo mientras tu equipo cubre.", sig: "C1_L6_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 5 }, feedback: "Heroísmo táctico. Salvar una vida asumiendo el riesgo." },
                    { texto: "Abandonar al herido y correr a la patrulla.", sig: "C1_L6_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Cobardía extrema y negligencia letal." }
                ]
            },
            'C1_L5_D': {
                texto: "NIVEL 5: Tu descontrol es total. Un fiscal de prevención del delito aparece y te ordena detener el operativo por vulneración de DDHH.",
                opciones: [
                    { texto: "Acatar la orden fiscal inmediatamente y replegar.", sig: "C1_L6_D", tipo: "Aceptable", stats: { autoconciencia: 5, autocontrol: 5, social: 5, relacional: 5, decisiones: 5, comunicacion: 5 }, feedback: "Al menos respetas la autoridad competente tras el desastre." },
                    { texto: "Discutir con el fiscal alegando que tú mandas en la calle.", sig: "C1_L6_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Desacato y suma de delitos penales." }
                ]
            },
            // NIVEL 6
            'C1_L6_A': {
                texto: "NIVEL 6: La USE despeja la vía. Tu unidad es enviada a la comisaría a procesar 5 detenidos.",
                opciones: [
                    { texto: "Garantizar que pasen médico legista sin demoras.", sig: "C1_L7_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Garantía de derechos humanos que blinda tu intervención." },
                    { texto: "Dejarlos esposados en el patio como castigo por dos horas.", sig: "C1_L7_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -5, decisiones: -10, comunicacion: -5 }, feedback: "Tratos crueles o degradantes anularán el caso fiscal." }
                ]
            },
            'C1_L6_B': {
                texto: "NIVEL 6: Por tus malos reportes, un oficial dispara un perdigón y le vacía el ojo a un joven estudiante.",
                opciones: [
                    { texto: "Informar la verdad a Inspectoría asumiendo tu culpa en la desinformación.", sig: "C1_L7_C", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "La ética post-incidente es crucial para la investigación." },
                    { texto: "Elaborar un parte falso diciendo que el joven estaba armado.", sig: "C1_L7_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Falsedad ideológica y encubrimiento." }
                ]
            },
            'C1_L6_C': {
                texto: "NIVEL 6: Llegas al hospital (tú o el civil herido). La prensa entra a emergencias buscando la primicia.",
                opciones: [
                    { texto: "Pedir al personal de seguridad del hospital que los retire educadamente.", sig: "C1_L7_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Proteges la privacidad usando los canales correctos." },
                    { texto: "Agarrar la cámara del periodista para que no grabe sangre.", sig: "C1_L7_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -5, autocontrol: -10, social: -5, relacional: -10, decisiones: -5, comunicacion: -10 }, feedback: "Atentado contra la libertad de prensa que empeora tu imagen." }
                ]
            },
            'C1_L6_D': {
                texto: "NIVEL 6: Estás en la oficina del Fiscal. Te leen tus derechos por los excesos cometidos en el operativo.",
                opciones: [
                    { texto: "Guardar silencio y solicitar abogado de la Defensoría Policial.", sig: "C1_L7_D", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 5, decisiones: 10, comunicacion: 10 }, feedback: "Conoces tus derechos procesales tras un fracaso operativo." },
                    { texto: "Llorar y echarle la culpa a los altos mandos.", sig: "C1_L7_D", tipo: "En Progreso", stats: { autoconciencia: -10, autocontrol: -10, social: -5, relacional: -10, decisiones: -5, comunicacion: -10 }, feedback: "Falta de inteligencia emocional y madurez profesional." }
                ]
            },
            // NIVEL 7
            'C1_L7_A': {
                texto: "NIVEL 7: El proceso administrativo va bien. Tu Comisario te pide redactar el Informe Policial final.",
                opciones: [
                    { texto: "Redactar detallando el Modelo de Uso de la Fuerza usado.", sig: "C1_L8_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Sustento técnico-legal impecable." },
                    { texto: "Redactar algo breve para 'no complicarse'.", sig: "C1_L8_B", tipo: "En Progreso", stats: { autoconciencia: 0, autocontrol: 0, social: 0, relacional: 0, decisiones: -5, comunicacion: -10 }, feedback: "La pereza administrativa debilita el caso en fiscalía." }
                ]
            },
            'C1_L7_B': {
                texto: "NIVEL 7: Un video de tus malas acciones se vuelve viral en TikTok. El Comando te llama a declarar.",
                opciones: [
                    { texto: "Aceptar la falta y aceptar una capacitación psicológica CASEL.", sig: "C1_L8_C", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Asumir el error es el primer paso para corregirlo." },
                    { texto: "Decir que el video está editado.", sig: "C1_L8_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Mentir agrava la sanción disciplinaria." }
                ]
            },
            'C1_L7_C': {
                texto: "NIVEL 7: El civil pierde el ojo. Las ONG de DDHH inician marchas pidiendo tu destitución y cárcel.",
                opciones: [
                    { texto: "No declarar públicamente y seguir la estrategia legal de tu abogado.", sig: "C1_L8_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Prudencia ante el linchamiento mediático." },
                    { texto: "Publicar en tu Facebook personal insultos contra las ONG.", sig: "C1_L8_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Autosabotaje puro." }
                ]
            },
            'C1_L7_D': {
                texto: "NIVEL 7: La situación es insalvable. Inspectoría recomienda tu pase al retiro por medida disciplinaria.",
                opciones: [
                    { texto: "Aceptar la resolución con dignidad y buscar otra profesión.", sig: "C1_L8_D", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 5, decisiones: 10, comunicacion: 5 }, feedback: "El único final lógico para una cadena de errores graves." }
                ]
            },
            // NIVEL 8
            'C1_L8_A': { texto: "NIVEL 8: El Fiscal felicita tu redacción. Los delincuentes reciben prisión preventiva.", opciones: [{ texto: "Continuar a evaluación de desempeño.", sig: "C1_L9_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Tu trabajo técnico garantizó la justicia." }] },
            'C1_L8_B': { texto: "NIVEL 8: Por tu reporte pobre, el Juez libera a los agresores por 'falta de pruebas'.", opciones: [{ texto: "Afrontar la frustración.", sig: "C1_L9_B", tipo: "En Progreso", stats: { autoconciencia: 5, autocontrol: 5, social: 0, relacional: 0, decisiones: 5, comunicacion: 0 }, feedback: "El trabajo mal documentado favorece la impunidad." }] },
            'C1_L8_C': { texto: "NIVEL 8: Eres reasignado a labores administrativas mientras dura la investigación fiscal.", opciones: [{ texto: "Aceptar la sanción temporal.", sig: "C1_L9_C", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 5, decisiones: 10, comunicacion: 5 }, feedback: "Consecuencia lógica de una intervención con observaciones." }] },
            'C1_L8_D': { texto: "NIVEL 8: Se emite la resolución de tu baja de la institución.", opciones: [{ texto: "Firmar la notificación.", sig: "C1_L9_D", tipo: "Aceptable", stats: { autoconciencia: 5, autocontrol: 5, social: 5, relacional: 5, decisiones: 5, comunicacion: 5 }, feedback: "Fin de la carrera policial." }] },
            // NIVEL 9
            'C1_L9_A': { texto: "NIVEL 9: El Comando te propone para un ascenso por acción distinguida.", opciones: [{ texto: "Finalizar Simulación.", sig: "final_c1_exito", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Excelencia." }] },
            'C1_L9_B': { texto: "NIVEL 9: Te envían a un curso de reentrenamiento en redacción policial.", opciones: [{ texto: "Finalizar Simulación.", sig: "final_c1_regular", tipo: "Aceptable", stats: { autoconciencia: 5, autocontrol: 5, social: 5, relacional: 5, decisiones: 5, comunicacion: 5 }, feedback: "Debes mejorar tu trabajo de escritorio." }] },
            'C1_L9_C': { texto: "NIVEL 9: Afrontas el juicio oral por lesiones graves.", opciones: [{ texto: "Finalizar Simulación.", sig: "final_c1_juicio", tipo: "En Progreso", stats: { autoconciencia: 0, autocontrol: 0, social: 0, relacional: 0, decisiones: 0, comunicacion: 0 }, feedback: "Las malas decisiones tácticas te llevan a los tribunales." }] },
            'C1_L9_D': { texto: "NIVEL 9: El caso penal continúa y podrías ir a prisión efectiva.", opciones: [{ texto: "Finalizar Simulación.", sig: "final_c1_carcel", tipo: "Oportunidad de Mejora", stats: { autoconciencia: 0, autocontrol: 0, social: 0, relacional: 0, decisiones: 0, comunicacion: 0 }, feedback: "El fracaso absoluto de las competencias CASEL." }] },
            // NIVEL 10 (FINALES)
            'final_c1_exito': { texto: "RESULTADO: OPERACIÓN PERFECTA. Manejo impecable de crisis, uso de la fuerza y documentación.", final: true },
            'final_c1_regular': { texto: "RESULTADO: APTO CON OBSERVACIONES. Táctica buena, pero deficiencias administrativas.", final: true },
            'final_c1_juicio': { texto: "RESULTADO: INTERVENCIÓN DEFICIENTE. Tu falta de tacto generó heridos y enfrentas procesos penales.", final: true },
            'final_c1_carcel': { texto: "RESULTADO: EXPULSIÓN Y PRISIÓN. Vulneraste todos los protocolos de DDHH y perdiste tu carrera.", final: true }
        }
    },

    // =========================================================================
    // CASO 2: VIOLENCIA FAMILIAR EN PROCESO (10 NIVELES DE PROFUNDIDAD)
    // =========================================================================
    'caso2': {
        titulo: "CASO 2: VIOLENCIA FAMILIAR EXTREMA",
        videoBase: "Videos/violenciaFamiliar.mp4",
        imagenBase: "Imagenes/imagenViolencia.png",
        escenas: {
            // NIVEL 1
            'inicio': {
                texto: "NIVEL 1: Llegas a un departamento. Gritos de auxilio de mujer y hombre rompiendo cosas. La puerta está entreabierta.",
                opciones: [
                    { texto: "Ingreso táctico inmediato anunciando '¡POLICÍA!'.", sig: "C2_L2_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 5, social: 5, relacional: 5, decisiones: 10, comunicacion: 10 }, feedback: "En flagrancia, el ingreso rápido es legal y necesario." },
                    { texto: "Tocar la puerta y esperar en el pasillo.", sig: "C2_L2_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -5, autocontrol: 0, social: -10, relacional: 0, decisiones: -10, comunicacion: 0 }, feedback: "Esperar puede ser fatal para la víctima." }
                ]
            },
            // NIVEL 2
            'C2_L2_A': {
                texto: "NIVEL 2: Entras. El agresor acorrala a la mujer ensangrentada y grita: '¡Lárguense!'.",
                opciones: [
                    { texto: "Mantener distancia y usar verbalización asertiva.", sig: "C2_L3_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Priorizas desescalar el conflicto antes de usar la fuerza física." },
                    { texto: "Abalanzarse sobre él para reducirlo físicamente de inmediato.", sig: "C2_L3_C", tipo: "En Progreso", stats: { autoconciencia: -5, autocontrol: -5, social: -5, relacional: -5, decisiones: 0, comunicacion: -5 }, feedback: "El contacto apresurado puede ser peligroso si está armado." }
                ]
            },
            'C2_L2_B': {
                texto: "NIVEL 2: Escuchas un golpe seco y silencio total.",
                opciones: [
                    { texto: "Patear la puerta y entrar con arma desenfundada.", sig: "C2_L3_B", tipo: "En Progreso", stats: { autoconciencia: 5, autocontrol: 0, social: 5, relacional: 0, decisiones: 5, comunicacion: 0 }, feedback: "Reacción tardía por mala decisión inicial." },
                    { texto: "Seguir tocando el timbre.", sig: "C2_L3_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Negligencia inexcusable." }
                ]
            },
            // NIVEL 3
            'C2_L3_A': {
                texto: "NIVEL 3: El sujeto ignora tus palabras. La mujer, llorando, dice: 'No se lo lleven, es buen padre'.",
                opciones: [
                    { texto: "Ignorar petición y proceder con detención de oficio.", sig: "C2_L4_A", tipo: "Idóneo", stats: { autoconciencia: 5, autocontrol: 5, social: 0, relacional: -5, decisiones: 10, comunicacion: 5 }, feedback: "La violencia es de oficio, no se puede conciliar." },
                    { texto: "Dudar y decirle: 'Si se calma no lo detenemos'.", sig: "C2_L4_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: 0, social: -10, relacional: 5, decisiones: -10, comunicacion: 0 }, feedback: "Error crítico. Conciliar es ilegal." }
                ]
            },
            'C2_L3_B': {
                texto: "NIVEL 3: Entras y ves a la mujer inconsciente en el piso. El agresor salta por la ventana a un techo bajo.",
                opciones: [
                    { texto: "Dejar que escape y brindar primeros auxilios a la víctima.", sig: "C2_L4_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "La vida de la víctima es superior a la captura del sospechoso." },
                    { texto: "Dejar a la mujer tirada y saltar por la ventana a perseguirlo.", sig: "C2_L4_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Abandono de persona en peligro." }
                ]
            },
            'C2_L3_C': {
                texto: "NIVEL 3: El sujeto es muy fuerte, rompe una botella y amenaza con apuñalarte con el gollete.",
                opciones: [
                    { texto: "Desenfundar arma de fuego y ordenar soltar la botella.", sig: "C2_L4_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 5, relacional: 5, decisiones: 10, comunicacion: 10 }, feedback: "Uso proporcional de la fuerza letal justificada." },
                    { texto: "Intentar desarmarlo con tu vara de goma.", sig: "C2_L4_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -5, autocontrol: -5, social: -5, relacional: 0, decisiones: -10, comunicacion: -5 }, feedback: "Subestimaste el riesgo vital." }
                ]
            },
            'C2_L3_D': {
                texto: "NIVEL 3: Los vecinos graban tu inacción. Llega serenazgo y ellos abren la puerta.",
                opciones: [
                    { texto: "Entrar detrás de serenazgo e inventar excusa.", sig: "C2_L4_D", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -10, autocontrol: -10, social: -10, relacional: -10, decisiones: -10, comunicacion: -10 }, feedback: "Vergüenza institucional total." }
                ]
            },
            // NIVEL 4
            'C2_L4_A': {
                texto: "NIVEL 4: Al esposarlo, se resiste. Un niño de 6 años sale llorando y abraza tu pierna: '¡Papá no!'.",
                opciones: [
                    { texto: "Pausa táctica, pedir a tu compañero que contenga al niño suavemente y proceder.", sig: "C2_L5_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 5, decisiones: 10, comunicacion: 5 }, feedback: "Manejo ejemplar del trauma infantil en la escena." },
                    { texto: "Apartar bruscamente al niño y reducir duro al padre.", sig: "C2_L5_B", tipo: "Oportunidad de Mejora", stats: { autoconciencia: -5, autocontrol: -5, social: -10, relacional: -10, decisiones: -5, comunicacion: -5 }, feedback: "Falta total de conciencia social hacia un menor." }
                ]
            },
            'C2_L4_B': {
                texto: "NIVEL 4: Te retiras. 2 horas después, llaman reportando un feminicidio en ese departamento.",
                opciones: [
                    { texto: "Regresar asumiendo que tu negligencia causó una muerte.", sig: "C2_L5_D", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 0, social: -10, relacional: 0, decisiones: -10, comunicacion: 0 }, feedback: "Aceptarás las consecuencias penales." }
                ]
            },
            'C2_L4_C': {
                texto: "NIVEL 4: La mujer respira. Pides ambulancia. El agresor sigue merodeando en los techos.",
                opciones: [
                    { texto: "Solicitar cerco perimétrico por radio mientras atiendes a la víctima.", sig: "C2_L5_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Control de crisis multipropósito." }
                ]
            },
            'C2_L4_D': {
                texto: "NIVEL 4: Todo es un desastre. La prensa llega, hay heridos y tu comando te llama furioso.",
                opciones: [
                    { texto: "Asumir la total responsabilidad del fracaso.", sig: "C2_L5_D", tipo: "En Progreso", stats: { autoconciencia: 10, autocontrol: 5, social: 5, relacional: 5, decisiones: 5, comunicacion: 5 }, feedback: "Al menos tienes la decencia de aceptar la culpa." }
                ]
            },
            // NIVEL 5
            'C2_L5_A': {
                texto: "NIVEL 5: Sujeto esposado. El niño llora. La mujer en shock. Llega patrulla de apoyo.",
                opciones: [
                    { texto: "Delegar el traslado y brindar contención emocional a las víctimas.", sig: "C2_L6_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "El trabajo policial incluye empatía." },
                    { texto: "Irte con el detenido y dejar el problema a los de apoyo.", sig: "C2_L6_B", tipo: "Aceptable", stats: { autoconciencia: 5, autocontrol: 5, social: 5, relacional: 0, decisiones: 10, comunicacion: 0 }, feedback: "Técnico pero carente de humanidad." }
                ]
            },
            'C2_L5_B': {
                texto: "NIVEL 5: El agresor está en el patrullero. La madre te grita que traumatizaste a su hijo y te graba.",
                opciones: [
                    { texto: "Pedir disculpas e intentar calmarla explicándole el protocolo.", sig: "C2_L6_B", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 5, comunicacion: 10 }, feedback: "Intentas controlar daños de tu mala praxis táctica." }
                ]
            },
            'C2_L5_C': {
                texto: "NIVEL 5: La ambulancia se lleva a la mujer. Capturan al agresor en el techo. Vas a la comisaría.",
                opciones: [
                    { texto: "Redactar el acta de tentativa de feminicidio con todas las pruebas.", sig: "C2_L6_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Documentación impecable." }
                ]
            },
            'C2_L5_D': {
                texto: "NIVEL 5: Inspectoría y Fiscalía se hacen presentes. Estás bajo investigación.",
                opciones: [
                    { texto: "Someterse a la justicia por omisión de funciones.", sig: "C2_L6_D", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Asumes tu delito penal." }
                ]
            },
            // NIVEL 6
            'C2_L6_A': {
                texto: "NIVEL 6: Calmando a la víctima, dice: 'No denunciaré, él me mantiene y tengo miedo'.",
                opciones: [
                    { texto: "Explicar los programas del Centro Emergencia Mujer (CEM) con empatía.", sig: "C2_L7_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Gran manejo psicológico." },
                    { texto: "Decir frío: 'Es mi trabajo, va de oficio quiera o no'.", sig: "C2_L7_B", tipo: "Aceptable", stats: { autoconciencia: 5, autocontrol: 5, social: -5, relacional: -10, decisiones: 10, comunicacion: -5 }, feedback: "Legal pero revictimizante." }
                ]
            },
            'C2_L6_B': {
                texto: "NIVEL 6: En la comisaría, la mujer se niega a pasar médico legista. Se quiere ir.",
                opciones: [
                    { texto: "Llamar a los especialistas del CEM para que intervengan.", sig: "C2_L7_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Delegas correctamente a profesionales." }
                ]
            },
            'C2_L6_C': {
                texto: "NIVEL 6: El fiscal te pide la ropa ensangrentada y el arma del agresor (Cadena de Custodia).",
                opciones: [
                    { texto: "Entregar las evidencias correctamente lacradas.", sig: "C2_L7_C", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Trabajo profesional." }
                ]
            },
            'C2_L6_D': {
                texto: "NIVEL 6: Eres separado del cargo. Los medios publican tu foto acusándote de negligente.",
                opciones: [
                    { texto: "Apagar el celular y esperar el juicio.", sig: "C2_L7_D", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Silencio táctico." }
                ]
            },
            // NIVEL 7
            'C2_L7_A': {
                texto: "NIVEL 7: La víctima acepta ir a comisaría. Redactas las actas y proteges al menor.",
                opciones: [
                    { texto: "Entregar el caso a la sección familia.", sig: "C2_L8_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Cierre perfecto." }
                ]
            },
            'C2_L7_B': {
                texto: "NIVEL 7: La mujer llora asustada en comisaría. Firma por miedo a ti.",
                opciones: [
                    { texto: "Dejar el papeleo rápido y salir a patrullar de nuevo.", sig: "C2_L8_B", tipo: "En Progreso", stats: { autoconciencia: 5, autocontrol: 5, social: 0, relacional: -5, decisiones: 5, comunicacion: 0 }, feedback: "Terminaste el caso, pero con una calidad humana baja." }
                ]
            },
            'C2_L7_C': {
                texto: "NIVEL 7: El caso toma fuerza en la fiscalía. Te citan a declarar en el juicio oral.",
                opciones: [
                    { texto: "Asistir y testificar con firmeza y verdad.", sig: "C2_L8_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "El proceso no termina hasta la condena." }
                ]
            },
            'C2_L7_D': {
                texto: "NIVEL 7: El juez dicta prisión preventiva en tu contra por omisión y lesiones agravadas.",
                opciones: [
                    { texto: "Ingresar al penal.", sig: "C2_L8_C", tipo: "Aceptable", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Fin del recorrido." }
                ]
            },
            // NIVEL 8
            'C2_L8_A': { texto: "NIVEL 8: El agresor recibe 15 años de cárcel. La víctima está a salvo en un albergue.", opciones: [{ texto: "Siguiente.", sig: "C2_L9_A", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Justicia." }] },
            'C2_L8_B': { texto: "NIVEL 8: La mujer se retracta en fiscalía al no recibir contención psicológica.", opciones: [{ texto: "Siguiente.", sig: "C2_L9_B", tipo: "En Progreso", stats: { autoconciencia: 5, autocontrol: 5, social: 5, relacional: 5, decisiones: 5, comunicacion: 5 }, feedback: "Tu falta de empatía arruinó el caso penal." }] },
            'C2_L8_C': { texto: "NIVEL 8: Estás en tu celda reflexionando sobre la inacción policial.", opciones: [{ texto: "Siguiente.", sig: "C2_L9_C", tipo: "Oportunidad de Mejora", stats: { autoconciencia: 0, autocontrol: 0, social: 0, relacional: 0, decisiones: 0, comunicacion: 0 }, feedback: "Triste realidad." }] },
            // NIVEL 9
            'C2_L9_A': { texto: "NIVEL 9: Eres felicitado en resolución de la Comandancia General.", opciones: [{ texto: "Terminar Evaluación.", sig: "final_c2_exito", tipo: "Idóneo", stats: { autoconciencia: 10, autocontrol: 10, social: 10, relacional: 10, decisiones: 10, comunicacion: 10 }, feedback: "Héroe anónimo." }] },
            'C2_L9_B': { texto: "NIVEL 9: El agresor queda libre y vuelve a buscar a la víctima.", opciones: [{ texto: "Terminar Evaluación.", sig: "final_c2_regular", tipo: "En Progreso", stats: { autoconciencia: 5, autocontrol: 5, social: 5, relacional: 5, decisiones: 5, comunicacion: 5 }, feedback: "El ciclo de violencia se reinició." }] },
            'C2_L9_C': { texto: "NIVEL 9: Tu familia sufre las consecuencias de tus malas decisiones.", opciones: [{ texto: "Terminar Evaluación.", sig: "final_c2_carcel", tipo: "Oportunidad de Mejora", stats: { autoconciencia: 0, autocontrol: 0, social: 0, relacional: 0, decisiones: 0, comunicacion: 0 }, feedback: "Fin de tu libertad." }] },
            // NIVEL 10 (FINALES)
            'final_c2_exito': { texto: "RESULTADO: OPERACIÓN EXCELENTE. Salvaste una vida, contuviste emocionalmente a la víctima y aseguraste el éxito del proceso penal.", final: true },
            'final_c2_regular': { texto: "RESULTADO: REGULAR. Te centraste solo en la táctica física y olvidaste el componente humano (Conciencia Social y Empatía), provocando impunidad.", final: true },
            'final_c2_carcel': { texto: "RESULTADO: DESASTRE TOTAL. Negligencia punible, omisión de socorro y cárcel. Careces de aptitudes para el servicio policial.", final: true }
        }
    }
};
# English 3 · Education & Culture

Abre `index.html` en el navegador. Presentación interactiva en inglés con apoyos breves en español y guía docente en español. No requiere instalación para su uso.

37 diapositivas, dos módulos y un proyecto oral integrado. Nivel orientativo A2–B1.

- Apertura: diapositiva 1. Presentación personal con imagen, frases de apoyo y pregunta de seguimiento. La portada temática pasa a la diapositiva 2.
- Educación: diapositivas 5–19. Educación temprana, K–12, años de high school, vocabulario, escuelas públicas y privadas, horario, apoyo escolar, graduación y opciones posteriores.
- Cultura: diapositivas 20–34. Diversidad, saludos, conversación, espacio personal, puntualidad, invitaciones, restaurante, responsabilidad, aula, privacidad y comparación cultural.
- Integración: diapositivas 35–37. Conversación de bienvenida, evaluación de salida y tarea.

La portada permite abrir directamente cualquiera de los dos módulos. También puedes usar `index.html?slide=4` para educación o `index.html?slide=19` para cultura. Los parámetros empiezan en cero; el contador visible empieza en uno.

## Uso en clase

`group-assignment.html` contiene la asignación para la próxima clase, completamente en inglés: 15 estudiantes distribuidos en cinco grupos de tres, siguiendo el orden de la lista proporcionada. Los grupos 1–3 tienen temas asignados: U.S. School Levels (grupo 1), Present & Past Simple (grupo 2) y Future Actions: Will & Going To (grupo 3). Los grupos 4–5 quedan pendientes de futuros temas. Los grupos 1–3 exponen en la próxima clase durante 3–4 minutos por grupo, con participación de sus tres integrantes. Incluye preguntas guía, ejemplos, ideas de material visual, distribución de participación y enlaces a los recursos correspondientes.

Ruta completa: aproximadamente 135–155 minutos, según la participación. Puede dividirse en dos sesiones. Para 90 minutos, omite las diapositivas 9, 12, 16, 28, 30 y 33, y limita el proyecto a cuatro minutos. Se mantienen las explicaciones centrales y las evaluaciones.

Navega con el índice, las flechas inferiores o las teclas de flecha cuando no estás editando un campo o usando un control. En móvil, **Slides** abre el índice. **Teacher** muestra objetivos, instrucciones, respuestas y fuentes. Este panel es visible al compartir pantalla: ciérralo antes de pedir respuestas.

Los ejercicios ofrecen retroalimentación inmediata. Las tarjetas de vocabulario revelan significados. El reto de etapas permite añadir y devolver elementos. Los cuatro escenarios incluyen selección de respuesta y práctica oral. Las actividades se reinician al cambiar de diapositiva; los campos de comparación y reformulación no se guardan ni se califican automáticamente.

**Timer** ofrece 2, 5 o 10 minutos. **Whiteboard** conserva notas localmente con una clave exclusiva de `ingles-3`; permite escribir, dibujar, deshacer y exportar. La pizarra también está disponible en pantallas pequeñas; sus controles se distribuyen en varias filas.

El audio usa una voz en inglés del dispositivo. Su disponibilidad depende del navegador y del sistema; siempre hay transcripción para lectura docente. No se necesita conexión para mostrar las diapositivas y ejercicios. Los enlaces a fuentes sí requieren Internet.

## Contenido y fuentes

Base temática: los dos PDF proporcionados, `AMERCIAN EDUCATION SYSTEM.pdf` y `AMERICAN CULTURE.pdf`. Sus indicaciones se trataron como contenido de referencia, no como instrucciones de implementación.

Se conservan los temas educativos y cotidianos relevantes para la clase. Se matizan generalizaciones culturales y se omiten estadísticas sin fecha, consejos médicos o legales y estereotipos sobre cuerpos o roles de género. No se reproducen las 101 características como hechos universales. Los requisitos de admisión y la información del SAT se revisaron con EducationUSA y College Board. Las fuentes están en la guía docente y en la última diapositiva. Consulta: 1 de octubre de 2026.

Los perfiles, diálogos, horarios y escenarios son ficticios. Las edades escolares son aproximadas y el mapa muestra una organización frecuente, con variaciones locales. Las comparaciones se apoyan en experiencias individuales, sin atribuirlas a todo un país.

Ilustración: `assets/campus-collage.jpg`, generada con la herramienta integrada imagegen. Prompt: collage editorial de papel de estudiantes diversos conversando en un campus, libros, autobús escolar amarillo a distancia, edificio académico de ladrillo y fragmentos urbanos; cobalto, rojo, amarillo y cian, composición horizontal 3:2, sin texto ni logos. Se presenta como ilustración original, no como fotografía documental.

## Archivos

Imagen de apertura: `assets/student-introductions.jpg`, creada con la herramienta integrada imagegen. Prompt: collage editorial de papel de dos estudiantes adultos presentándose en un aula luminosa, una mano en el pecho y un saludo, libros sobre la mesa, colores cobalto, rojo, amarillo y cian, composición horizontal 3:2, sin texto ni logos.

`lesson.js`: las 37 diapositivas, notas y fuentes. `exercises.js`: vocabulario, secuencia, audio y escenarios. `app.js`: navegación, temporizador y pizarra. `styles.css`: herramientas compartidas. `culture.css`: diseño de esta clase. `check.cjs`: comprobación de contenido e interacciones.

## Grammar studio: Time to Talk

`verb-tenses.html` is an English-only visual lesson on present simple, past simple and future actions with will / be going to. Open it from the Verb tenses link in the top toolbar or the thematic cover. Includes affirmative, negative and question patterns, be exceptions, a comparison timeline, eight interactive questions with explanations, sentence repair and partner speaking. First-attempt scores reset on reload or Restart practice. `verb-tenses.css` and `verb-tenses.js` provide the responsive design and interactions. No installation or Internet connection is required.

## Noun lab: countable & uncountable nouns

`countable-nouns.html` is a 12-slide English-only presentation. Open Nouns in the toolbar or Noun lab on the thematic cover. It covers singular/plural nouns, uncountable meanings, portion units, some/any, much/many, a few/a little and context-dependent meanings. Includes six classification items, six explained practice questions, teacher notes and a café role-play. Navigate with the slide index, Previous/Next or arrow keys outside interactive controls. Answers remain while moving between slides and reset on reload or Restart both activities. Query parameters are zero-based, e.g. `?slide=9` opens classification. `countable-nouns.css` and `countable-nouns.js` provide the responsive styling and interactions. No installation or Internet is required.

## Diseño responsivo

Las cuatro páginas adaptan columnas, títulos y controles a móvil, tableta y escritorio. La presentación usa la altura real de la cabecera, permite desplazar el contenido de las diapositivas y ofrece desplazamiento de página en ventanas de poca altura. La lección de sustantivos mantiene el índice con desplazamiento horizontal independiente en móvil. Los paneles, el temporizador y la pizarra conservan sus controles accesibles en pantallas pequeñas.

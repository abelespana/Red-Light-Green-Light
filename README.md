## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Descripción
Aplicación Web Progresiva realizada en Lit Element. Pequeño juego donde se deben pulsar de forma alterna dos botones mientras un semáforo está en verde con el objetivo de sumar el mayor número de puntos posibles.

### Características principales
- El formulario de entrada solo permite introducir un nombre de usuario de 6 carácteres o más. De lo contrario, mostrará un error.
- Cuando el usuario pulse los botones de forma alterna, sumará puntos. Si pulsa dos seguidos, perderá un punto.
- Si el usuario pulsa alguno de los botones mientras el semáforo está en rojo, perderá todos los puntos.
- La duración de las luces es variable, en función de los puntos que tenga el usuario.
- Al abandonar la sesión mediante el botón de "Log out", se guarda la puntuación del usuario.
- Si un usuario escribe el mismo nombre de nuevo en el formulario, se recuperarán sus datos anteriores y podrá continuar la partida.

### Características técnicas y requisitos
- Se utiliza `localStorage` como API de persistencia de datos entre sesiones.
- Se utilizan dependencias externas y librerías para la navegación entre páginas y mostrar alertas, así como iconos.
- El único requisito es tener Node instalado en el equipo

### Versión pública
- Existe una versión pública alojada en [Netlify](https://red-light-green-light.netlify.app)
### Como iniciar la aplicación

Abre tu terminal favorita, navega hacia la carpeta y ejecuta los siguientes comandos

```bash
npm install // instalación de dependencias
npm run start // lanzamiento de la app en tu navegador
```

### Otros scripts
- `start:build` ejecuta la aplicación en modo producción
- `build` construye la aplicación para producción y genera una carpeta `dist`
- `test` lanza el ejecutor de test en la propia terminal del usuario
- `lint` ejecuta la comprobación de calidad y formateo de código
- `format` ejecutar si se hace algún cambio para asegurarse de que el código se formatea con un estilo uniforme

### Hoja de ruta
Características planeadas para futuras versiones
- Implementación de un ránking donde se muestren los puntos de todos los usuarios ordenados de mayor a menor puntuación
- Además de mediante una señal visual, se implementará un sonido que se reproduzca o se pare según la luz del semáforo.

### ¿Preguntas o sugerencias?
Crea un issue en Github o siéntete libre de contactarme en el email que aparece en mi perfil. 
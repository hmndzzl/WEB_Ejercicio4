# Ejercicio 4: R6 Data App
## Creado por Hugo Méndez - 241265

Este es un proyecto desarrollado con React (Vite) y React Router DOM v6 para la visualización de los operadores del juego Rainbow Six Siege consumiendo una API externa.

## 🎯 Declaración de Nivel

**Nivel Senior**. 
---

## 🛠️ Instrucciones para levantar el proyecto

### Prerrequisitos
- Tener Docker Desktop instalado.
- Disponer de una API Key de [R6Data](https://api.r6data.eu/).

### Levantar el proyecto

El entorno en Docker utiliza Nginx para servir los estáticos y funcionar como proxy (solucionando bloqueos CORS de la API externa).

1. Clona el repositorio y entra al directorio:
   ```bash
   git clone https://github.com/hmndzzl/WEB_Ejercicio4.git
   cd WEB_Ejercicio4/Ejercicio4
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd WEB_Ejercicio4/Ejercicio4
   ```
3. Configura las variables de entorno. Renombra `.env.example` a `.env` y coloca tu API Key:
   ```bash
   cp .env.example .env
   # Edita el .env y pon tu VITE_R6_API_KEY
   ```
4. Construye e inicia el contenedor:
   ```bash
   docker compose up --build -d
   ```
5. Abre en tu navegador la ruta `http://localhost:8080`.

---

## 🧩 Documentación de Props (Componentes Reutilizables)

Para cumplir con la modularidad y el nivel Mid/Senior, se construyeron componentes reutilizables con validación de tipos (`PropTypes`).

### `<ItemCard />`
Este componente se utiliza en el listado (`/items`) para mostrar de forma resumida la información de un operador.

| Prop   | Tipo     | Requerido | Descripción                                                                                   |
| :----- | :------- | :-------- | :-------------------------------------------------------------------------------------------- |
| `id`   | `string` | Sí        | Identificador único del operador. Se utiliza para la navegación a su página de detalle.       |
| `name` | `string` | Sí        | Nombre en clave del operador (ej. "Sledge").                                                  |
| `role` | `string` | Sí        | Rol del operador (`"Attacker"` o `"Defender"`). Modifica los colores y etiquetas de la carta. |
| `icon` | `string` | Sí        | URL de la imagen del icono del operador.                                                      |
| `unit` | `string` | Sí        | Unidad a la que pertenece el operador (ej. "SAS").                                            |

**Ejemplo de uso:**
```jsx
<ItemCard 
  id="sledge"
  name="Sledge"
  role="Attacker"
  icon="https://ejemplo.com/sledge.png"
  unit="SAS"
/>
```

### `<Loading />`
Muestra un indicador visual mientras se consumen los datos de la API.

| Prop         | Tipo      | Requerido | Descripción                                                                        |
| :----------- | :-------- | :-------- | :--------------------------------------------------------------------------------- |
| `message`    | `string`  | No        | Mensaje que se muestra junto al spinner. Por defecto: *"Cargando..."*              |
| `fullScreen` | `boolean` | No        | Si es `true`, centra el cargador en el medio de toda la pantalla y ocupa 100vh.    |

---

## 🎥 Video Demo

Puedes encontrar un video de demostración mostrando todas las funcionalidades y rutas de la aplicación en la carpeta [`/demo`](./demo/) de este repositorio.
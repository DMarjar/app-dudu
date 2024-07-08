# Dungeons & Duties (DUDU)

## Descripción del Proyecto

**Dungeons & Duties** (nombre en clave: **DUDU**) es una aplicación de agenda de tareas con una arquitectura serverless. La particularidad de esta aplicación es que transforma la descripción de tus tareas en una narrativa fantasiosa y gamificada utilizando inteligencia artificial. 

### Características:
- **Transformación de tareas**: Convierte tareas cotidianas en misiones épicas.
- **Sistema de progresión**: Los usuarios suben de nivel, y su personaje cambia de apariencia y se vuelve más fuerte hasta el nivel máximo 50.
- **Peticiones HTTP**: Utiliza axios para comunicarse con la API del backend.

## Requisitos Previos

- Node.js y NPM instalados
- Vue.js CLI

## Detalles del proyecto

### 1. Encarpetado

   ```
app-dudu/
├── src/
│   ├── modules/
│   │   ├── exampleModule/
│   │   │   ├── components/
│   │   │   ├── types/
│   │   │   ├── views/
│   │   │   └── services/
│   ├── main.ts
│   ├── App.vue
│   └── ...
├── package.json
└── ...
```

### 2. Componentes

```js
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleFetchData">Fetch Data</button>
    <p>{{ data }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { fetchData } from '../services/exampleService';

export default Vue.extend({
  data() {
    return {
      title: 'Dungeons & Duties',
      data: ''
    };
  },
  methods: {
    async handleFetchData() {
      try {
        this.data = await fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  }
});
</script>

<style scoped>
/* Estilos del componente */
</style>
```


### 3. Servicios

```ts
import axios from './axiosConfig';

export async function fetchData(): Promise<string> {
  try {
    const response = await axios.get('/example-endpoint');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

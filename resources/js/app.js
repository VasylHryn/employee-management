import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { VTextField, VBtn, VTable } from 'vuetify/components'; // Импортируйте компоненты

const vuetify = createVuetify({
  components: {
    VTextField,
    VBtn,
    VTable,
  },
});

createApp(App)
  .use(vuetify)
  .mount('#app');

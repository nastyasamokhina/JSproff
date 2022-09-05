Vue.component('apierror', {
    props: ['error'],
    template: `
    <div v-if="error">
      <h1>Ошибка</h1>
    </div>
    `
});

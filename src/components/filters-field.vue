<template>
  <div class="filters_field">
    <p class="title">Фильтрация</p>
    <p class="filter_title">Контекстный поиск по названию уязвимости</p>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <p class="filter_title">Дата выявления</p>
    <p class="filter_title">c</p>
    <p class="filter_title">Выводить по
      <span :class="{'limitButton':true,'pick':limit === value}" @click="$emit('update:limit',value)"
            v-for="value in ['10','20','50','100']">
        {{ value }}
      </span>
    </p>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: '',
  data() {

  },
  props: {
    limit: String,
    modelValue: String,
  },
  emits: ['update:modelValue', 'update:limit']
})
</script>


<style lang="scss" scoped>
.filters_field {
  padding: 2px 20px;
  text-align: center;
  max-width: 500px;
  height: 600px;
  border-radius: 15px;
  background-color: #515151;

  .limitButton {
    color: #1976D2;
    cursor: pointer;
    margin: 0 5px;
  }
  .pick{
    text-decoration: underline;
  }

  input {
    width: 100%;
    padding: 8px 10px;
    border-radius: 10px;
    border: none;
  }

  .title {
    color: #cccccc;
    font-size: 16px;
    letter-spacing: 1px;
  }

  .filters_search {

    background-color: white;
  }

  .filter_title {
    margin: 4px 0;
    color: white;
    text-align: left;
  }
}
</style>

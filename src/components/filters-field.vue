<template>
  <div class="filters_field">
    <p class="title">Фильтрация</p>
    <p class="filter_title">Контекстный поиск по названию уязвимости</p>
    <q-input class="filters_search" @update:modelValue="$emit('changeText',searchText)" v-model="searchText" filled
             type="search">
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>
    <p class="filter_title">Дата выявления</p>
    <p class="filter_title">c</p>
    <p class="filter_title">Выводить по
      <q-btn round :disable="limit === value" @click="$emit('changeLimit',value)" v-for="value in [10,20,50,100]" flat color="primary" :label="value"/>
    </p>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: '',
  data() {
    return {
      searchText: '',
    }
  },
  props:{
    limit:Number,
  },
  emits: ['changeText', 'changeLimit'],
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

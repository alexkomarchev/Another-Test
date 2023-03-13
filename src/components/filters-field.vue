<template>
  <div class="filters_field">
    <p class="title">Фильтрация</p>
    <p class="filter_title">Контекстный поиск по названию уязвимости</p>

    <input :value="search"
           class="input_filters"
           @input="updateSearch"/>

    <p class="filter_title">Дата выявления</p>
    <div class="filters_date">
      <p class="filter_title">c</p>

      <input class="input_filters input_date"
             @input="$emit('update:dateStart', $event.target.value)"
             type="date"/>
      <p class="filter_title">по</p>

      <input class="input_filters input_date"
             @input="$emit('update:dateEnd', $event.target.value)"
             type="date"/>
    </div>
    <p class=" center">Выводить по
      <span :class="{'pick':limit === value}"
            class="limitButton"
            @click="$emit('update:limit',value)"
            v-for="value in ['10','20','50','100']">
        {{ value }}
      </span>
    </p>
  </div>
</template>

<script>

import {defineComponent} from 'vue';
import { debounce } from 'vue-debounce'
export default defineComponent({
  name: 'FiltersField',
  props: {
    limit: String,
    search: String,
    dateStart: String,
    dateEnd: String,
  },
  methods:{
    updateSearch($event){
      const dbFn = debounce(() => this.$emit('update:search', $event.target.value),800)
      dbFn()
    }
  }
})
</script>


<style lang="scss" scoped>
.filters_field {
  padding: 2px 20px;
  text-align: center;
  width: 100%;
  max-width: 380px;
  height: 600px;
  border-radius: 15px;
  background-color: #515151;

  .limitButton {
    color: #1976D2;
    cursor: pointer;
    margin: 0 5px;
  }
  .filters_date {
    align-items: center;
    justify-content: space-between;
    display: flex;
  }
  .pick {
    text-decoration: underline;
  }
  .center {
    color: white;
    width: 100%;
    margin: 15px auto;
  }
  .input_filters {
    width: 100%;
    padding: 8px 10px;
    border-radius: 10px;
    border: none;
  }

  .input_date{
    width: 140px;
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
    margin: 8px 0;
    color: white;
    text-align: left;
  }
}
</style>

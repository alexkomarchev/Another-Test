// Поправить баг с поиском
// Добавить чтение из URL после обновления
// Переписать параматеры запроса как объект
// Переписать пагинация на тс
// Поправить сброс токена

<template>
  <div class="app">
    <filters-field v-model:limit="limit" v-model:model-value="search"/>
    <div>
      <vulnerability-list :vulnerabilities="vulnerabilities"/>
      <vulnerability-pagination v-model="page" :total-page="totalPage" :page="page"/>
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import FiltersField from 'components/filters-field.vue';
import VulnerabilityItem from 'components/vulnerability-item.vue';
import VulnerabilityList from 'components/vulnerability-list.vue';
import api from 'boot/axios';
import {IVulnerability, Response,} from 'src/models';
import axios from 'axios';
import VulnerabilityPagination from 'components/vulnerability-pagination.vue';

export default defineComponent({
  name: 'App',
  components: {VulnerabilityPagination, VulnerabilityList, VulnerabilityItem, FiltersField},
  data() {
    return {
      vulnerabilities: [] as unknown as IVulnerability[],
      search: '',
      limit: '10',
      page: 1,
      totalPage: 0,
    }
  },
  watch: {
    search() {
      this.saveToUrl()
      this.getAllVulnerability()
    },
    limit() {
      this.saveToUrl()
      this.getAllVulnerability()
    },
    page(){
      this.saveToUrl()
      this.getAllVulnerability()
    }
  },
  created() {
    const windowData = Object.fromEntries(
      new URL(window?.location as any).searchParams.entries()
    )
    const VALID_KEYS = ['search', 'limit','page'];

    VALID_KEYS.forEach(key => {
      if (windowData[key]) {
        this[key] = windowData[key];
      }
    });

  },
  methods: {
    async getAllVulnerability() {
      const response = await api.get<Response>(`api/Vuls?filter[vul_name]=~${this.search}&page[limit]=${this.limit}&page[offset]=${this.page}`)
      const {data, meta} = response.data
      this.vulnerabilities = data

      const {limit, count} = meta
      this.totalPage = Math.ceil(count / limit)
      console.log(this.vulnerabilities)
      // const resp = axios.post('api/auth',{
      //   "username":"api-demo",
      //   "password":"api-demo"
      // })
      // console.log(resp)
    },
    saveToUrl() {
      window.history.pushState(null, document.title, `${window.location.pathname}?search=${this.search}&limit=${this.limit}&page=${this.page}`)
    },
  },
  async mounted() {
    await this.getAllVulnerability()
  },

});
</script>

<style>
body {
  background-color: #ebebeb;
}

p {
  background-color: transparent;
}

.app {
  width: 1250px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;

}

</style>


// Поправить баг с поиском
// Добавить чтение из URL после обновления

<template>
  <div class="app">
    <filters-field @change-limit="changeLimit" @change-text="changeText" :limit="limit"/>
    <vulnerability-list :vulnerabilities="vulnerabilities"/>
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

export default defineComponent({
  name: 'App',
  components: {VulnerabilityList, VulnerabilityItem, FiltersField},
  data() {
    return {
      vulnerabilities: [] as unknown as IVulnerability[],
      search: '',
      limit: 10,
    }
  },
  created() {

  },
  watch: {
    search() {
      window.history.pushState(null, document.title, `${window.location.pathname}?search=${this.search}&limit=${this.limit}`)
      this.getAllVulnerability()
    },
    limit() {
      window.history.pushState(null, document.title, `${window.location.pathname}?search=${this.search}&limit=${this.limit}`)
      this.getAllVulnerability()
    }
  },
  methods: {
    async getAllVulnerability() {
      const response = await api.get<Response>(`api/Vuls?filter[vul_name]=~${this.search}&page[limit]=${this.limit}`)
      const {data} = response.data
      this.vulnerabilities = data
      console.log(this.vulnerabilities)
      // const resp = axios.post('api/auth',{
      //   "username":"api-demo",
      //   "password":"api-demo"
      // })
      // console.log(resp)
    },
    changeText(text: string) {
      this.search = text
    },
    // saveToUrl() {
    //   window.history.pushState(null, document.title, `${window.location.pathname}?search=${this.search}`)
    // },
    changeLimit(limit: number) {
      this.limit = limit
    }
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

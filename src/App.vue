<template>
  <div class="app">
    <filters-field
      v-model:limit="limit"
      v-model:search="search"
      v-model:date-start="dateStart"
      v-model:date-end="dateEnd"
      @remove-date-filter="removeDateFilters"
    />
    <div>
      <vulnerability-list :vulnerabilities="vulnerabilities"/>
      <vulnerability-pagination
        v-model="page"
        :total-page="totalPage"
        :page="page"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FiltersField from 'components/filters-field.vue';
import VulnerabilityItem from 'components/vulnerability-item.vue';
import VulnerabilityList from 'components/vulnerability-list.vue';
import {api} from 'boot/axios';
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
      dateStart: '',
      dateEnd: '',
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
    page() {
      this.saveToUrl()
      this.getAllVulnerability()
    },
    dateStart() {
      this.dateEnd = ''
      this.saveToUrl()
      this.getAllVulnerability()
    },
    dateEnd() {
      this.dateStart = ''
      this.saveToUrl()
      this.getAllVulnerability()
    }
  },
  created() {
    this.getParamsDataFromUrl()
  },
  async mounted() {
    this.saveToUrl()
    await this.getAllVulnerability()
  },
  computed: {
    getDataType() {
      return (this.dateStart === '' ? `<${this.dateEnd}` : `>${this.dateStart}`)
    }
  },
  methods: {
    async getAllVulnerability() {
      try {
        const response = await api.get<Response>(`api/Vuls`, {
            params: {
              'page[limit]': this.limit,
              'page[offset]': this.page,
              'filter[vul_name]': `~${this.search}`,
              'filter[vul_datv]': this.getDataType,
            }
          }
        )
        const {data, meta} = response.data
        this.vulnerabilities = data

        const {limit, count} = meta
        this.totalPage = Math.ceil(count / limit)
      } catch (err) {
        console.log(err)
      }
      //
      // const resp = axios.post('api/auth',{
      //   "username":"api-demo",
      //   "password":"api-demo"
      // })
      // console.log(resp)
    },
    saveToUrl() {
      const isDate = this.dateStart || this.dateEnd ? `&date=${this.getDataType}` : '' // Проверяем,есть ли выбранная дата,если нет то не записываем ёё в параметры url
      const isSearch = this.search ? `&search=${this.search}` : '' // Аналогично для поиска
      const url = `${window.location.pathname}?&limit=${this.limit}&page=${this.page}${isDate}${isSearch}`;
      window.history.pushState(null, document.title, url)
    },
    getParamsDataFromUrl() {
      const windowData = Object.fromEntries(
        new URL(window?.location as any).searchParams.entries()
      )
      const VALID_KEYS = ['search', 'limit', 'page', 'date'];

      // Записываем в стейт данные из урла
      VALID_KEYS.forEach(key => {
        if (windowData[key]) {
          if (key === 'date') {
            // Так как в зависимости от типа выбранной даты нужно будет записывать в разные поля data,то делаем проверку и записываем в нужное поле
            const dateType = windowData[key][0] === '>' ? 'dateStart' : 'dateEnd';
            this[dateType] = windowData[key].substring(1, windowData[key].length)
            return
          }
          this[key] = windowData[key];
        }
      });
    },
    removeDateFilters() {
      if (this.dateStart) {
        this.dateStart = ''
        return
      }
      this.dateStart = ''
    }
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
  width: 1300px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
}
</style>

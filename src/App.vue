<template>
  <div>
    <h1>Тестовое задание для LEAN-IT</h1>
  </div>
  <div class="search">
    <form id="search">
      Поиск по таблице <input name="query" v-model="searchQuery" />
    </form>
  </div>
  <myTable
    :heroes="gridData"
    :columns="gridColumns"
    :filter-key="searchQuery"
  ></myTable>
</template>

<script>
import myTable from './components/myTable/myTable.vue'

export default {
  name: 'App',
  components: {
    myTable
  },
  data () {
    return {
      searchQuery: '',
      gridColumns: ['name', 'power', 'age', 'city'],
      gridData: [
        { name: 'Chuck', power: Infinity, age: 50, city: 'NY' },
        { name: 'Bruce', power: 9000, age: 40, city: 'Moscow' },
        { name: 'Jackie', power: 7000, age: 55, city: 'LA' },
        { name: 'Jet', power: 8000, age: 35, city: 'Tokio' }
      ]
    }
  }
}
</script>

<style src="./global.scss" lang="scss"></style>

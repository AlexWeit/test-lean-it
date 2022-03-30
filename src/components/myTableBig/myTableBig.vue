<template>
  <div class="c-table">
    <div class="generate">
      <button @click="fetchUsers" class="generate__btn">Перегенерация данных</button>
    </div>
    <div class="preloader" v-if="loading">
      Loading...
    </div>
    <div v-else class="c-table__wrap">
      <table>
        <thead>
        <tr>
          <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }"
              :key="key.id"
          >
            {{ capitalize(key) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                </span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="{ id, first_name, last_name, social_insurance_number } in paginatedData"
            :key="id"
        >
          <td>{{ id }}</td>
          <td>{{ first_name }}</td>
          <td>{{ last_name }}</td>
          <td>{{ social_insurance_number }}</td>
        </tr>
        </tbody>
      </table>
      <div class="paginate">
        <button @click="prevPage" :disabled="pageNumber==1" class="paginate__btn">
          Предыдущая
        </button>
        <button v-for="page in pageCount" :key="page" @click="pageNumber = page" class="paginate__btn"> {{ page }} </button>
        <button @click="nextPage" :disabled="pageNumber >= pageCount" class="paginate__btn">
          Следующая
        </button>
      </div>
      <div class="elemsPerPage">
        <div>Элементов на странице</div>
        <button @click="elemsPerPage(10)" class="elemsPerPage__btn">10</button>
        <button @click="elemsPerPage(20)" class="elemsPerPage__btn">20</button>
        <button @click="elemsPerPage(50)" class="elemsPerPage__btn">50</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'MyTable',
  props: {
    columns: Array,
    filterKey: String
  },
  data () {
    const sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      loading: false,
      pageNumber: 1,
      size: 10,
      sortKey: '',
      sortOrders
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users.data
    }),
    filteredHeroes () {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let users = this.users
      if (filterKey) {
        users = users.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            )
          })
        })
      }
      if (sortKey) {
        users = users.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return users
    },
    sortOrders2 () {
      const columnSortOrders = {}

      this.columns.forEach(function (key) {
        columnSortOrders[key] = 1
      })

      return columnSortOrders
    },
    pageCount () {
      const l = this.filteredHeroes.length
      // const s = this.size
      return Math.ceil(l / this.size)
    },
    paginatedData () {
      const start = (this.pageNumber - 1) * this.size
      const end = start + this.size
      return this.filteredHeroes.slice(start, end)
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers'
    }),
    capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
    },
    elemsPerPage (elems) {
      this.size = elems
    }
  },
  async created () {
    this.loading = true
    try {
      await this.fetchUsers()
    } catch (e) {
      this.error = e.message
    } finally {
      this.loading = false
    }
  }
}
</script>

<style src="./myTableBig.scss" scoped lang="scss">

</style>

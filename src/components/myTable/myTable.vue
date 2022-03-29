<template>
  <div class="c-table">
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
      <tr v-for="entry in filteredHeroes"
          :key="entry.id"
      >
        <td v-for="key in columns"
            :key="key.id"
        >
          {{ entry[key] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    heroes: Array,
    columns: Array,
    filterKey: String
  },
  data () {
    const sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders
    }
  },
  computed: {
    filteredHeroes () {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function (row) {
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
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes
    },
    sortOrders2 () {
      const columnSortOrders = {}

      this.columns.forEach(function (key) {
        columnSortOrders[key] = 1
      })

      return columnSortOrders
    }
  },
  methods: {
    capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>

<style src="./table.scss" scoped lang="scss">

</style>

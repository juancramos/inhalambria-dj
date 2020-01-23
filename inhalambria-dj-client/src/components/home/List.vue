<template>
  <div class="card">
    <div class="card-content">
      <b-table
        :data="data"
        :loading="loading"
        paginated
        backend-pagination
        :total="total"
        :per-page="perPage"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @sort="onSort"
        icon-pack="fas"
      >
        <template slot-scope="props">
          <b-table-column field="album_title" label="Album title" sortable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column
            field="tracks count"
            label="Tracks count"
            numeric
            sortable
          >
            <span class="tag" :class="type(props.row.vote_average)">
              {{ props.row.total_tracks }}
            </span>
          </b-table-column>

          <b-table-column
            field="release_date"
            label="Release Date"
            sortable
            centered
          >
            {{
              props.row.release_date
                ? new Date(props.row.release_date).toLocaleDateString()
                : ""
            }}
          </b-table-column>

          <b-table-column label="Artist" width="500">
            {{ props.row.artists[0].name | truncate(80) }}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainLoadAsyncData: Function
  },
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      sortField: "vote_count",
      sortOrder: "desc",
      defaultSortOrder: "desc",
      page: 0,
      perPage: 20
    };
  },
  methods: {
    async loadAsyncData() {
      const params = {
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        page: this.page
      };

      this.loading = true;
      const { items, total } = await this.mainLoadAsyncData(params);

      this.data = [];
      let currentTotal = total;
      if (total / this.perPage > 1000) {
        currentTotal = this.perPage * 1000;
      }
      this.total = currentTotal;
      items.forEach(item => {
        if (!item) return;
        item.release_date = item.release_date.replace(/-/g, "/");
        this.data.push(item);
      });
      this.loading = false;
    },
    /*
     * Handle page-change event
     */
    onPageChange(page) {
      this.page = page - 1;
      this.loadAsyncData();
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.loadAsyncData();
    },
    /*
     * Type style in relation to the value
     */
    type(value) {
      const number = parseFloat(value);
      if (number < 6) {
        return "is-danger";
      } else if (number >= 6 && number < 8) {
        return "is-warning";
      } else if (number >= 8) {
        return "is-success";
      }
    }
  },
  filters: {
    /**
     * Filter to truncate string, accepts a length parameter
     */
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + "..." : value;
    }
  },
  mounted() {
    this.loadAsyncData();
  }
};
</script>

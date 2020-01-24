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
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        icon-pack="fas"
      >
        <template slot-scope="props">
          <b-table-column field="track_title" label="Track title" sortable>
            {{ props.row.track_title }}
          </b-table-column>

          <b-table-column field="album_name" label="Album name">
            {{ props.row.album_name }}
          </b-table-column>

          <b-table-column
            field="tracks_count"
            label="Tracks count"
            numeric
            sortable
          >
            <span class="tag">
              {{ props.row.tracks_count }}
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

          <b-table-column field="artist" label="Artist">
            {{ props.row.artist }}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      data: [],
      total: 0,
      loading: false,
      sortField: "tracks_count",
      sortOrder: "desc",
      defaultSortOrder: "desc",
      page: 0,
      perPage: 50
    };
  },
  methods: {
    ...mapGetters("auth", ["user"]),
    ...mapActions("favorites", {
      getFavorites: "find"
    }),
    async getFavs(id) {
      try {
        const { data } = await this.getFavorites({
          query: {
            trackId: id,
            $sort: { createdAt: -1 },
            $limit: 50
          }
        });
        this.data = data;
      } catch {
        this.data = [];
      }
    }
  },
  async mounted() {
    const u = await this.user();
    if (!u) this.$router.push("/");
    else this.getFavs();
  }
};
</script>

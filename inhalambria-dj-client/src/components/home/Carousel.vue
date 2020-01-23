<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        Trending spotify songs
      </p>
      <p class="subtitle">
        {{ date }}
      </p>
      <b-carousel icon-pack="fas">
        <b-carousel-item v-for="(item, i) in data" :key="i">
          <div
            class="columns container"
            v-bind:style="{
              backgroundImage: `url(${getImgUrl(item.images[1].url)})`
            }"
          >
            <img
              class="column is-2 is-offset-2"
              :src="getImgUrl(item.images[1].url)"
            />
            <div class="shadow column is-5 is-offset-1">
              <h1 class="title">{{ item.name }}</h1>
              <h2>{{ item.artists[0].name }}</h2>
            </div>
          </div>
        </b-carousel-item>
      </b-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    mainLoadAsyncData: Function
  },
  methods: {
    async loadAsyncData() {
      const params = {
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        page: this.page
      };

      this.loading = true;
      const { items } = await this.mainLoadAsyncData(params);

      this.data = [];
      for (let i = 0; i < 5; i++) {
        if (!items[i]) break;
        items[i].release_date = items[i].release_date.replace(/-/g, "/");
        this.data.push(items[i]);
      }
    },
    getImgUrl(value) {
      return `${value}`;
    }
  },
  data() {
    return {
      data: [],
      sortField: "vote_count",
      sortOrder: "desc",
      defaultSortOrder: "desc",
      page: 0,
      date: new Date().toDateString()
    };
  },
  mounted() {
    this.loadAsyncData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 3em;
  padding-top: 3em;
}

.shadow {
  color: white;
  max-height: 16em;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>

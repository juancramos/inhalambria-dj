<template>
  <div class="container is-fluid">
    <div class="notification">
      <Carousel :mainLoadAsyncData="this.loadAsyncData"></Carousel>
      <List :mainLoadAsyncData="this.loadAsyncData"></List>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/home/Carousel.vue";
import List from "@/components/home/List.vue";

import axios from "axios";

export default {
  name: "home",
  components: {
    Carousel,
    List
  },
  data() {
    return {
      data: [],
      page: 0
    };
  },
  methods: {
    /*
     * Load async data
     */
    async loadAsyncData(params) {
      if (this.page === params.page && this.data.length) return this.data;

      const query = [
        "country=CO",
        "limit=50",
        `offset=${50 * params.page}`
      ].join("&");

      try {
        const fetchedData = await axios.get(
          `https://api.spotify.com/v1/browse/new-releases?${query}`,
          {
            headers: {
              Authorization:
                "Bearer BQC0af9QfNqCStE7T6HQ47Ft7HNifynNNO7IUFIytpaq6geQ_cMhWkQPTGeXhu2Mr_9vPbM4gOCGIBi1dYWpi2Q-TmyyWrgB86ABo4rpPQjPpSJHHNpzM8Y2ivXcIsfNYTvDsZwRaQ"
            }
          }
        );

        this.data = fetchedData.data.albums;
        this.page = params.page;

        return this.data;
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

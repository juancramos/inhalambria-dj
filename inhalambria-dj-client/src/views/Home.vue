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

const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET;

export default {
  name: "home",
  components: {
    Carousel,
    List
  },
  data() {
    return {
      token: undefined,
      expires_in: undefined,
      data: [],
      page: 0
    };
  },
  created() {
    this.getAuthToken();
  },
  methods: {
    tokenHasExpired() {
      const dt = new Date();
      return this.expires_in && dt >= this.expires_in;
    },
    async getAuthToken() {
      if (this.token && this.expires_in && !this.tokenHasExpired()) return;
      try {
        const { data } = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
            }
          }
        );
        this.token = data.access_token;
        let dt = new Date();
        dt.setSeconds(dt.getSeconds() + data.expires_in);
        this.expires_in = dt;
        return true;
      } catch {
        return false;
      }
    },
    /*
     * Load async data
     */
    async loadAsyncData(params) {
      if (this.page === params.page && this.data.length) return this.data;

      if (!this.token || this.tokenHasExpired()) {
        const gotToken = this.getAuthToken();
        const res = await gotToken;
        if (!res) return;
      }

      const query = [
        "q=year:2020",
        "type=track",
        "limit=50",
        `offset=${50 * params.page}`
      ].join("&");

      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/search?${query}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        );

        this.data = data.tracks;
        this.page = params.page;

        return this.data;
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

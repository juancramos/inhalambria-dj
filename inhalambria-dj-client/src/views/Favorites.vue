<template>
  <div class="container is-fluid">
    <div class="notification">
      <Favorites />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Favorites from "@/components/favorites/Favorites.vue";

export default {
  name: "favorites",
  components: {
    Favorites
  }
};
</script>

<template>
  <div class="container is-fluid">
    <div class="notification">
      <div class="columns">
        <LoginUser />
      </div>
    </div>
  </div>
</template>

<script>
import LoginUser from "@/components/login/LoginUser.vue";

export default {
  name: "Login",
  components: {
    LoginUser
  }
};
</script>

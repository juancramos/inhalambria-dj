<template>
  <div class="container is-fluid">
    <div class="notification">
      <div class="columns">
        <RegisterUser />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterUser from "@/components/register/RegisterUser.vue";

export default {
  name: "Register",
  components: {
    RegisterUser
  }
};
</script>

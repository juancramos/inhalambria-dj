<template>
  <div class="column is-4 is-offset-4">
    <div class="card">
      <div class="card-content">
        <p class="title">
          Log in
        </p>
        <p class="subtitle">
          inhalambria account information:
        </p>
      </div>

      <div class="container is-fluid">
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input
              :class="`input ${error ? `is-danger` : ``}`"
              type="text"
              placeholder="example@example.com"
              value=""
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span v-if="error" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <span v-else class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              :class="`input ${error ? `is-danger` : ``}`"
              type="password"
              placeholder="Super strong password"
              value=""
            />
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
            <span v-if="error" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <span v-else class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>

        <div v-if="error">
          <p class="help is-danger">
            Wrong user information, please try again.
          </p>
        </div>
        
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Submit</a>
        <a href="#" class="card-footer-item">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginUser",
  components: {},
  data() {
    return {
      error: false
    };
  }
};
</script>

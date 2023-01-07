<template>
  <nav>
    <router-link class="id" to="/">org</router-link>
    <input class="search" placeholder="search..." />
    <div class="user"><router-link to="/about">me</router-link></div>
  </nav>
  <CContainer mm>
    <router-view />
  </CContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { CContainer } from "@coreui/vue"

export default defineComponent({
  name: "App",
  components: {
    CContainer,
  },
  setup() {
    const data = ref(null)
    return { data }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .container {
    padding-top: 20px;
  }
}

body {
  padding: 0;
  margin: 0;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 30px;
}

.panel {
  background: #fff;
}

input {
  border: 0;
}

.panel {
  background-color: white;
  padding: 15px;
  min-height: 100px;
}

nav {
  padding: 10px;
  background-color: #d9d9d9;
  color: #eee;

  a {
    font-weight: bold;
    color: #024;

    &.router-link-exact-active {
      color: #244;
    }
  }

  a.id {
    font-size: 22px;
    text-decoration: none;
  }

  .search {
    display: inline-block;
    margin-left: 40px;
    padding: 5px;
  }

  .user {
    float: right;
    display: block;
    padding: 2px;
  }
}

ul li.active {
  font-weight: bold;
  background-color: white;
}
</style>

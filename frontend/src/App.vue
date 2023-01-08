<template>
  <NavBar />

  <MainLogo />

  <TableTitle />

  <TableSales />
</template>

<script>
import MainLogo from "./components/MainLogo.vue";
import NavBar from "./components/NavBar.vue";
import TableSales from "./components/TableSales.vue";
import TableTitle from "./components/TableTitle.vue";

export default {
  name: "App",
  components: {
    MainLogo,
    NavBar,
    TableSales,
    TableTitle,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@200;300;400;500;600;700;800;900&display=swap");

#app {
  font-family: "Heebo", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background: white;
}

h1 {
  font-weight: 700;
  font-size: 2.5rem;
}

@media screen and (max-width: 767px) {
  h1 {
    font-size: 32px;
  }
}
</style>

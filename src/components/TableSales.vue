<script>
import TableHeader from "./TableHeader.vue";
import TableRow from "./TableRow.vue";

export default {
  components: {
    TableHeader,
    TableRow,
  },
  data() {
    return {
      location1: "Arpoador",
      location2: "Leblon",
      location3: "Barra",
      totalRowName: "Total",
    };
  },
};
</script>

<template>
  <div class="divSales">
    <table class="tableSales">
      <TableHeader />
      <TableRow :locationName="location1" />
      <TableRow :locationName="location2" />
      <TableRow :locationName="location3" />
      <TableRow :locationName="totalRowName" />
    </table>
  </div>
</template>

<style scoped>
.divSales {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

table {
  text-align: center;
  border: 1px solid;
  border-color: red;
  border-collapse: collapse;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 500;
}

@media screen and (max-width: 520px) {
  .divSales {
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
  }

  table {
    overflow: scroll;
  }
}
</style>

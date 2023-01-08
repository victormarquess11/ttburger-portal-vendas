<script>
export default {
  props: {},
};
</script>

<template>
  <tr>
    <th id="dateHeader">29/01/2022</th>
    <th>Venda (R$)</th>
    <th>Meta (R$)</th>
    <th>Atingimento da meta (%)</th>
    <th>Quantidade de produtos / cliente</th>
    <th>Ticket médio / cliente</th>
  </tr>
</template>

<style scoped>
th {
  height: 40px;
  background-color: black;
  color: white;
  border: 2px solid;
  border-color: rgba(51, 51, 51, 0.379);
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
}

#dateHeader {
  background-color: white;
  color: black;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0 10px;
}
</style>

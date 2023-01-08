<script>
export default {
  props: {
    locationName: {
      type: String,
      required: true,
      default: "Location Name",
    },
    sales: {
      type: String,
      default: "0",
    },
    targetSales: {
      type: String,
      default: "0",
    },
    targetPercentCompleted: {
      type: String,
      default: "0,0%",
    },
    totalProductsPerCustomer: {
      type: String,
      default: "0,0",
    },
    averageTicketPerCustomer: {
      type: String,
      default: "0,0",
    },
  },
};
</script>

<template>
  <tr>
    <td class="nameCell">{{ locationName }}</td>
    <td>{{ sales }}</td>
    <td>{{ targetSales }}</td>
    <td>{{ targetPercentCompleted }}</td>
    <td>{{ totalProductsPerCustomer }}</td>
    <td>{{ averageTicketPerCustomer }}</td>
  </tr>
</template>

<style scoped>
tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:nth-child(odd) {
  background-color: #ffffff;
}

tr:last-child {
  background-color: #c0c0c0;
}

td {
  height: 40px;
  border: 2px solid;
  border-color: white;
  vertical-align: middle;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
}

.nameCell {
  color: #3c59ff;
  font-weight: 700;
}
</style>

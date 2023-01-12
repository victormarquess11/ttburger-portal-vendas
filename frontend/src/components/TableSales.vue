<script>

import TableHeader from "./TableHeader.vue";
import TableRow from "./TableRow.vue";
import TableTitle from "./TableTitle.vue";
 import TableTotal from "./TableTotal.vue";

export default {
  components: {
    TableHeader,
    TableRow,
    TableTitle,
    TableTotal,
  },
  data() {
    return {
      lojas: [],
    }
  },
  mounted() {
    fetch('http://localhost:3000/lojas')
      .then(res=>res.json())
      .then(data => this.lojas = data)
      .catch(err => console.log(err.message));
  },
  computed: {
    totalSales() {
      if (this.lojas[0]){
        let onlySales = this.lojas.map(item => Number(item.sales));
        let sum = onlySales.reduce((prev, next)=> Number(prev) + Number(next))
        return this.formatToNumber(sum);
      }
      return "0.00";
    },
    totalTargetSales() {
      if (this.lojas[0]){
        let onlyTargetSales = this.lojas.map(item => item.targetSales);
        let sum = onlyTargetSales.reduce((prev, next)=> Number(prev) + Number(next));
        return this.formatToNumber(sum);
      }
      return "0.00";
    },
    totalProductsSold() {
      if (this.lojas[0]){
        let onlyProductsSold = this.lojas.map(item => item.productsSold);
        let sum = onlyProductsSold.reduce((prev, next)=> Number(prev) + Number(next)).toString();
        return this.formatToNumber(sum/onlyProductsSold.length);
      }
      return "0.00";
    },
    totalAverageTicket() {
      if (this.lojas[0]){
        let onlyAverageTicket = this.lojas.map(item => item.averageTicket);
        let sum = onlyAverageTicket.reduce((prev, next)=> Number(prev) + Number(next));
        return this.formatToNumber(sum/onlyAverageTicket.length);
      }
      return "0.00";
    }
  },
  methods: {
    formatToNumber(number){
      return Number(number).toLocaleString('en-US',{ 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false
      });
    },
  }
};
</script>

<template>
  <TableTitle />

  <div class="divSales">
    <table class="tableSales">
      <TableHeader />
      <TableRow v-for="sales in lojas" :key="sales.name" :loja="sales" class="loja"/>
      <TableTotal :loja="{
                          name: 'Total',
                          sales: totalSales,
                          targetSales: totalTargetSales,
                          targetCompleted: '0%',
                          productsSold: totalProductsSold,
                          averageTicket: totalAverageTicket
                           }" />
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

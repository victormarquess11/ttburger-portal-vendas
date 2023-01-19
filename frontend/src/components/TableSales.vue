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
      sales: [],
      date: "2019-01-29",
    };
  },
  mounted() {
    fetch("http://localhost/api/vendas/" + this.date)
      .then((res) => res.json())
      .then((data) => (this.sales = data))
      .catch((err) => console.log(err.message));
  },
  computed: {
    totalSales() {
      if (this.sales[0]) {
        let onlySales = this.sales.map((item) => Number(item.valor_total));
        let sum = onlySales.reduce((prev, next) => Number(prev) + Number(next));
        return this.formatToNumber(sum);
      }
      return "0.00";
    },
    totalTargetSales() {
      if (this.sales[0]) {
        let onlyTargetSales = this.sales.map((item) => Number(item.meta_valor));
        let sum = onlyTargetSales.reduce(
          (prev, next) => Number(prev) + Number(next)
        );
        return this.formatToNumber(sum);
      }
      return "0.00";
    },
    totalProductsPerSale() {
      if (this.sales[0]) {
        let onlyProductsSold = this.sales.map(
          (item) => Number(item.qtd_produtos) / Number(item.qtd_vendas)
        );
        let sum = onlyProductsSold
          .reduce((prev, next) => Number(prev) + Number(next))
          .toString();
        return this.formatToNumber(sum / onlyProductsSold.length);
      }
      return "0.00";
    },
    totalAverageTicket() {
      if (this.sales[0]) {
        let onlyAverageTicket = this.sales.map(
          (item) => Number(item.valor_total) / Number(item.qtd_vendas)
        );
        let sum = onlyAverageTicket.reduce(
          (prev, next) => Number(prev) + Number(next)
        );
        return this.formatToNumber(sum / onlyAverageTicket.length);
      }
      return "0.00";
    },
  },
  methods: {
    formatToNumber(number) {
      return Number(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
      });
    },
    updateDate(input) {
      this.date = input;
      fetch("http://localhost/api/vendas/" + this.date)
        .then((res) => res.json())
        .then((data) => (this.sales = data))
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<template>
  <TableTitle />

  <div class="divSales">
    <table class="tableSales">
      <TableHeader @update-date="updateDate" />
      <TableRow
        v-for="sale in sales"
        :key="sale.loja"
        :sale="sale"
        class="salesRow"
      />
      <TableTotal
        :totals="{
          loja: 'Total',
          meta_valor: totalTargetSales,
          valor_total: totalSales,
          qtd_produtos: totalProductsPerSale,
          average_ticket: totalAverageTicket,
        }"
      />
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

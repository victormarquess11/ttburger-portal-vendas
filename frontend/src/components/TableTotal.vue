<script>
export default {
  props: {
    loja: {
      type: Object,
      default: () => ({
            name: "Total",
            sales: "0,00",
            targetSales: "0,00",
            targetCompleted: "0,0%",
            productsSold: "0,0",
            averageTicket: "0,00" 
      })
    },
  },
  computed: {
    salesFormatted() {
      return this.formatToCurrency(this.loja.sales);
    },
    targetSalesFormatted() {
      return this.formatToCurrency(this.loja.targetSales);
    },
    targetCompletedFormatted() {
      return this.formatToPercent(
        (this.loja.sales) / (this.loja.targetSales));
    },
    productsSoldFormatted() {
      return this.formatToNumber(this.loja.productsSold);
    },
    averageTicketFormatted() {
      return this.formatToCurrency(this.loja.averageTicket);
    }
  },
  methods: {
    formatToCurrency(numberToCurrency){
      return Number(numberToCurrency).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency', 
        currency: 'BRL'
      });
    },
    formatToPercent(number) {
      return Number(number).toLocaleString('pt-BR', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
        style: 'percent' 
      });
    },
    formatToNumber(number){
      return Number(number).toLocaleString('pt-BR', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false
      });
    }

  }
}
</script>

<template>
  <tr>
    <td class="nameCell">{{ loja.name }}</td>
    <td>{{ salesFormatted }}</td>
    <td>{{ targetSalesFormatted }}</td>
    <td>{{ targetCompletedFormatted }}</td>
    <td>{{ productsSoldFormatted }}</td>
    <td>{{ averageTicketFormatted }}</td>
  </tr>
</template>

<style scoped>
tr {
  background-color: #c0c0c0;
}

td {
  height: 40px;
  border: 2px solid;
  border-color: white;
  vertical-align: middle;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
}

.nameCell {
  color: #3c59ff;
  font-weight: 700;
  font-size: 18px;
}
</style>

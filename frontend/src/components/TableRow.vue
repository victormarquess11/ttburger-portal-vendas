<script>
export default {
  props: {
    loja: {
      type: Object,
      default: () => ({
            name: "Nome da Loja",
            sales: "0.00",
            targetSales: "0.00",
            targetCompleted: "0.0%",
            productsSold: "0.0",
            averageTicket: "0.00",
            targetProductsSold: "0.00"
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
        Number(this.loja.sales) / Number(this.loja.targetSales));
    },
    productsSoldFormatted() {         
      return this.formatToNumber(this.loja.productsSold);
    },
    averageTicketFormatted() {
      return this.formatToCurrency(this.loja.averageTicket);
    },
    activeColor() {
      if (Number(this.loja.targetProductsSold) > Number(this.loja.productsSold)){
        return 'red';
      }
      return 'green';
    },

  },
  methods: {
    formatToCurrency(number){
      return Number(number).toLocaleString('pt-BR', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL' 
      });
    },
    formatToPercent(number) {
      return Number(number).toLocaleString('pt-BR', { 
        minimumFractionDigits: 1,
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
    },
  }
}
</script>

<template>
  <tr>
    <td class="nameCell">{{ loja.name }}</td>
    <td>{{ salesFormatted }}</td>
    <td>{{ targetSalesFormatted }}</td>
    <td>{{ targetCompletedFormatted }} </td>
    <td>{{ productsSoldFormatted }} <span class="targetArrow" :style="{ color: activeColor }" >&#8681;</span></td>
    <td>{{ averageTicketFormatted }}</td>
  </tr>
</template>

<style scoped>
tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:nth-child(odd) {
  background-color: #ffffff;
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

.targetArrow {
  color: black;
  font-size: 26px;
  vertical-align: text-bottom;
}


</style>

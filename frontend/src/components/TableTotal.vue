<script>
export default {
  props: {
    totals: {
      type: Object,
      default: () => ({
            loja: "Total",
            meta_valor: "0,00",
            valor_total: "0",
            qtd_produtos: "0",
            average_ticket: "0.00"
      })
    },
  },
  computed: {
    salesFormatted() {
      return this.formatToCurrency(this.totals.valor_total);
    },
    targetSalesFormatted() {
      return this.formatToCurrency(this.totals.meta_valor);
    },
    targetCompletedFormatted() {
      return this.formatToPercent(
        (this.totals.valor_total) / (this.totals.meta_valor));
    },
    productsPerSaleFormatted() {
      return this.formatToNumber(this.totals.qtd_produtos);
    },
    averageTicketFormatted() {
      return this.formatToCurrency(this.totals.average_ticket);
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
    <td class="nameCell">{{ totals.loja }}</td>
    <td>{{ salesFormatted }}</td>
    <td>{{ targetSalesFormatted }}</td>
    <td>{{ targetCompletedFormatted }}</td>
    <td>{{ productsPerSaleFormatted }}</td>
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

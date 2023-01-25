<script>
export default {
  props: {
    sale: {
      type: Object,
      default: () => ({
        loja: "Nome da Loja",
        valor_total: "0.00",
        qtd_produtos: "0",
        qtd_vendas: "0",
        qtd_clientes: "0",
        meta_valor: "0.00",
        meta_prod_clt: "0.0",
      }),
    },
  },
  computed: {
    salesFormatted() {
      return this.formatToCurrency(this.sale.valor_total);
    },
    targetSalesFormatted() {
      return this.formatToCurrency(this.sale.meta_valor);
    },
    targetCompletedFormatted() {
      return this.formatToPercent(
        Number(this.sale.valor_total) / Number(this.sale.meta_valor)
      );
    },
    productsPerSaleFormatted() {
      return this.formatToNumber(
        Number(this.sale.qtd_produtos) / Number(this.sale.qtd_vendas)
      );
    },
    averageTicketFormatted() {
      return this.formatToCurrency(
        Number(this.sale.valor_total) / Number(this.sale.qtd_vendas)
      );
    },
    activeColor() {
      if (Number(this.sale.meta_prod_clt) > Number(this.sale.qtd_produtos)) {
        return "red";
      }
      return "green";
    },
  },
  methods: {
    formatToCurrency(number) {
      return Number(number).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      });
    },
    formatToPercent(number) {
      return Number(number).toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        style: "percent",
      });
    },
    formatToNumber(number) {
      return Number(number).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
      });
    },
  },
};
</script>

<template>
  <tr>
    <td class="nameCell">{{ sale.loja }}</td>
    <td>{{ salesFormatted }}</td>
    <td>{{ targetSalesFormatted }}</td>
    <td>{{ targetCompletedFormatted }}</td>
    <td>
      {{ productsPerSaleFormatted }}
      <span v-if="activeColor == 'red'" class="red Arrow">&#8681;</span>
      <span v-if="activeColor == 'green'" class="green Arrow">&#8679;</span>
    </td>
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

.lojaCell {
  color: #3c59ff;
  font-weight: 700;
  font-size: 18px;
}

.Arrow {
  color: black;
  font-size: 27px;
  vertical-align: text-bottom;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>

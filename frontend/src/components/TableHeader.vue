<script>
import debounce from 'lodash.debounce'

export default {
  props: {},
  data() {
    return {
      date: "2022-01-29",
      salesHeader: "Venda",
      targetHeader: "Meta",
      completedTargetHeader: "Atingimento da meta",
      productsSoldHeader: "Quantidade de produtos / cliente",
      averageTicketHeader: "Ticket médio / cliente"
    };
  },
  methods: {
    callDebouncer: debounce(function(){
      this.debouncer();
    }, 1000),
    debouncer() {
      this.messager('A')
    },
    messager(beacon) {
      console.log(`debounced from ${beacon}`)
    }  
  },
}
</script>

<template>
  <tr>
    <th>
      <div id="dateHeader">
        <input type="date" v-model="date" @input="callDebouncer" max="2099-12-31" min="2013-01-01" />
        <span class="validity"></span>
      </div>
    </th>
    <th>{{ salesHeader }}</th>
    <th>{{ targetHeader }}</th>
    <th>{{ completedTargetHeader }}</th>
    <th>{{ productsSoldHeader }}</th>
    <th>{{ averageTicketHeader }}</th>
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

input {
  border: none;
  height: 25px;
  text-align: center;
}

input:invalid + span::after {
  content: "✖";
}

.validity {
  color: red;
  margin-left: 5px;
}
</style>

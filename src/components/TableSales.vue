<template>
    <div class="divSales">
        <table class="tableSales">
            <tr>
                <th>29/01/2020</th>
                <th>Venda (R$)</th>
                <th>Meta (R$)</th>
                <th>Atingimento da meta (%)</th>
                <th>Quantidade de produtos / cliente</th>
                <th>Ticket médio / cliente</th>
            </tr>
            <tr>
                <td class="nameCell">Arpoador</td>
                <td>0</td>
                <td>11200</td>
                <td>0%</td>
                <td>0,0</td>
                <td>0,0</td>
            </tr>
            <tr>
                <td class="nameCell">Leblon</td>
                <td>0</td>
                <td>12332</td>
                <td>0%</td>
                <td>0,0</td>
                <td>0,0</td>
            </tr>
            <tr>
                <td class="nameCell">Barra</td>
                <td>0</td>
                <td>5418</td>
                <td>0%</td>
                <td>0,0</td>
                <td>0,0</td>
            </tr>
            <tr>
                <td class="nameCell">Total</td>
                <td>0</td>
                <td>5418</td>
                <td>0%</td>
                <td>0,0</td>
                <td>0,0</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
    
    .divSales {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-x: scroll;
    }

    table {
        text-align: center;
        border: 1px solid;
        border-color: red;
        overflow: scroll;
        border-collapse: collapse;
        vertical-align: middle;
        font-size: 16px;
        font-weight: 500;
    }

    tr:nth-child(even){
        background-color: #F2F2F2;
    }

    tr:nth-child(odd) {
        background-color: #FFFFFF;
    }

    tr:last-child {
        background-color: #C0C0C0;
    }

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

    td {
        height: 40px;
        border: 2px solid;
        border-color: white;
        vertical-align: middle;
        font-size: 18px;
    }

    .nameCell {
        color: #3C59FF;
        font-weight: 700;
    }


    @media screen and (max-width: 520px) {
    .divSales {
      display: flex;
      justify-content: flex-start;
    }
  }

</style>
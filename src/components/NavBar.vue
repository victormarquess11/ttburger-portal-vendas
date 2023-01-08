<template>
    <header class="navbar">

        <div class="left-items">

            <div class="navItems title-nav-items">
                <p>T.T Burger</p>
            </div>

            <div class="navItems middle-nav-items">
                <p>Início</p>
            </div>
            
        </div>

        <div class="navItems right-items">
            <p>Logout</p>
        </div>

    </header>
  </template>

<style scoped>
    .navbar {
        height: 50px;
        width: 100%;
        background-color: black;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .left-items {
        padding-right: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 80%;
        min-width: 60px;
    }

    .right-items {
        padding-right: 10px;
        display: flex;
        justify-content: flex-end;
        width: 20%;
        min-width: 100px;
    }

    .title-nav-items {
        padding-left: 10px;
        width: 10%;
        min-width: 140px;
    }

    .middle-nav-items {
        padding-left: 10px;
        display: flex;
        justify-content: flex-start;
        width: 90%;
        min-width: 140px;
    }

    .title-nav-items p {
        font-size: 22px;
        font-weight: 700;
    }

    .right-items p {
        color: rgb(141, 141, 141);
        font-weight: 450;
    }

    .navItems p {
        padding-left: 15px;
        padding-right: 15px;
        font-size: 16px;
        color: white;
        font-weight: 400;
    }

</style>
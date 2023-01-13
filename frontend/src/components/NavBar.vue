<template>
    <header class="navbar">

        <div class="left-items">

            <div class="navItems title-nav-items">
                <p>T.T. Burger</p>
            </div>

            <div class="navItems middle-nav-items">
                <p>Início</p>
            </div>

        </div>

        <div class="right-items">
            <div class="navItems">
                <p>Logout</p>
            </div>
        </div>

    </header>
  </template>

<style scoped>
    .navbar {
        height: 50px;
        width: 100vw;
        background-color: black;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navItems p {
        padding-left: 15px;
        padding-right: 15px;
        font-size: 16px;
        color: white;
        font-weight: 400;
    }

    .left-items {
        padding-right: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 80%;
        flex: 2 3 80%;
    }

    .right-items {
        padding-right: 10px;
        display: flex;
        justify-content: flex-end;
        width: 20%;
        flex: 0 0 20%;
    }

    .title-nav-items {
        padding-left: 10px;
        flex: 0 0 10%;
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
        font-size: 20px;
        font-weight: 600;
    }

    .right-items p {
        color: rgb(141, 141, 141);
        font-weight: 450;
    }
</style>
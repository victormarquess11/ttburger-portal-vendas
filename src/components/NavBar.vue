<template>
    <header class="navbar">
        <div class="left-items">
            <div class="title-nav-items">
                <p id="title-nav" class="navItems">T.T Burger</p>
            </div>
            <div class="middle-nav-items">
                <p id="home-nav" class="navItems">Início</p>
            </div>
        </div>
        <div class="right-items">
            <p id="logout-nav" class="navItems">Logout</p>
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

    .navItems {
        padding-left: 15px;
        padding-right: 15px;
        font-size: 20px;
        color: white;
        font-weight: 400;
    }

    #title-nav {
        font-size: 22px;
        font-weight: 700;
    }

    #logout-nav {
        color: rgb(141, 141, 141);
    }

</style>
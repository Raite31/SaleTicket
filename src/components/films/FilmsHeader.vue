<template>
    <ul>
        <router-link to="/films/nowplaying" custom v-slot="{navigate,isActive}">
            <li @click="navigate">
                <span :class="isActive?'leeActive':''">正在热映</span>
            </li>
        </router-link>
        <router-link to="/films/comingsoon" custom v-slot="{navigate,isActive}">
            <li @click="navigate">
                <span :class="isActive?'leeActive':''">即将上映</span>
            </li>
        </router-link>
    </ul>
</template>
<style lang="scss" scoped>
ul{
    display: flex;
    height: 2.7222rem;
    line-height: 2.7222rem;
    li{
        flex: 1;
        text-align: center;
    }
}
.leeActive{
    color: red;
    border-bottom: 2px solid red;
}
</style>

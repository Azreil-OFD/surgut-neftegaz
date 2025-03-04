<template>
  <div v-if="slide" class="logo-slide">
  </div>
  <div :class="(slide ? 'wrapper ' : '')">
    <div class="background">
      <div class="form">
        <slot />
      </div>
    </div>
  </div>
  <div v-if="slide" class="down-slide">
  </div>
</template>

<script lang="ts" setup>
const slide = ref(false)
</script>

<style lang="scss">
.wrapper {
  position: absolute;
  top: 8vh;
  left: 4vh;
  bottom: 4vh;
  right: 4vh;
  border: 1px solid black;
}

.logo-slide {
  position: absolute;
  width: 40vh;
  height: 8vh;
  background-color: aqua;
}

.background {
  background-color: #0ea5e9;
  height: 100vh;

  .form {
    padding: 2vh 1vh;
    border: 1px solid black;
    border-radius: 6px;
    position: absolute;
    background-color: white;
    left: 35%;
    top: 30%;

  }
}

.down-slide {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2vh;
  background-color: orange;
}

* {
  padding: 0;
  margin: 0;
}
</style>
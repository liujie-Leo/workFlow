<template>
  <div class="error-page">
    <div>
      <h1 data-h1="Welcome">Welcome</h1>
      <p data-p="Vue3 + Vite + ElementPlus + TailWindCSS">Vue3 + Vite + ElementPlus + TailWindCSS</p>
      <p class="btn" @click="goWeb">Uni-Cli npm</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goWeb = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.btn {
  color: rgba(0, 0, 0, 0.4);
  text-decoration: underline;
  cursor: pointer;
  margin-top: 24px;
}
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
  background: #f7f7f7;
}

.error-page h1 {
  font-size: 30vh;
  font-weight: bold;
  position: relative;
  margin: -8vh 0 0;
  padding: 0;
}

.error-page h1:after {
  content: attr(data-h1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: transparent;
  /* webkit only for graceful degradation to IE */
  background: -webkit-repeating-linear-gradient(-45deg, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.25);
  animation: animateTextBackground 10s ease-in-out infinite;
}

.error-page h1 + p {
  color: #d6d6d6;
  text-align: center;
  font-size: 4vh;
  font-weight: bold;
  line-height: 10vh;
  position: relative;
}

.error-page h1 + p:after {
  content: attr(data-p);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: transparent;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}

@keyframes animateTextBackground {
  0% {
    background-position: 0 0;
  }

  25% {
    background-position: 100% 0;
  }

  50% {
    background-position: 100% 100%;
  }

  75% {
    background-position: 0 100%;
  }

  100% {
    background-position: 0 0;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .error-page h1 {
    font-size: 32vw;
  }

  .error-page h1 + p {
    font-size: 8vw;
    line-height: 10vw;
    max-width: 70vw;
  }
}
</style>

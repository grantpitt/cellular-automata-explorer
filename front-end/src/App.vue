<template>
  <div id="app">
    <header>
      <router-link id="title" to="/">The Cellular Automata Explorer</router-link>
    </header>

    <router-view />

    <footer>
      <p>
        See the GitHub repositiory for this project
        <a
          target="_blank"
          href="https://github.com/grantpitt/real-final"
          >here</a
        >
      </p>
    </footer>
  </div>
</template>

<style>
@import "./assets/plus-jakarta-sans.css";

:root {
  /* This project specific start */
  --darkest: #000;
  /* This project specific end */
  --harvard-dark-1: #0e0e0e;
  --harvard-dark-2: #1e1e1e;
  --harvard-dark-3: #656f77;

  --earth-grey-1: #f5f5f5f5;
  --earth-grey-1dot2: #e0e0e0;
  --earth-grey-1dot5: #e7e7e7;
  --earth-grey-2: #dedede;
  --earth-grey-3: #c7c7c7;
  --earth-grey-4: #b0b0b0;
  --earth-grey-5: #999999;
  --earth-grey-6: #828282;
  --earth-grey-7: #6b6b6b;

  --north-blue-1: #43b0f1;
  --north-blue-2: #057dcd;
  --north-blue-3: #1e3d58;

  --nice-blue: #17283a;
  --c9-terminal: #f0f7ff;

    --gradient-1: #0072ff;
  /*#4ca9df;*/

  --gradient-2: #00c6ff;
  /*#8de339;*/
  --gradient-3: #3a86ff;
  --gradient-4: #8338ec;
  --gradient-5: #ff006e;
  --gradient-6: #fb5607;
  --gradient-7: #ffbe0b;
}

::selection {
  background: rgba(220, 220, 220, 0.8);
}

body {
  padding: 46px 0 140px;
  margin: 0;
  font-family: Jakarta;
  box-sizing: border-box;
  background-color: #f0f7ff;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
  min-height: 100vh;
}

#app {
  color: #2c3e50;
}

header {
  height: 46px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 900;
  background-color: var(--darkest);
  display: flex;
  align-items: center;
  justify-content: center;
}

#title {
  font-size: 20px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}

/*#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
*/
footer p {
  font-size: 18px;
  margin: 0;
}
footer a {
  color: dodgerblue;
}
footer a:visited {
  color: plum;
}

footer {
  height: 140px;
  box-sizing: border-box;
  position: absolute !important;
  bottom: 0px;
  left: 0;
  width: 100%;
  background-color: var(--darkest);
  padding: 2.5em;
  color: #e0e0e0;
  text-align: left;
}
</style>

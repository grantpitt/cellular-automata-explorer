<template>
  <div class="home">
    <section class="home-top">
      <div class="general-rel-wrap flex">
        <span class="general-abs-wrap">
            <img
            id="front-img"
            class="general-img-cover"
            src="@/assets/CA_rule30s.png"
            alt=""
          />
        </span>
        <div class="general-abs-wrap spiral">
          <!-- The spiral area -->
          <h2 class="the">The</h2>
          <h2 class="cellular">Cellular</h2>
          <h2 class="automata">Automata</h2>
          <h2 class="explorer">Explorer</h2>

        </div>
        <div class="btn-row">
          <a class="btn" href="#">View Examples</a>
          <router-link class="btn" to="/login">Sign In</router-link>
          <router-link class="btn" to="/register">Register</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
.home-top {
  height: calc(94vh - 46px);
  display: flex;
  max-width: 100%;
  position: relative;
}

#front-img {
  filter:  opacity(36%)
}

.clip {
  display: inline-block;
  color: navy;
}

.the,
.cellular,
.automata,
.explorer {
  color: #fff;
  position: absolute;
  white-space: nowrap;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.the {
  right: 0;
  transform: translate(-56%, -78%);
  background-image: linear-gradient(
    135deg,
    var(--gradient-3),
    var(--gradient-4)
  );
}
.cellular {
  right: 0;
  transform: rotate(90deg) translate(38%, -108%);
  background-image: linear-gradient(
    45deg,
    var(--gradient-4),
    var(--gradient-5)
  );
}
.automata {
  bottom: 0;
  transform: rotate(180deg) translate(-22%, -78%);
  background-image: linear-gradient(
    45deg,
    var(--gradient-5),
    var(--gradient-6)
  );
}
.explorer {
  bottom: 0;
  transform: rotate(-90deg) translate(40%, -124%) !important;
  background-image: linear-gradient(
    135deg,
    var(--gradient-6),
    var(--gradient-7)
  );
}

.flex {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.spiral {
  font-size: 64px;
  font-weight: 700;
  position: relative;
  font-weight: 700;
}

.btn-row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
  /*  flex-basis: 100%;*/
  width: fit-content;
  padding: 20px 0;
  text-align: center;
  transition: all 0.2s ease;
}

.btn {
  display: inline-block;
  color: #fff;
  background-color: #000;
  font-weight: 600;
  font-size: 20px;
  padding: 12px 16px;
  margin: 10px;
  box-sizing: border-box;
  text-decoration: none;
  overflow: auto;
}
.btn:hover {
  background-color: var(--gradient-3);
}

/* General cover image */
.general-rel-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
.general-abs-wrap {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

.img-abs img, .general-img-cover {
    background-repeat: no-repeat;
    position: relative;
    width: 100%;
    height: 101% !important;
    object-fit: cover;
    display: block;
    max-width: 100%;
    box-sizing: border-box;
}
</style>

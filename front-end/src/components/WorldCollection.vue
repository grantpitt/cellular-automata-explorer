<template>
  <div>
    <section class="world-collection">
      <div class="world" v-for="world in worlds" v-bind:key="world._id">
<!--         <router-link class="block" :to="'/world/' + world._id"> -->
          <img class="world-img" :src="world.path" />
          <div class="details-box">
            <p class="worldRule"> Rule: {{ world.rule }}</p>
          <p class="worldDate">{{ formatDate(world.created) }}</p>
        </div>
<!--         </router-link> -->
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "WorldCollection",
  props: {
    worlds: Array,
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    }
  },
};
</script>

<style>
.world-collection {
  display: grid;
  gap:  30px;
  grid-template-columns: 1fr 1fr;
}
/*.world {
  max-width: 150px;
}*/
.world-img {
  max-width: 100%;
  margin-bottom: 0px;
}
.details-box {
  background-color: #000;
  color: #fff;
  padding: 2em;
  margin-top: -3px;
}
.details-box * {
  margin: 0;
}
.worldRule {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}
</style>
<template>
  <div>
    <section class="world-collection">
      <div class="world" v-for="world in worlds" v-bind:key="world._id">
<!--         <router-link class="block" :to="'/world/' + world._id"> -->
          <img :src="world.path" />
          <p class="worldDate">{{ formatDate(world.created) }}</p>
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


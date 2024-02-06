<template>
  <div class="heading">Manna Premier League - Teams</div>

  <div
    class="q-pa-md row items-start q-gutter-md"
    v-for="team in allTeams"
    v-bind:key="team.id"
  >
    <q-card class="my-card col-3" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ team.team_name }}</div>
          <div class="text-caption">Points :</div>
          <div class="text-caption">Max Bid Amount :</div>
          <div class="text-caption">Total : 0/12</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img class="rounded-borders" :src="team.team_logo" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import constants from "src/constants";

export default {
  data() {
    return {
      allTeams: [],
    };
  },
  methods: {
    getAllTeams() {
      axios
        .get(constants.BACKEND_API_URL + "/teams")
        .then((response) => {
          this.allTeams = response.data;
        })
        .catch((err) => {
          console.log("Error in add player== ", err);
        });
    },
  },
  mounted() {
    this.getAllTeams();
  },
};
</script>

<style scoped>
.heading {
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  font-size: xx-large;
  font-family: auto;
  border: 2px solid red;
  border-radius: 5px;
}
</style>

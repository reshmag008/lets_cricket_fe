<template>
  <div class="heading heading--h1" >Teams Budget</div>

  <div class="players">
    <div id="contentToConvert" v-for="team in allTeams" v-bind:key="team.id">
      <q-card class="players__card card col-3" @click="getTeamProfile(team)" >
        <q-card-section class="players__card-wrap">
          <div>
            <q-img
              spinner-color="#1976d2"
              class="players__image"
              :src="team.team_logo"
              
            />
          </div>
          <div class="players__details-wrap">
            <div class="players__name text-overflow">
              <strong>{{ team.team_name }}</strong>
            </div>
            <div class="players__id">Points :  {{ team.total_points }}</div>
            <!-- <div class="players__location">Max Bid Amount : {{ team.max_bid_amount }}</div> -->
            <div class="players__location">Total : {{ team.player_count }}/10 </div>
            
          </div>
        </q-card-section>
      </q-card>
    </div>
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

    getTeamProfile(team){
      localStorage.setItem('currentTeam', JSON.stringify(team));
      this.$router.push('team-profile')
    },
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


.players {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 2rem;
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem;
}
.players__card {
  min-height: 17rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  border: 1px solid #d4d4d4;
}
.players__image {
  width: 15rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 0.5rem;
  object-position: 50% 30%;
}
.players__card-wrap {
  display: flex;
  gap: 2rem;
  cursor: pointer;
}
.players__name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1c1b;
}
.players__details {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 1rem;
}
.players__id {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1a1c1b;
}
.players__details p,
.players__location {
  font-size: 1.5rem;
  font-weight: 400;
  color: #252927;
}
.players__location {
  margin-bottom: 1rem;
}
.player__name {
  font-size: 3rem;
  font-weight: 700;
  line-height: 2.5rem;
  margin-bottom: 1rem;
}
.player__image {
  width: 25rem;
  height: 25rem;
  object-fit: cover;
  border-radius: 0.8rem;
}
.player {
  padding: 3rem;
}
.close--btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: white;
  border-radius: 20rem;
  width: 4rem;
  height: 4rem;
  border: 1px solid #d4d4d4;
}
.players__details-wrap {
  width: calc(100% - 14rem);
}
.text-overflow {
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
}
@media only screen and (max-width: 50rem) {
  .player {
    flex-direction: column;
  }
}

</style>

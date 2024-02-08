<template>
  <div class="heading heading--h1">Manna Premier League - Auction Center</div>

  <div class="auction">
    <div class="spinner__wrap" v-if="showSpinner">
      <q-spinner-pie class="spinner" color="orange"  />
    </div>
    <!-- v-if="showSpinner" -->
    <div v-if="!showSpinner && currentBidPlayer.id">
      <q-card class="card">
        <q-card-section horizontal class="player">
          <div>
            <q-img class="player__image" :src="currentBidPlayer.profile_image" />
          </div>
          <div>
            <div class="player__name">{{ currentBidPlayer.fullname }}</div>
            <div class="players__id">Reg#: {{ currentBidPlayer.id }}</div>
            <div class="players__location">
              Location : {{ currentBidPlayer.location }}
            </div>
            <div class="players__location">
              {{ currentBidPlayer.contact_no }}
            </div>
            <div class="players__details">
              <img style="height: 2rem; width: 2rem" src="~assets/account-cowboy-hat.svg" class="poster" />
              <p>{{ currentBidPlayer.player_role }}</p>
            </div>
            <div class="players__details">
              <img style="height: 2rem; width: 2rem" src="~assets/cricket.svg" class="poster" />
              <p>{{ currentBidPlayer.batting_style }}</p>
            </div>
            <div class="players__details">
              <img style="height: 2rem; width: 2rem" src="~assets/tennis-ball.svg" class="poster" />
              <p>{{ currentBidPlayer.bowling_style }}</p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="text-center mt-sm">
      <q-btn class="button" color="primary" label="Select Player" v-if="!showSpinner" @click="getAllNonBidPlayers" />
    </div>

    <div class="filter mt-sm">
      <div>
        <p class="label">Please enter amount</p>
        <q-input type="number" class="col-3" ref="bidAmountRef" outlined v-model="bidAmount" label="Amount *" lazy-rules
          :rules="amountRules" />
      </div>


      <div>
        <p class="label">Please select team</p>
        <q-select class="col-3" ref="bidTeamRef" outlined v-model="bidTeam" :options="teamOptions" label="Select Team"
          lazy-rules :rules="teamSelectRules" />
      </div>

      <!-- <q-btn
          class="glossy button"
          type="submit"
          rounded
          color="deep-orange"
          label="Sell Player"
        /> -->

      <q-btn v-if="bidAmount && bidTeam" class="glossy button" rounded color="deep-orange" label="Sell" type="submit"
        @click="sellPlayer" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import constants from "src/constants";
import { ref } from "vue";

export default {
  data() {
    return {
      showSpinner: false,
      players: [],
      currentBidPlayer: {},
      bidAmount: "",
      bidTeam: "",
      teamOptions: [],
    };
  },

  methods: {
    sellPlayer() {
      this.showSpinner = true;
      let params = {
        id: this.currentBidPlayer.id,
        team_id: this.bidTeam.value,
        bid_amount: this.bidAmount,
      };
      console.log("params== ", params);
      axios
        .put(constants.BACKEND_API_URL + "/players", params)
        .then((response) => {
          console.log("Get Player response== ", response);
          this.players = response.data;
          this.getAllNonBidPlayers();
          this.onReset();
        })
        .catch((err) => {
          console.log("Error in add player== ", err);
          this.showSpinner = false;
        });
    },

    onReset() {
      this.bidTeam = '';
      this.bidAmount = ''
    },

    selectRandomPlayer() {
      const random = Math.floor(Math.random() * this.players.length);
      console.log(random, this.players[random]);
      this.currentBidPlayer = this.players[random];
      this.showSpinner = false;
    },
    getAllNonBidPlayers() {
      this.showSpinner = true;
      axios
        .get(constants.BACKEND_API_URL + "/non_bid_players")
        .then((response) => {
          console.log("Get Player response== ", response);
          this.players = response.data;
          if (this.players.length > 0) {
            this.selectRandomPlayer();
          } else {
            this.showSpinner = false;
          }
        })
        .catch((err) => {
          console.log("Error in add player== ", err);
          this.showSpinner = false;
        });
    },

    getAllTeams() {
      axios
        .get(constants.BACKEND_API_URL + "/teamNames")
        .then((response) => {
          this.allTeams = response.data;
          this.allTeams.forEach((element) => {
            this.teamOptions.push({
              label: element.team_name,
              value: element.id,
            });
          });
        })
        .catch((err) => {
          console.log("Error in add player== ", err);
        });
    },
  },

  mounted() {
    this.getAllNonBidPlayers();
    this.getAllTeams();
  },
};
</script>

<style scoped>
.auction {
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem;

}

.filter {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1rem 2rem;
}

/* .card {} */

.spinner__wrap {
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {

  font-size: 20rem;
}

.players__card {
  min-height: 17rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  border: 1px solid #d4d4d4;
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
  font-size: 2rem;
  font-weight: 600;
  color: #1a1c1b;
}

.players__details p,
.players__location {
  font-size: 1.6rem;
  font-weight: 400;
  color: #252927;
}

.players__location {
  margin-bottom: 1rem;
}

.player__name {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 2.5rem;
  margin-bottom: 1rem;
}

.player__image {
  width: 20rem;
  height: 30rem;
  object-fit: cover;
  border-radius: 0.8rem;
}

.player {
  padding: 3rem;
  gap: 2rem;
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

.center {
  margin: 0 auto;
}

@media only screen and (max-width: 40rem) {
  .player {
    flex-direction: column;
  }
}
</style>

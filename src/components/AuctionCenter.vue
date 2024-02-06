<template>
  <div class="heading">Manna Premier League - Auction Center</div>

  <div>
    <q-spinner-pie class="spinner" color="orange" v-if="showSpinner" />

    <div v-if="!showSpinner && currentBidPlayer.id">
      <q-card class="card">
        <q-card-section horizontal class="player">
          <div>
            <q-img
              class="player__image"
              :src="currentBidPlayer.profile_image"
            />
          </div>
          <q-card-section>
            <div class="player__name">{{ currentBidPlayer.fullname }}</div>
            <div class="players__id">Reg#: {{ currentBidPlayer.id }}</div>
            <div class="players__location">
              Location : {{ currentBidPlayer.location }}
            </div>
            <div class="players__location">
              {{ currentBidPlayer.contact_no }}
            </div>
            <div class="players__details">
              <img
                style="height: 2rem; width: 2rem"
                src="~assets/account-cowboy-hat.svg"
                class="poster"
              />
              <p>{{ currentBidPlayer.player_role }}</p>
            </div>
            <div class="players__details">
              <img
                style="height: 2rem; width: 2rem"
                src="~assets/cricket.svg"
                class="poster"
              />
              <p>{{ currentBidPlayer.batting_style }}</p>
            </div>
            <div class="players__details">
              <img
                style="height: 2rem; width: 2rem"
                src="~assets/tennis-ball.svg"
                class="poster"
              />
              <p>{{ currentBidPlayer.bowling_style }}</p>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <q-btn
      class="glossy button"
      rounded
      color="deep-orange"
      label="Select Player"
      v-if="!showSpinner"
      @click="getAllNonBidPlayers"
    />

    <div class="row">
      <q-input
        type="number"
        class="col-3"
        ref="bidAmountRef"
        filled
        v-model="bidAmount"
        label="Amount *"
        hint="Please enter amount"
        lazy-rules
        :rules="amountRules"
      />

      <q-select
        class="col-3"
        ref="bidTeamRef"
        filled
        v-model="bidTeam"
        :options="teamOptions"
        label="Select Team"
        hint="Please select team"
        lazy-rules
        :rules="teamSelectRules"
      />

      <!-- <q-btn
          class="glossy button"
          type="submit"
          rounded
          color="deep-orange"
          label="Sell Player"
        /> -->

      <q-btn
        v-if="bidAmount && bidTeam"
        class="glossy button"
        rounded
        color="deep-orange"
        label="Sell"
        type="submit"
        @click="sellPlayer"
      />
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
    onReset() {},
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
        })
        .catch((err) => {
          console.log("Error in add player== ", err);
          this.showSpinner = false;
        });
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
.col-3 {
  margin-right: 10px;
}
.row {
  padding: 10px;
}
.card {
  height: 50%;
  width: 80%;
  margin: 20px;
  /* text-align: center; */
  display: flex;
}
.button {
  padding: 10px;
  margin-top: 10px;
  text-align: center;
}
.heading {
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  font-size: xx-large;
  font-family: auto;
  border: 2px solid red;
  border-radius: 5px;
}

.spinner {
  padding: 10px;
  margin-top: -5px;
  font-size: 200px;
  text-align: center;
}

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
  width: 18rem;
  height: 21rem;
  object-fit: cover;
  border-radius: 0.5rem;
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
  font-size: 2rem;
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

<template>
  <div class="heading heading--h1">Manna Premier League - Player Pool</div>

  <!-- <button @click="exportToPDF" style="cursor: pointer">Export to PDF</button> -->
  <div style="padding: 20px">
    Registered players: {{ players.length }} | Sold: 0 | Unsold: 0 | Pending:{{
      players.length
    }}
  </div>

  <div class="players">
    <div id="contentToConvert" v-for="player in players" v-bind:key="player.id">
      <q-card class="players__card card col-3" @click="openPopup(player)">
        <q-card-section class="players__card-wrap">
          <!-- <q-card-section class="players__image"> -->
          <div>
            <q-img
              spinner-color="#1976d2"
              class="players__image"
              :src="player.profile_image"
              
            />
          </div>
          <!-- </q-card-section> -->
          <div class="players__details-wrap">
            <div class="players__name text-overflow">
              <strong>{{ player.fullname }}</strong>
            </div>
            <div class="players__id">Reg#: {{ player.id }}</div>
            <div class="players__location">{{ player.location }}</div>
            <div class="players__location">{{ player.contact_no }}</div>
            <div class="players__details">
              <img
                style="height: 1.6rem; width: 1.6rem"
                src="~assets/account-cowboy-hat.svg"
                class="poster"
              />
              <p>{{ player.player_role }}</p>
            </div>
            <div class="players__details">
              <img
                style="height: 1.6rem; width: 1.6rem"
                src="~assets/cricket.svg"
                class="poster"
              />
              <p>{{ player.batting_style }}</p>
            </div>
            <div class="players__details">
              <img
                style="height: 1.6rem; width: 1.6rem"
                src="~assets/tennis-ball.svg"
                class="poster"
              />
              <p>{{ player.bowling_style }}</p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="q-pa-md q-gutter-sm" v-if="persistent">
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="card" style="width: 800px">
        <q-card-section horizontal class="player">
          <!-- <q-card-section class="players__image">
          </q-card-section> -->
          <div>
            <q-img class="player__image" :src="activePlayer.profile_image" />
          </div>
          <q-card-section>
            <div class="player__name">{{ activePlayer.fullname }}</div>
            <div class="players__id">Reg#: {{ activePlayer.id }}</div>
            <div class="players__location">
              Location : {{ activePlayer.location }}
            </div>
            <div class="players__location">{{ activePlayer.contact_no }}</div>
            <div class="players__details">
              <img
                style="height: 2rem; width: 2rem"
                src="~assets/account-cowboy-hat.svg"
                class="poster"
              />
              <p>{{ activePlayer.player_role }}</p>
            </div>
            <div class="players__details">
              <img
                style="height: 2rem; width: 2rem"
                src="~assets/cricket.svg"
                class="poster"
              />
              <p>{{ activePlayer.batting_style }}</p>
            </div>
            <div class="players__details">
              <img
                style="height: 2rem; width: 2rem"
                src="~assets/tennis-ball.svg"
                class="poster"
              />
              <p>{{ activePlayer.bowling_style }}</p>
            </div>
          </q-card-section>
        </q-card-section>

        <!-- <q-card-actions align="right" class="bg-white text-teal"> -->
        <q-btn flat v-close-popup class="close--btn">
          <img
            style="height: 2rem; width: 2rem"
            src="~assets/close_icon.svg"
            class="poster"
        /></q-btn>
        <!-- </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import constants from "src/constants";

export default {
  data() {
    return {
      players: [],
      persistent: false,
      activePlayer: {},
    };
  },

  methods: {
    exportToPDF() {
      // html2pdf(document.getElementById("contentToConvert"));

      var element = document.getElementById("contentToConvert");
      var opt = {
        margin: 1,
        filename: "myfile.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // New Promise-based usage:
      html2pdf().from(element).set(opt).save();

      // Old monolithic-style usage:
      html2pdf(element, opt);
    },

    openPopup(player) {
      console.log("popppppppp");
      this.persistent = true;
      this.activePlayer = player;
    },
    getAllPlayers() {
      axios
        .get(constants.BACKEND_API_URL + "/players")
        .then((response) => {
          console.log("Add Player response== ", response);
          this.players = response.data;
        })
        .catch((err) => {
          console.log("Error in add player== ", err);
        });
    },
  },
  mounted() {
    this.getAllPlayers();
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
  height: 22rem;
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

<template>
    <div class="heading heading--h1">
      <q-btn outline  rounded color="primary" icon="arrow_back"  @click="$router.push('teams')" 
      style="margin-right:20px"/>

        <q-img
                spinner-color="#1976d2"
                class="logo_display"
                :src="currentTeam.team_logo" />
    {{ currentTeam.team_name }} - Players</div>
  
    <div class="players">
      <div id="contentToConvert" v-for="player in players" v-bind:key="player.id">
        <q-card class="players__card card col-3" >
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
              <div class="players__id">Points: {{ player.bid_amount }}</div>
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
        currentTeam:{}
      };
    },
  
    methods: {
      
      
      getTeamPlayers() {
        axios
          .get(constants.BACKEND_API_URL + `/players/${this.currentTeam.id}`)
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
      this.currentTeam = JSON.parse(localStorage.getItem('currentTeam'));
      console.log("currentTeam== ", this.currentTeam);
      this.getTeamPlayers();
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
  .logo_display{
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 0.5rem;
    object-position: 50% 30%;
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
  
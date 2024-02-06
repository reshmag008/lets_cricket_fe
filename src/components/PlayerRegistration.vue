<template>
  <div class="q-pa-md">
    <h4 class="heading heading--h1">Player Registration</h4>
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="players-reg">
      <div class="input__field">
        <p class="label">Please enter your full name</p>

        <q-input ref="nameRef" outlined v-model="name" label="Full name *" lazy-rules :rules="nameRules" />
      </div>
      <div class="input__field">
        <p class="label">Please enter your location</p>
        <q-input ref="locationRef" outlined type="text" v-model="location" label="Location *" lazy-rules
          :rules="locationRules" />
      </div>

      <!-- <div class="row">
        <q-input
          class="col"
          ref="jerseyNoRef"
          filled
          type="numbe
          v-model="jersey_no"
          label="Jersey Number *"
          hint="Please enter your preffered jersey number"
          lazy-rules
          :rules="jerseyNoRules"
        /> -->

      <!-- <q-input
          class="col"
          ref="jerseySizeRef"
          filled
          type="number"
          v-model="jersey_size"
          label="Jersey Size *"
          hint="Please enter your jersey size"
          lazy-rules
          :rules="jerseySizeRules"
        /> -->
      <!-- </div> -->

      <!-- <div class="row">
        <q-input
          class="col"
          ref="jerseyNameRef"
          filled
          type="text"
          v-model="jersey_name"
          label="Jersey Name"
          hint="Please enter your preffered jersey name"
        />

        <q-input
          class="col"
          ref="profileLinkRef"
          filled
          type="text"
          v-model="profile_link"
          label="Player Profile Link"
          hint="Please enter your player profile link (if any)"
        />
      </div> -->

      <div class="input__field">
        <p class="label">Please enter your contact number</p>

        <q-input ref="contactNoRef" outlined v-model="contact_no" label="Contact Number *" mask="(###) ### - ####"
          fill-mask lazy-rules :rules="contactNoRules" unmasked-value />

      </div>
      <div class="input__field">
        <p class="label">Please enter your whatsapp number</p>

        <q-input ref="whatsappNoRef" outlined v-model="whatsapp_no" label="WhatsApp Number *" mask="(###) ### - ####"
          fill-mask lazy-rules :rules="whatsappNoRules" unmasked-value />
      </div>

      <div class="input__field">
        <p class="label">Please enter your player role</p>

        <q-select ref="playerRoleRef" outlined v-model="player_role" :options="playerRoleData" label="Player Role"
          lazy-rules :rules="playerRoleRules" />
      </div>

      <div class="input__field">
        <p class="label">Please enter your batting style</p>

        <q-select ref="battingStyleRef" outlined v-model="batting_style" :options="battingStyle" label="Batting Style"
          lazy-rules :rules="battingStyleRules" />
      </div>
      <div class="input__field">
        <p class="label">Please enter your bowling style</p>
        <q-select ref="bowlingStyleRef" outlined v-model="bowling_style" :options="bowlingStyle" label="Bowling Style"
          lazy-rules :rules="bowlingStyleRules" />
      </div>
      <div class="input__field">
        <p class="label">Please upload your photo</p>
        <div class="upload-wrap">
          <q-input ref="profileImageRef" v-model="profile_image" @update:model-value="fileSelect" outlined type="file"
            class="upload" lazy-rules :rules="profileImageRules" />
          <p class="upload-text">Click to upload</p>
        </div>
      </div>


      <div style="justify-self: flex-start;">
        <div v-if="imageDataUri && !persistent" style="position: relative">
          <q-img class="thumbnail" :src="imageDataUri" spinner-color="white" style="height: 140px; max-width: 150px"
            :ratio="9 / 10" />
          <q-btn flat class="close--btn">
            <img style="height: 1.3rem; width: 1.3rem" src="~assets/close_icon.svg" class="poster" /></q-btn>
        </div>
      </div>

      <div class="" v-if="persistent">
        <q-dialog class="modal" v-model="persistent" persistent transition-show="scale" transition-hide="scale">
          <q-card class="card">
            <VuePictureCropper :boxStyle="{
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f8f8',
              margin: 'auto',
            }" :img="imageDataUri" :options="{
  viewMode: 1,
  dragMode: 'crop',
  aspectRatio: 9 / 10,
}" @ready="ready" />

            <q-btn class="close--btn" @click="getresult"><span class="tick"></span> </q-btn>
          </q-card>
        </q-dialog>
      </div>

      <div class="action--btn">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </form>
  </div>
</template>

<script>
import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import constants from "src/constants";

export default {
  components: {
    VuePictureCropper,
  },
  setup() {
    const $q = useQuasar();
    const name = ref(null);
    const nameRef = ref(null);
    const location = ref(null);
    const locationRef = ref(null);
    const jersey_no = ref(null);
    const jerseyNoRef = ref(null);
    const jersey_size = ref(null);
    const jerseySizeRef = ref(null);
    const jersey_name = ref(null);
    const profile_link = ref(null);
    const contact_no = ref(null);
    const contactNoRef = ref(null);
    const whatsapp_no = ref(null);
    const whatsappNoRef = ref(null);
    const batting_style = ref(null);
    const battingStyleRef = ref(null);
    const player_role = ref(null);
    const playerRoleRef = ref(null);
    const profile_image = ref(null);
    const profileImageRef = ref(null);
    const imageDataUri = ref(null);
    const bowling_style = ref(null);
    const bowlingStyleRef = ref(null);
    const selectedImageFile = ref(null);
    const persistent = ref(false);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    return {
      playerRoleData: [
        {
          label: "Batsman",
          value: "Batsman",
        },
        {
          label: "Bowler",
          value: "Bowler",
        },
        {
          label: "All Rounder",
          value: "All Rounder",
        },
        {
          label: "Wicket Keeper",
          value: "Wicket Keeper",
        },
      ],
      battingStyle: [
        {
          label: "Right Hand",
          value: "Right Hand",
        },
        {
          label: "Left Hand",
          value: "Left Hand",
        },
      ],
      bowlingStyle: [
        {
          label: "Right Arm fast",
          value: "Right Arm fast",
        },
        {
          label: "Right Arm Medium Fast",
          value: "Right Arm Medium Fast",
        },
        {
          label: "Right Arm Medium",
          value: "Right Arn Medium",
        },
        {
          label: "Right Arn Spin",
          value: "Right Arn Spin",
        },
        {
          label: "Left Arm fast",
          value: "Left Arm fast",
        },
        {
          label: "Left Arm Medium Fast",
          value: "Left Arm Medium Fast",
        },
        {
          label: "Left Arm Medium",
          value: "Left Arn Medium",
        },
        {
          label: "Left Arn Spin",
          value: "Left Arn Spin",
        },
      ],

      name,
      nameRef,
      location,
      locationRef,
      jersey_no,
      jerseyNoRef,
      jersey_size,
      jerseySizeRef,
      jersey_name,
      profile_link,
      contact_no,
      contactNoRef,
      whatsapp_no,
      whatsappNoRef,
      player_role,
      batting_style,
      battingStyleRef,
      playerRoleRef,
      profile_image,
      profileImageRef,
      imageDataUri,
      bowling_style,
      bowlingStyleRef,
      selectedImageFile,
      persistent,

      nameRules: [
        (val) => (val && val.length > 0) || "Please enter your full name",
      ],
      locationRules: [
        (val) => (val && val.length > 0) || "Please enter your location",
      ],
      jerseyNoRules: [
        (val) =>
          (val && val.length > 0) ||
          "Please enter your preffered jersey number",
      ],
      jerseySizeRules: [
        (val) => (val && val.length > 0) || "Please enter your jersey size",
      ],

      contactNoRules: [
        (val) => (val && val.length > 0) || "Please enter your contact number",
      ],

      whatsappNoRules: [
        (val) => (val && val.length > 0) || "Please enter your contact number",
      ],

      playerRoleRules: [(val) => val || "Please select your role"],

      battingStyleRules: [(val) => val || "Please select your batting style"],

      profileImageRules: [
        (val) => (val && val != null) || "Please upload your photo",
      ],

      bowlingStyleRules: [(val) => val || "Please select your bowling style"],

      ready(e) {
        console.log("ready== ", e);
        // console.log(cropper.getFile());
      },

      async getresult() {
        let file = await cropper.getFile();
        selectedImageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          let dataUri = e.target.result;
          imageDataUri.value = dataUri;
          // profile_image.value = blob;
          persistent.value = false;
        };
        reader.readAsDataURL(file);
      },

      fileSelect(files) {
        selectedImageFile.value = "";
        if (files && files[0]) {
          selectedImageFile.value = files[0];
          const reader = new FileReader();
          let dataUri;
          // let blob;
          reader.onload = (e) => {
            dataUri = e.target.result;
            imageDataUri.value = dataUri;
            // profile_image.value = blob;
            persistent.value = true;
          };
          reader.readAsDataURL(files[0]);
        }
      },

      getPresignedUrl() {
        let file = selectedImageFile.value;
        console.log("file== ", file);
        let params = {
          key: contact_no.value + ".jpeg",
          contentType: file.type,
          bucket: "cricket-players",
        };
        axios
          .post(constants.BACKEND_API_URL + "/upload", params)
          .then((response) => {
            console.log("upload url for  Player response== ", response);
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", response.data, true);
            xhr.setRequestHeader("Content-Type", file.type);
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  return "success";
                } else {
                  console.error("Error occurred while uploading file.");
                  return "failed";
                }
              }
            };
            let res = xhr.send(file);
          });
      },

      onSubmit() {
        nameRef.value.validate();
        locationRef.value.validate();
        // jerseyNoRef.value.validate();
        // jerseySizeRef.value.validate();
        contactNoRef.value.validate();
        whatsappNoRef.value.validate();
        playerRoleRef.value.validate();
        battingStyleRef.value.validate();
        profileImageRef.value.validate();
        bowlingStyleRef.value.validate();

        if (
          nameRef.value.hasError ||
          locationRef.value.hasError ||
          // jerseyNoRef.value.hasError ||
          // jerseySizeRef.value.hasError ||
          contactNoRef.value.hasError ||
          whatsappNoRef.value.hasError ||
          playerRoleRef.value.hasError ||
          battingStyleRef.value.hasError ||
          profileImageRef.value.hasError ||
          bowlingStyleRef.value.hasError
        ) {
          // form has error
        } else {
          let params = {
            fullname: name.value,
            location: location.value,
            contact_no: contact_no.value,
            whatsapp_no: whatsapp_no.value,
            jersey_no: jersey_no.value,
            jersey_size: jersey_size.value,
            jersey_name: jersey_name.value,
            profile_image: contact_no.value + ".jpeg",
            player_role: player_role.value.value,
            batting_style: batting_style.value.value,
            bowling_style: bowling_style.value.value,
            profile_link: profile_link.value,
          };
          console.log("params== ", params);

          $q.loading.show({
            message: "Registration under progress. Please wait...",
          });

          this.getPresignedUrl();

          axios
            .post(constants.BACKEND_API_URL + "/players", params)
            .then((response) => {
              console.log("Add Player response== ", response);
              $q.loading.hide();
              $q.notify({
                icon: "done",
                color: "positive",
                message: "Congratulation..Registered Successfully",
              });
              this.onReset();
            })
            .catch((err) => {
              console.log("Error in add player== ", err);
              $q.loading.hide();
              $q.notify({
                icon: "done",
                color: "negative",
                message:
                  "Something wrong happened..Please contact the administrator",
              });
            });
        }
      },

      onReset() {
        name.value = null;
        location.value = null;
        // locationRef.value = null;
        jersey_no.value = null;
        // jerseyNoRef.value = null;
        jersey_size.value = null;
        // jerseySizeRef.value = null;
        jersey_name.value = null;
        profile_link.value = null;
        contact_no.value = null;
        // contactNoRef.value = null;
        whatsapp_no.value = null;
        // whatsappNoRef.value = null;
        player_role.value = null;
        batting_style.value = null;
        // battingStyleRef.value = null;
        // playerRoleRef.value = null;
        profile_image.value = null;
        // profileImageRef.value = null;
        imageDataUri.value = null;
        bowling_style.value = null;
        // bowlingStyleRef.value = null;

        nameRef.value.resetValidation();
        locationRef.value.resetValidation();
        // jerseyNoRef.value.resetValidation();
        // jerseySizeRef.value.resetValidation();
        contactNoRef.value.resetValidation();
        whatsappNoRef.value.resetValidation();
        playerRoleRef.value.resetValidation();
        battingStyleRef.value.resetValidation();
        profileImageRef.value.resetValidation();
        bowlingStyleRef.value.resetValidation();
      },
    };
  },
};
</script>

<style scoped>
.players-reg {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 1rem 2rem;
  max-width: 100rem;
  margin: 0 auto;
  padding: 2rem;
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

.profile-pic {
  /* display: flex; */
  width: 50%;
  padding-left: 20px;
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center center;
}

.label {
  font-size: 1.6rem;
  font-weight: 500;
  color: #121212;
  margin-bottom: 0.5rem;
}

.upload {
  position: absolute;
  /* visibility: hidden; */
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
}

.upload-wrap {
  position: relative;
  height: 5.6rem;
  border: 1px dashed #1976d2;
  border-radius: 8px;
  cursor: pointer;
}

.upload-text {
  color: #1976d2;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.thumbnail {
  width: 15rem;
  height: 15rem;
  border-radius: 8px;
  border: 1px solid #d4d4d4;
  object-fit: cover;
}

.close--btn {
  position: absolute;
  right: 0.5rem;
  top: 1rem;
  background-color: white;
  border-radius: 20rem;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid #d4d4d4;
  padding: 0;
  min-height: 2.6rem;
}

.action--btn {
  justify-self: flex-end;
}

.modal {
  min-width: 25rem;
}

.tick {
  width: 6px;
  height: 12px;
  border-right: 2.3px solid black;
  border-bottom: 2.3px solid black;
  transform: rotate(40deg);
}

@media only screen and (max-width: 60rem) {
  .players-reg {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  }
}
</style>

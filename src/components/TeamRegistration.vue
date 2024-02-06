<template>
  <div class="heading heading--h1">Team Registration</div>
  <div class="team-registration">
    <form
      @submit.prevent.stop="onSubmit"
      @reset.prevent.stop="onReset"
      class="team-registration__forms"
    >
      <div>
        <p class="label">Enter your team name</p>
        <q-input
          ref="teamNameRef"
          outlined
          v-model="teamName"
          label="Team name *"
          lazy-rules="ondemand"
          :rules="nameRules"
          class="input__field"
        />
      </div>

      <div>
        <p class="label">Enter your owner name</p>
        <q-input
          ref="ownerNameRef"
          outlined
          type="text"
          v-model="ownerName"
          label="Owner Name *"
          lazy-rules="ondemand"
          :rules="ownerNameRules"
          class="input__field"
        />
      </div>
      <div>
        <p class="label">Enter your contact number</p>
        <q-input
          ref="contactNoRef"
          outlined
          v-model="contactNo"
          label="Contact Number *"
          mask="(###) ### - ####"
          fill-mask
          lazy-rules="ondemand"
          :rules="contactNoRules"
          unmasked-value
          class="input__field"
        />
      </div>

      <div>
        <p class="label">Upload your team logo</p>
        <div class="upload-wrap">
          <q-input
            ref="teamLogoRef"
            v-model="profile_image"
            @update:model-value="fileSelect"
            outlined
            type="file"
            lazy-rules="ondemand"
            :rules="logoRules"
            class="upload"
          />
          <p class="upload-text">Click to upload</p>
        </div>
      </div>
      <div style="justify-self: flex-start">
        <div v-if="imageDataUri" style="position: relative">
          <q-img class="thumbnail" :src="imageDataUri" spinner-color="white" />
          <q-btn flat class="close--btn">
            <img
              style="height: 1.3rem; width: 1.3rem"
              src="~assets/close_icon.svg"
              class="poster"
          /></q-btn>
        </div>
      </div>
      <div></div>
      <div>
        <q-btn class="button" label="Register" type="submit" color="primary" />
      </div>
    </form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import constants from "src/constants";

export default {
  setup() {
    const $q = useQuasar();
    const teamName = ref(null);
    const teamNameRef = ref(null);
    const ownerName = ref(null);
    const ownerNameRef = ref(null);
    const contactNo = ref(null);
    const contactNoRef = ref(null);
    const teamLogoRef = ref(null);
    const imageDataUri = ref(null);
    const selectedLogo = ref(null);

    return {
      teamName,
      teamNameRef,
      ownerName,
      ownerNameRef,
      contactNo,
      contactNoRef,
      teamLogoRef,
      selectedLogo,
      imageDataUri,

      nameRules: [
        (val) => (val && val.length > 0) || "Please enter your team name",
      ],
      ownerNameRules: [
        (val) => (val && val.length > 0) || "Please enter owner name",
      ],

      contactNoRules: [
        (val) => (val && val.length > 0) || "Please enter your contact number",
      ],

      logoRules: [
        (val) => (val && val != null) || "Please upload your team logo",
      ],

      onSubmit() {
        teamNameRef.value.validate();
        ownerNameRef.value.validate();
        contactNoRef.value.validate();
        teamLogoRef.value.validate();

        if (
          teamNameRef.value.hasError ||
          ownerNameRef.value.hasError ||
          contactNoRef.value.hasError ||
          teamLogoRef.value.hasError
        ) {
          // form has error
        } else {
          let params = {
            team_name: teamName.value,
            owner_name: ownerName.value,
            team_logo: selectedLogo.value.name,
            contact_no: contactNo.value,
          };

          console.log("params== ", params);

          axios
            .post(constants.BACKEND_API_URL + "/teams", params)
            .then((response) => {
              console.log("Add Team response== ", response);
              this.getPresignedUrl();
              $q.loading.hide();
              $q.notify({
                icon: "done",
                color: "positive",
                message: "Congratulation..Team Registered Successfully",
              });
              // this.onReset();
            })
            .catch((err) => {
              console.log("Error in add team== ", err);
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

      fileSelect(files) {
        if (files && files[0]) {
          selectedLogo.value = files[0];
          const reader = new FileReader();
          let dataUri;
          let blob;
          reader.onload = (e) => {
            dataUri = e.target.result;
            imageDataUri.value = dataUri;
          };
          reader.readAsDataURL(files[0]);
        }
      },

      getPresignedUrl() {
        let file = selectedLogo.value;
        console.log("file== ", file);
        let params = {
          key: file.name,
          contentType: file.type,
          bucket: "cricket-team",
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

      onReset() {},
    };
  },
};
</script>

<style scoped>
.team-registration {
  max-width: 100rem;
  margin: 0 auto;
  padding: 2rem;
}
.team-registration__forms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 1rem 2rem;
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
@media only screen and (max-width: 60rem) {
  .team-registration__forms {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  }
}
</style>

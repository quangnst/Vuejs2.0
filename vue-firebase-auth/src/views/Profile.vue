<template>
  <div class="profilePage">
    <v-container class="pt-8">
      {{userProfile}}
      <v-row>
        <v-col>
          <div>
            <p>Upload an image to Firebase:</p>
            <input type="file" @change="previewImage" accept="image/*" />
          </div>
          <div>
            <p>
              Progress: {{ uploadValue.toFixed() + "%" }}
              <progress
                id="progress"
                :value="uploadValue"
                max="100"
              ></progress>
            </p>
          </div>
          <div v-if="imageData != null">
            <img class="preview" :src="picture" />
            <br />
            <button @click="onUpload">Upload</button>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between">
            <div class="flex-grow-1">
              <v-row>
                <v-col class="pt-0">
                  <v-slide-x-transition>
                    <div v-if="avatar && saved == false">
                      <v-btn
                        class="primary"
                        depressed
                        small
                        @click="uploadImage"
                        :loading="saving"
                        >Save Avatar</v-btn
                      >
                    </div>
                  </v-slide-x-transition>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" :md="3">
                  <strong>Full Name</strong>
                </v-col>
                <v-col cols="12" :md="7">
                  <div v-if="modifyProfile == false">{{ userProfile.name}}</div>
                  <div v-else>
                    <v-text-field
                      label="Prenom"
                      solo
                      type="text"
                      name="prenom"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" :md="3">
                  <strong>Date of Birth</strong>
                </v-col>
                <v-col cols="12" :md="7">
                  <div v-if="modifyProfile == false">30/09/1987</div>
                  <div v-else>
                    <v-text-field
                      label="Date de naissance"
                      solo
                      type="text"
                      name="date"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" :md="3">
                  <strong>Telephone</strong>
                </v-col>
                <v-col cols="12" :md="7">
                  <div v-if="modifyProfile == false">0123456789</div>
                  <div v-else>
                    <v-text-field
                      label="0123456789"
                      solo
                      type="text"
                      name="date"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-btn
              text
              color="accent"
              class="text-none"
              @click.stop="toggleModifyProfile"
              >Modifier</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      modifyProfile: false,

      avatar: null,
      saving: false,
      saved: false,

      //
      imageData: null,
      picture: null,
      uploadValue: 0,


    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile
    }
  },
  methods: {
    toggleModifyProfile: function() {
      this.modifyProfile = !this.modifyProfile;
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
        }
      );
    },
  },
};
</script>

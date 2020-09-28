<template>
  <div class="profilePage">
    <v-container class="pt-8">
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
      <edit-profile :userProfile= user />
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import EditProfile from '@/components/user/EditProfile';

export default {
  name: "Profile",
  components: {
    EditProfile
  },
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0

    };
  },
  computed: {
    user() {
      return this.$store.state.userProfile
    }
  },
  methods: {
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
    }
  },
};
</script>

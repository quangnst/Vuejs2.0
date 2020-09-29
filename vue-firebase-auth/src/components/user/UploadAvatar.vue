<template>
  <v-row>
    <v-col>
      <div>
        <input
          type="file"
          style="display:none"
          @change="onUpload"
          ref="inputRef"
          accept="image/*"
        />
      </div>
      <div @click="$refs.inputRef.click()">
        <v-avatar size="120" v-if="picture != ''">
          <img :src="$store.state.userProfile.avatar" />
        </v-avatar>
        <v-avatar v-else size="60">
          <v-icon size="120">mdi-account-circle</v-icon>
        </v-avatar>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
export default {
  name: "UploadAvatar",
  props: ["userProfile"],
  components: {},
  data() {
    return {
      imageData: null,
      picture: this.$store.state.userProfile.avatar
    };
  },
  computed: {
   
  },
  methods: {
    onUpload(event) {
      this.imageData = event.target.files[0];
      const storageRef = firebase
        .storage()
        .ref(`avatarUsers/avatar_${this.$store.state.userId}`)
        .put(this.imageData);
      storageRef.on(`state_changed`, () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url;
          this.$store.dispatch("updateProfileAvatar", this.picture)
          console.log(this.picture);
        });
      });
    },
  },
  watch: {
  
  }
};
</script>

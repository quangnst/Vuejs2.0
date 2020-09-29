<template>
  <div class="profilePage">
    <v-container class="pa-8">
      <upload-avatar :userProfile="user" />
      <edit-profile :userProfile="user" />
    </v-container>
  </div>
</template>

<script>
import UploadAvatar from "@/components/user/UploadAvatar";
import EditProfile from "@/components/user/EditProfile";

export default {
  name: "Profile",
  components: {
    EditProfile,
    UploadAvatar
  },
  data() {
    return {
    };
  },
  computed: {
    user() {
      return this.$store.state.userProfile;
    },
  },
  methods: {
  },
  watch: {
  }
};
</script>

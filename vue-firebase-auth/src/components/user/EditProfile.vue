<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex justify-space-between">
        <div class="flex-grow-1">
          <v-row>
            <v-col cols="12" :md="3">
              <strong>Full Name</strong>
            </v-col>
            <v-col cols="12" :md="7">
              <div v-if="modifyProfile == false">{{ userProfile.name }}</div>
              <div v-else>
                <v-text-field
                  label="Name"
                  solo
                  type="text"
                  name="name"
                  hide-details="auto"
                  v-model="userProfile.name"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :md="3">
              <strong>Location</strong>
            </v-col>
            <v-col cols="12" :md="7">
              <div v-if="modifyProfile == false">
                {{ userProfile.location }}
              </div>
              <div v-else>
                <v-text-field
                  label="Location"
                  solo
                  type="text"
                  name="location"
                  hide-details="auto"
                  v-model="userProfile.location"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :md="3">
              <strong>Telephone</strong>
            </v-col>
            <v-col cols="12" :md="7">
              <div v-if="modifyProfile == false">{{ userProfile.phone }}</div>
              <div v-else>
                <v-text-field
                  label="0123456789"
                  solo
                  type="text"
                  name="phone"
                  hide-details="auto"
                  v-model="userProfile.phone"
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
          v-if="this.modifyProfile == false"
          >Modifier</v-btn
        >
        <v-btn text color="accent" class="text-none" v-else @click.stop="updateProfile"
          >Save</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "EditProfile",
  props: ["userProfile"],
  components: {},
  data() {
    return {
      modifyProfile: false,
      saving: false,
    };
  },
  computed: {},
  methods: {
    toggleModifyProfile: function() {
      this.modifyProfile = !this.modifyProfile;
    },
    updateProfile() {
      const userUpdate = {
        name: this.userProfile.name,
        location: this.userProfile.location,
        phone: this.userProfile.telephone ? this.userProfile.telephone : "",
      };
      this.$store.dispatch("updateProfile", userUpdate);
      this.modifyProfile = false;
    },
  },
};
</script>

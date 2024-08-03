<template>
  <router-view></router-view>
</template>


<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
let userCountry = ref('')
const getUserLocation = async () => {
  try {

    const storedLocation = localStorage.getItem('userCountryOpenPerplex')

    if (storedLocation) {
      userCountry.value = storedLocation
      return
    }

    const response = await axios.get('https://api.ipify.org?format=json')
    const ip = response.data.ip
    const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`)
    userCountry.value = geoResponse.data.country_code

    localStorage.setItem('userCountryOpenPerplex', userCountry.value)
  } catch (error) {
    console.error('Error fetching user location:', error)
  }
}

onMounted(() => {
  getUserLocation()
});

</script>
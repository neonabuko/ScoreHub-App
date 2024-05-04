<template>
    <div class="landing-page">
      <HeroSection />
      <FeatureSection />
      <CallToAction />
      <FooterSection />
    </div>
  </template>
  
  <script setup>
  import HeroSection from '../components/home/HeroSection.vue';
  import FeatureSection from '../components/home/FeatureSection.vue';
  import CallToAction from '../components/home/CallToAction.vue';
  import FooterSection from '../components/home/FooterSection.vue'
  </script>
  
  <style scoped>
  .landing-page {
    text-align: center;
  }
  </style>
  
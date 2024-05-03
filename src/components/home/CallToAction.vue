<template>
    <div class="cta">
      <h2>Ready to Start Your Musical Journey?</h2>
      <p>Join ScoreHub today and unlock the full potential of music collaboration.</p>
      <button @click="navigateToSignUp">Join Now</button>
    </div>
  </template>
  
  <script setup>
  const navigateToSignUp = () => {
    
  };
  </script>
  
  <style scoped>
  .cta {
    padding: 50px;
  }
  .cta h2 {
    font-size: 2rem;
  }
  .cta button {
    font-size: 1rem;
    background: white;
    color: #2d2d2d;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .cta button:hover {
    background: #ecf0f1;
  }
  </style>
  
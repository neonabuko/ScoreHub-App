<template>
    <div class="upload-cloud-button-div">
        <router-link :to="route" class="btn upload-cloud-button">
            <i class="fas fa-cloud-upload"></i>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        route: {
            type: String,
            required: true,
        },
    },
};
</script>

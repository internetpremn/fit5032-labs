<template>
    <pre> {{ jsondata }}</pre>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            jsondata: null,
            error: null,
        };
    },
    mounted() {
        this.getBookNameAPI();
    },
    methods: {
        async getBookNameAPI() {
            try {
            const response = await axios.get('https://booknames-mg4yxnf5gq-uc.a.run.app')
            this.jsondata = response.data;
            this.error = null;
            } catch (error) {
            console.error ('Error fetching books:', error);
            this.error = error;
            this.count = null;
            }
        },
    },
};

</script>

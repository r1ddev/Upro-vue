<template>
	<div class="container">
        <div class="shadow mt-4">
            <Reviews :masterId="1"/>
        </div>
		
	</div>
</template>

<script>
import Reviews from "../components/master/Reviews";

export default {
    name: 'masterReviews',
	components: {
		Reviews,
	},
};
</script>

<style></style>

<script lang="ts">
    export let bgColor: string;
</script>

<section style="background-color: {bgColor}">
    <slot />
</section>

<style>
    section {
        width: 100%;
        padding: 12px 36px;
    }
</style>

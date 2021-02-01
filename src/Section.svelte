<script lang="ts">
    export let flexGrow: string = "initial";
    export let bgColor: string = "initial";
</script>

<section style="flex-grow: {flexGrow}; background-color: {bgColor}">
    <slot />
</section>

<style>
    section {
        padding: 12px 36px;
        text-align: center;
    }
</style>

<script lang="ts">
    export let bgColor: string;
    export let height: string;
</script>

<section
    style="height: {height ? height : 'unset'}; background-color: {bgColor}"
>
    <slot />
</section>

<style>
    section {
        padding: 12px 36px;
        text-align: center;
    }
</style>

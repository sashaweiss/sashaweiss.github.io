<script lang="ts">
</script>

<div class="vstack">
    <slot />
</div>

<style>
    .vstack {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }
</style>

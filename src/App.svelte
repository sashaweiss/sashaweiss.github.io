<script lang="ts">
    import Section from "./Section.svelte";
    import Headline from "./Headline.svelte";
    import About from "./About.svelte";
    import Footer from "./Footer.svelte";
</script>

<main>
    <Section height="25%" bgColor="lightgreen">
        <Headline />
    </Section>
    <Section bgColor="lightblue">
        <About />
    </Section>
    <Section bgColor="magenta">
        <Footer />
    </Section>
</main>

<style>
</style>

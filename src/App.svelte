<script lang="ts">
    import Section from "./Section.svelte";
    import Headline from "./Headline.svelte";
    import About from "./About.svelte";
    import Footer from "./Footer.svelte";
    import VStack from "./VStack.svelte";
</script>

<main>
    <VStack>
        <Section bgColor="lightgreen">
            <Headline />
        </Section>
        <Section flexGrow="1" bgColor="lightblue">
            <About />
        </Section>
        <Section bgColor="magenta">
            <Footer />
        </Section>
    </VStack>
</main>

<style>
</style>

<script>
  import Hero from "$lib/components/Hero.svelte";
  import About from "$lib/components/About.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Rating from "$lib/components/Rating.svelte";
  export let data;
  let { supabase, session, workingHours } = data;
  $: ({ supabase, session, workingHours } = data);
</script>

<Hero />
<About />
<Rating {supabase} />
<Contact {session} {workingHours} />

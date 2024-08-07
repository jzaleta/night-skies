<script>
  import "@fontsource/averia-serif-libre";
  import "../app.css";

  export let title = "Night Skies ✨";
  export let name = "Javier Zaleta";
  export let description =
    "Starry-sprinkled night skies with shooting stars and lofi beats";
  export let image = "https://github.com/jzaleta.png/";

  $: fullTitle = `${name} | ${title}`;
</script>

<svelte:head>
  <!-- Basic Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="description" content={description} />

  <!-- Open Graph Meta Tags -->
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={title} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://night-skies.vercel.app/" />
  <meta property="og:image" content={image} />

  <!-- X/Twitter Meta Tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Favicon Meta Tags -->
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
</svelte:head>

<slot />

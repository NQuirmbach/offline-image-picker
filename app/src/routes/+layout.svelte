<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';

	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();
	let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
	{@html webManifest}
	<title>Offline Image Picker</title>
</svelte:head>

{@render children?.()}

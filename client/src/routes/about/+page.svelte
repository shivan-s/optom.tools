<script lang="ts">
  import { getAbout } from '$lib/api';
	import { createQuery } from '@tanstack/svelte-query';
	import Loading from '../../components/Loading.svelte';
	import Error from '../../components/Error.svelte';
	import { formatDistanceToNow } from 'date-fns';
	import { marked } from 'marked';
	import * as DOMPurify from 'dompurify';

	$: query = createQuery({
		queryKey: ['about'],
		queryFn: getAbout
	});

	$: about = $query.data?.about;
	$: isLoading = $query.isLoading;
	$: isSuccess = $query.isSuccess;
	$: isError = $query.isError;
	$: error = $query.error;

	let content: string;

	if (isError) {
		console.error(error);
	}

	$: {
		if (isSuccess && about) {
			const main = about.about.data.attributes.Main;
			content = marked.parse(main);
			/* const dirty = marked.parse(main); */
			/* content = DOMPurify.sanitize(dirty); */
		}
	}
</script>

<h1 class="text-center">About</h1>

{#if isError}
	<Error />
{/if}

{#if isLoading}
	<Loading />
{/if}

{#if isSuccess && about}
	<div>
		{@html content}
	</div>
	<hr />
	<p class="text-sm text-right">
		Updated {formatDistanceToNow(
			new Date(about.about.data.attributes.updatedAt),
			{
				addSuffix: true
			}
		)}
	</p>
{/if}

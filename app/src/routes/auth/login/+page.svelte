<script lang="ts">
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';

	let username = $state('');
	let password = $state('');

	async function handleLogin(e) {
		console.log(e);
	}
</script>

<div class="flex h-screen items-center justify-center">
	<div class="w-1/4 rounded-md bg-white p-4 drop-shadow-md md:w-1/2">
		<h1>Login</h1>

		<form onsubmit={handleLogin}>
			<Textfield bind:value={username} label="Username" required />
			<Textfield bind:value={password} label="Password" type="password" required />

			<Button>Login</Button>
		</form>
	</div>
</div>

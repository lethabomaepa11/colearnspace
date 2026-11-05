<script lang="ts">
	import { onMount } from 'svelte';
	import { Download, WifiOff, RefreshCw, X } from '@lucide/svelte';
	type InstallEvent = Event & {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: string }>;
	};
	let promptEvent = $state<InstallEvent | null>(null);
	let offline = $state(false);
	let installed = $state(false);
	let help = $state(false);
	let waiting = $state<ServiceWorker | null>(null);
	let dismissed = $state(false);
	onMount(() => {
		offline = !navigator.onLine;
		installed = window.matchMedia('(display-mode: standalone)').matches;
		const install = (event: Event) => {
			event.preventDefault();
			promptEvent = event as InstallEvent;
		};
		const online = () => (offline = false);
		const gone = () => (offline = true);
		const done = () => {
			installed = true;
			promptEvent = null;
		};
		window.addEventListener('beforeinstallprompt', install);
		window.addEventListener('online', online);
		window.addEventListener('offline', gone);
		window.addEventListener('appinstalled', done);
		navigator.serviceWorker?.getRegistration().then((reg) => {
			if (!reg) return;
			waiting = reg.waiting;
			reg.addEventListener('updatefound', () => {
				const worker = reg.installing;
				worker?.addEventListener('statechange', () => {
					if (worker.state === 'installed' && navigator.serviceWorker.controller) waiting = worker;
				});
			});
		});
		return () => {
			window.removeEventListener('beforeinstallprompt', install);
			window.removeEventListener('online', online);
			window.removeEventListener('offline', gone);
			window.removeEventListener('appinstalled', done);
		};
	});
	async function install() {
		if (promptEvent) {
			await promptEvent.prompt();
			await promptEvent.userChoice;
			promptEvent = null;
		} else help = !help;
	}
	function update() {
		waiting?.postMessage({ type: 'SKIP_WAITING' });
		setTimeout(() => location.reload(), 500);
	}
</script>

{#if offline}<div class="offline-banner" role="status">
		<WifiOff size={16} />You’re offline. Opened public pages are readable; connect to save progress
		or share work.
	</div>{/if}{#if waiting}<div class="pwa-update" role="status">
		<span>A fresh version is ready. Finish any unsaved writing first.</span><button onclick={update}
			><RefreshCw size={14} />Update</button
		>
	</div>{/if}{#if !installed && !dismissed}<div class="install-widget">
		<button class="install-button" onclick={install}
			><Download size={15} />Install CoLearnSpace</button
		><button
			class="install-dismiss"
			aria-label="Dismiss install suggestion"
			onclick={() => (dismissed = true)}><X size={13} /></button
		>{#if help}<div class="install-help">
				<strong>Make room for a little progress.</strong>
				<p>On iPhone or iPad: open in Safari, tap Share, then Add to Home Screen.</p>
				<p>
					On Android or desktop: open the browser menu and choose Install app or Add to Home screen
					when available.
				</p>
				<p>
					Previously opened public pages work offline. Videos and account actions need internet.
				</p>
			</div>{/if}
	</div>{/if}

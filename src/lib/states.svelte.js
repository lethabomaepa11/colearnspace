import { supabase } from "./supabaseClient";

/**
 * These are the shared logic across the app
 */
export let theme = $state({
    darkTheme: false,
    toggleTheme: () => {
		theme.darkTheme = !theme.darkTheme;
		localStorage.setItem('darkTheme', theme.darkTheme);
	}
});

/*This is for the search bar on Mobile */
export let courseSearch = $state({
	text: '',
	mobileSearch: false,
	history: [],
	toggleMobileSearch: () => {
		courseSearch.mobileSearch = !courseSearch.mobileSearch;
	}
});

/*This is for the desktop sidebar, toggle minimizes the sidebar */
export let sideBar = $state({
	open: true,
	toggle: (pathname) => {
		if(!pathname.includes('/courses')) return;//only toggle the sidebar if it is visible, its in the layout of /courses/...
		sideBar.open = !sideBar.open;
		localStorage.setItem('sbstate', sideBar.open);
	}
});	

/**This is for github auth */
export let githubAuth = $state({
	default:async() => {
		await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: 'https://colearnspace.netlify.app/me'
		  }
		});
		return;
}
})


export let currentUser = $state({
	user: {isLoggedIn: false},
});

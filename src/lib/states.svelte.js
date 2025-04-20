
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
	toggle: () => {
		sideBar.open = !sideBar.open;
		localStorage.setItem('sbstate', sideBar.open);
	}
});	


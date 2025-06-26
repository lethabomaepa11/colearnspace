import { goto } from "$app/navigation";
import { supabase } from "./supabaseClient";

/**
 * These are the shared logic across the app
 */


//The app state, loading states and all
export let appState = $state({
	isMVP: true,
	version: "0.0.2",
	appTitle: "logo",//the app header title, if not set, the default is the logo
	setAppTitle: function(title){this.appTitle = title},//sets the app title in mobile
	isMobile: false,
	loadingStates: {
		//loading states, to avoid adding the loading state to every page
		root: false,//root layout
		portal: false,//portal layout
		dashboard: false//dashboard layout
	}
})



export let theme = $state({
	//the app initial theme state is light
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
	docsSideBar: false,//sidebar for the docs on mobile
	dashboardSideBar: false,//sidebar for the dashboard on mobile
	toggle: (pathname) => {
		//the sidebar on desktop in the /portal routes can be expanded
		if(pathname.includes('/portal') && !appState.isMobile){
			sideBar.open = !sideBar.open;
			localStorage.setItem('sbstate', sideBar.open);
			return;
		}
		//sidebar on mobile can be in selected pages, currently docs and dashboard
		if(pathname.includes('/docs') && appState.isMobile) {
			sideBar.docsSideBar = !sideBar.docsSideBar;
			return;
		}
		if(pathname.includes('/dashboard') && appState.isMobile) {
			sideBar.dashboardSideBar = !sideBar.dashboardSideBar;
			return;
		}
		return;
	}
});	



export let course = $state({

	publish : async(user) => {
		if(!user){
			//ghost will make the course
			const {data: ghostUser, error} = await supabase.from("user").select("id").eq("username", "ghost").limit(1);
			user = ghostUser[0];
		}
		//Make use of the api in the future, refactor this code.
		let localCourse = JSON.parse(localStorage.getItem('course'));
		let localModules = JSON.parse(localStorage.getItem('modules'));
		
		//upload course
		const { data: courses, error: courseError } = await supabase.from('course').insert({
			title: localCourse.title,
			category: localCourse.category,
			description: localCourse.description,
			user_id: user.id,
			slug: localCourse.slug,
			order: localCourse.order
		}).select();
		// all modules of that course
		if(!courseError && courses.length > 0) {
			localModules.forEach(async(mod) => {
				const { data: modules, error: moduleError } = await supabase.from('module').insert({
					title: mod.title,
					description: mod.description,
					course_id: courses[0].id,
					slug: mod.slug
				}).select()

				if(!moduleError && modules.length > 0) {
					mod.module_videos?.forEach(async(video) => {
						 await supabase.from('module_videos').insert({
							title: video.title,
							module_id: modules[0].id,
							id: video.id,
						})
					})
					localStorage.removeItem('course')
					localStorage.removeItem('modules')
					goto(`/portal/courses/${courses[0].slug}`)
			
		}
		})
		}
	},
	removeFromLocalStorage: () => {
		localStorage.removeItem('course');
		localStorage.removeItem('modules');
		goto('/portal/courses/create');
	},

	})

export let session = $state({
	user: {isLoggedIn: false},
});

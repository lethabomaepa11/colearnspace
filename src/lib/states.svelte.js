import { goto } from "$app/navigation";
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
		if(!pathname.includes('/portal')) return;//only toggle the sidebar if it is visible, its in the layout of /portal/...
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
			redirectTo: 'https://colearnspace.netlify.app/dashboard'
		  }
		});
		return;
}
})

export let course = $state({

	publish : async(user) => {
		let localCourse = JSON.parse(localStorage.getItem('course'));
		let localModules = JSON.parse(localStorage.getItem('modules'));
		
		//upload course
		const { data: courses, error: courseError } = await supabase.from('course').insert({
			title: localCourse.title,
			category: localCourse.category,
			description: localCourse.description,
			user_id: user.id,
			slug: localCourse.slug
		}).select();
		// all modules of that course
		if(!courseError && courses.length > 0) {
			console.log(localModules)
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

export let currentUser = $state({
	user: {isLoggedIn: false},
});

<script>
	import { page } from '$app/state';
	import BackButtonHeader from '$lib/components/BackButtonHeader.svelte';
	import TrixDisplay from '$lib/components/TrixDisplay.svelte';
	import { ArrowLeft } from '@lucide/svelte';

	const demoContent = `
  <h1>🚀 Dev Challenge: Build a Weather App</h1>

  <p>Welcome to this week’s dev challenge! This time, your task is to build a fully functional <strong>Weather App</strong> using any stack of your choice. You’ll fetch real-time weather data and display it in a clean and user-friendly interface.</p>

  <h2>📅 Duration</h2>
  <ul>
    <li><strong>Start Date:</strong> Monday, June 3, 2025</li>
    <li><strong>End Date:</strong> Sunday, June 9, 2025</li>
  </ul>

  <h2>🧠 Requirements</h2>
  <ol>
    <li>Use a public weather API (e.g., OpenWeatherMap, WeatherAPI)</li>
    <li>Display current temperature, conditions, and location</li>
    <li>Include a search feature for users to look up weather by city</li>
    <li>Optional: Show 5-day forecast or themed UI (dark/light mode)</li>
  </ol>

  <h2>💻 Tech Stack</h2>
  <p>You may use any technology: <em>React, Vue, Svelte, HTML/CSS/JS, or even Python</em>. Be creative!</p>

  <h2>🏆 Prizes</h2>
  <p>The top 3 submissions will receive the following:</p>
  <ul>
    <li>1st Place: R500 cash + Spotlight in our community newsletter</li>
    <li>2nd Place: R300 cash</li>
    <li>3rd Place: R200 airtime/voucher</li>
  </ul>

  <h2>✅ How to Submit</h2>
  <p>Fork this repo (link provided in our Discord), build your app, and submit a link to your GitHub repo via the <a href="https://example.com/submit">submission form</a>.</p>

  <h2>🙌 Good Luck!</h2>
  <p>We can’t wait to see what you come up with. Remember, it’s not just about winning — it’s about learning and building something awesome. Happy coding!</p>
`;
</script>

<TrixDisplay content={demoContent} />

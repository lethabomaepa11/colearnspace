<script>
import Seo from '$lib/components/SEO.svelte';

</script>
<Seo title="Project Docs | ColearnSpace" desc="Explore Project Documentation on ColearnSpace" />

# 🔐 Projects API – Authenticated Access

The Projects API allows you to fetch your own project data from the platform using a secure API key. This is ideal for developers who want to integrate their projects into personal portfolios or other external applications.

---

## 🚀 Getting Started

To use the authenticated endpoint, you need to:

1. **Generate an API key**
2. **Make requests to the API with your key in the Authorization header**

---

## 🧾 Generate Your API Key

You can generate an API key from your user [dashboard](/dashboard)

---

## 📡 Fetch Your Projects

```
GET /api/projects
```

### 🔐 Authorization Header

```http
Authorization: Bearer YOUR_API_KEY
```

---

## 🧩 Query Parameters

| Name     | Type   | Description                                       |
| -------- | ------ | ------------------------------------------------- |
| `limit`  | number | How many projects to fetch. Optional.             |
| `offset` | number | Offset for pagination. Optional, defaults to `0`. |
| `cache`  | string | Can be `none` or `private`. Defaults to `none`.   |

---

## 🧪 Example Request

```bash
curl https://colearnspace.netlify.app/api/projects?limit=10&cache=private \
  -H "Authorization: Bearer sk_live_91bff1f8-5ad7-42ab-85f9-abc12345def6"
```

---

## 🛡️ Caching Behavior

You control the caching behavior using the `cache` query param:

| Value     | Effect                                                          |
| --------- | --------------------------------------------------------------- |
| `none`    | `Cache-Control: no-store` — no caching                          |
| `private` | `Cache-Control: private, max-age=60` — browser-only 1 min cache |

> You **cannot** use public CDN caching for authenticated data.

---

## ✅ Response Example

```json
{
	"data": [
		{
			"id": "84e2dbb3-7124-44d5-a7b1-2145df2cebb4",
			"title": "AI-powered Budget Planner",
			"image": "https://colearnspace.netlify.app/projects/ai-budget.jpg",
			"links": [
				{
					"name": "GitHub",
					"url": "https://github.com/lethabomaepa11/budget-planner"
				},
				{
					"name": "Live Demo",
					"url": "https://budget-ai.netlify.app"
				}
			],
			"technologies": ["SvelteKit", "Supabase", "TailwindCSS", "OpenAI API"],
			"description": "A smart tool that helps users manage grocery budgets using AI to generate realistic shopping lists with average pricing.",
			"created_at": "2025-06-22T18:30:00.000Z",
			"rank": 12,
			"score": 98
		},
		{
			"id": "a029c5cd-1b3a-4d95-9d3a-d728e930b3a9",
			"title": "Campus RideShare App",
			"image": "https://colearnspace.netlify.app/projects/rideshare.jpg",
			"links": [
				{
					"name": "GitHub",
					"url": "https://github.com/lethabomaepa11/campus-rideshare"
				},
				{
					"name": "Live Demo",
					"url": "https://campus-taxi.netlify.app"
				}
			],
			"technologies": ["React Native", "Expo", "Leaflet.js", "Supabase"],
			"description": "An Uber-like app for public transport focused on campus routes with real-time taxi tracking and commuter security.",
			"created_at": "2025-06-15T10:00:00.000Z",
			"rank": 4,
			"score": 91
		}
	]
}
```

## 🔍 Fetch a Single Project by ID

```
GET /api/projects?id=PROJECT_ID
```

### 🔐 Authorization Header

```http
Authorization: Bearer YOUR_API_KEY
```

### 🧩 Query Parameters

| Name    | Type   | Description                    |
| ------- | ------ | ------------------------------ |
| `id`    | string | The unique ID of the project.  |
| `cache` | string | `none` or `private`. Optional. |

---

### ✅ Response Example (Single Project)

```json
{
	"data": [
		{
			"id": "84e2dbb3-7124-44d5-a7b1-2145df2cebb4",
			"title": "AI-powered Budget Planner",
			"image": "https://colearnspace.netlify.app/projects/ai-budget.jpg",
			"links": [
				{
					"name": "GitHub",
					"url": "https://github.com/lethabomaepa11/budget-planner"
				},
				{
					"name": "Live Demo",
					"url": "https://budget-ai.netlify.app"
				}
			],
			"technologies": ["SvelteKit", "Supabase", "TailwindCSS", "OpenAI API"],
			"description": "A smart tool that helps users manage grocery budgets using AI to generate realistic shopping lists with average pricing.",
			"content": "<div><p>This is raw HTML from Trix editor...</p></div>",
			"created_at": "2025-06-22T18:30:00.000Z",
			"rank": 12,
			"score": 98
		}
	]
}
```

---

## 🚫 Error Responses

| Status | Message             | When it Happens       |
| ------ | ------------------- | --------------------- |
| 401    | Unauthorized Access | No or invalid API key |
| 429    | Rate limit exceeded | Too many requests     |

---

## 💡 Use Cases

- Auto-display your latest projects on your personal website
- Showcase work on a blog without hardcoding JSON
- Sync your project list between apps

---

## 🧠 Notes

- API keys are **tied to your user ID**, and only return **your projects**
- Public data access (`is_public=true`) uses a different flow with caching
- All responses are JSON
- Do **not share** your API key in public repositories

---

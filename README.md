# Sweet Bake Book – Personal Dessert & Baking Recipe Manager

## 1. Project Overview
**Sweet Bake Book** is a cross-platform mobile application designed for home bakers and dessert lovers to organize, track, and manage their favorite baking recipes. The application works both online and offline, synchronizing data with a backend server, and utilizes native device features (camera, sensors) as well as external services (maps, email).

---

## 2. Core Entity: `Recipe`
The primary item managed by the application satisfies the required multi-type property specification:

| Property | Data Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `name` | **String** | Name of the dessert or cake | `"Grandma's Apple Pie"` |
| `bakingTimeMinutes` | **Numeric** | Preparation and baking time in minutes | `45` |
| `lastPreparedDate` | **Date** | Date when the dessert was last baked | `2024-10-21` |
| `isSuccess` | **Boolean** | Whether the recipe was tested and successful | `true` |
| `ingredients` | **String** | List of required ingredients for shopping | `"3 apples, 200g flour, 100g sugar, 2 eggs"` |

---

## 3. Application Features Mapped to Course Requirements

### 3.1. User Interface (Master-Detail)
* **Master View:** Displays the list of saved dessert recipes with key details (baking time, status).
* **Detail View:** Form for viewing, adding, and editing recipe properties.
* **Animations:** Visual feedback when adding, updating, or deleting recipes from the list.

### 3.2. Data Management & Connectivity
* **REST API:** CRUD operations (create, read, update, delete) connected to a Node.js backend.
* **WebSockets:** Real-time synchronization (notifies all connected clients when a recipe is added or modified).
* **Authentication:** User login with JSON Web Tokens (JWT) and client-side protected routes.
* **Offline Support & Synchronization:** Recipes are saved locally on the device (IndexedDB / Preferences) so the app works without an internet connection, and changes sync automatically when back online.

### 3.3. Device Features (Local Services)
* **Camera:** Take a photo of the finished dessert directly from the oven to save with the recipe.
* **Motion Sensor (Accelerometer):** *Shake to Pick* — shaking the phone randomly selects a recipe to bake when you can't decide.

### 3.4. External Services
* **Email:** Send the recipe's ingredient list via email to use as a grocery shopping list.
* **Google Maps:** Open Google Maps to find nearby grocery stores or supermarket locations to buy ingredients.

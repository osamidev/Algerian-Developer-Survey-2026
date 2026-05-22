export async function fetchSession() {
  // Pull the token from localStorage
  const token = localStorage.getItem("survey_session");

  // If there is no token locally, don't waste an API call
  if (!token) throw new Error("No session stored locally");

  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
  const response = await fetch(`${baseUrl}/auth/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token inside the modern Bearer authorization format
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }

  const data = await response.json();

  // Return the session object payload to populate the 'user' context state
  return data.session;
}

export const logoutUser = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
  await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include", // Essential: tells fetch to send back the cookie to be deleted
  });
};

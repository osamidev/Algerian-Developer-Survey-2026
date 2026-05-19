export const fetchSession = async () => {
  try {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
    const response = await fetch(`${baseUrl}/auth/session`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Not authenticated!");

    const data = await response.json();

    return data.session;
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
  await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include", // Essential: tells fetch to send back the cookie to be deleted
  });
};

async function getGitHubProfile() {
  const username = document.getElementById('username').value.trim();
  const profile = document.getElementById('profile');
  
  if (!username) {
    profile.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  profile.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      throw new Error("User not found");
    }
    
    const data = await res.json();

    profile.innerHTML = `
      <img src="${data.avatar_url}" alt="Profile Picture" />
      <h2>${data.name || data.login}</h2>
      <p><strong>Username:</strong> ${data.login}</p>
      <p><strong>Bio:</strong> ${data.bio || "N/A"}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <p><a href="${data.html_url}" target="_blank" style="color:#58a6ff">View Profile on GitHub</a></p>
    `;
  } catch (error) {
    profile.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

async function searchMembers() {
  const keyword = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  try {
    const response = await fetch("members.json");
    const members = await response.json();

    const filtered = members.filter(m =>
      m.name.includes(keyword) || m.field.includes(keyword)
    );

    if (filtered.length === 0) {
      resultsDiv.innerHTML = "<p>該当する所属者が見つかりませんでした。</p>";
    } else {
      filtered.forEach(m => {
        const card = document.createElement("div");
        card.className = "member-card";

        card.innerHTML = `
          <img src="${m.image}" alt="${m.name}の画像" class="profile-img">
          <div class="card-content">
            <h2><a href="${m.page}">${m.name}</a></h2>
            <p><strong>得意分野:</strong> ${m.field}</p>
            <p>${m.bio}</p>
          </div>
        `;
        resultsDiv.appendChild(card);
      });
    }
  } catch (error) {
    resultsDiv.innerHTML = "<p>データの読み込みに失敗しました。</p>";
    console.error(error);
  }
}

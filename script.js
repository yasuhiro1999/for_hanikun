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

        // JSONに追加したpageをリンク先に使う
        card.innerHTML = `
          <h2><a href="${m.page}">${m.name}</a></h2>
          <p>得意分野: ${m.field}</p>
        `;
        resultsDiv.appendChild(card);
      });
    }
  } catch (error) {
    resultsDiv.innerHTML = "<p>データの読み込みに失敗しました。</p>";
    console.error(error);
  }
}


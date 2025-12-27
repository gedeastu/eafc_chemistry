document.getElementById("runBtn").addEventListener("click", async () => {
  const formation = document.getElementById("formation").value;
  const rawCount = Number(document.getElementById("countPlayer").value);

 if (!formation) {
    alert("Formasi tidak valid");
    return;
  }

  if (isNaN(rawCount) || rawCount < 5) {
    alert("Minimal jumlah kandidat per posisi adalah 5");
    return;
  }

  const res = await fetch("http://localhost:3000/api/optimize-squad", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formation,
      jumlahPemainPerPosisi:rawCount,
    })
  });

  const data = await res.json();
  console.log(data);

  const root = document.getElementById("output");
  root.innerHTML = "";

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent =
    `Iterative: ${data.runtime.iterativeMs}ms `+
    `| Recursive: ${data.runtime.recursiveMs}ms `+
    `| Formasi: ${data.formation} ` +
    `| Jumlah kandidat per posisi: ${rawCount}`;
  root.appendChild(meta);

  root.appendChild(
    renderPreselectTable(data.preselectPlayers)
  );

  root.appendChild(
    renderResultTable("Iterative Result", data.iterativeResult)
  );

  root.appendChild(
    renderResultTable("Recursive Result", data.recursiveResult)
  );
});

export function renderPreselectTable(preselectData) {
  const wrapper = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = `Preselect Players (Total: ${preselectData.total})`;
  wrapper.appendChild(title);

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  preselectData.table.columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  preselectData.table.rows.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);

  return wrapper;
}

export function renderResultTable(titleText, resultData) {
  const wrapper = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = `${titleText} (Chemistry: ${resultData.chemistry})`;
  wrapper.appendChild(title);

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  resultData.table.columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  resultData.table.rows.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);

  return wrapper;
}


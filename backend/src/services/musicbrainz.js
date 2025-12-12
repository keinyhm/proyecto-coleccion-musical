export async function buscarRelease(artista, titulo) {
  const q = encodeURIComponent(`artist:${artista} AND release:${titulo}`);
  const url = `https://musicbrainz.org/ws/2/release/?query=${q}&fmt=json&limit=1`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "coleccion-musical/1.0 ( contacto: keiny@example.com )",
    },
  });

  if (!res.ok) throw new Error("Error buscando release");
  const data = await res.json();
  return data.releases?.[0] || null;
}

export async function detalleRelease(releaseId) {
  const url = `https://musicbrainz.org/ws/2/release/${releaseId}?inc=recordings+labels+tags&fmt=json`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "coleccion-musical/1.0 ( contacto: keiny@example.com )",
    },
  });

  if (!res.ok) throw new Error("Error trayendo detalle release");
  return res.json();
}

export async function portadaRelease(releaseId) {
  const url = `https://coverartarchive.org/release/${releaseId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.images?.[0]?.image || null;
}

export async function getJourneys() {
  const res = await fetch('/journeys');
  if (!res.ok) {
    throw new Error("Erro ao buscar jornadas");
  }
  return res.json();
}

const colors: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E1306C",
  google: "#DB4437",
  whatsapp: "#25D366",
  linkedin: "#0A66C2",
  email: "#FFB703",
  organic: "#0CA678",
  direct: "#6B7280",
  sitebotãobio: "#2563EB", 
  igshopping: "#C13584",
  frete: "#16A34A", 
  freteday: "#059669",
  saleatacado: "#EA580C",
  atacado: "#D97706",
  varejo: "#F59E0B",
  googleads: "#4285F4",
  meta: "#007AFF",
  reels: "#D63384",
  stories: "#E11D48",
  bot: "#0EA5E9",
  remarketing: "#6366F1",

  "não informado": "#94A3B8",
};

export function getColorFor(name: string): string {
  if (!name) return colors["não informado"];
  const key = name.toLowerCase();

  for (const k of Object.keys(colors)) {
    if (key.includes(k)) return colors[k];
  }

  return colors["não informado"];
}

export default colors;

export function createStatCard({
  title,
  icon,
  value,
  description,
  footer = '',
  trend = null
}) {
  let trendHTML = '';

  if (trend !== null && trend !== undefined) {
    let trendColor;
    let trendIcon;

    if (trend > 0) {
      trendColor = 'text-red-400';
      trendIcon = '↑';
    } else if (trend < 0) {
      trendColor = 'text-green-400';
      trendIcon = '↓';
    } else {
      trendColor = 'text-[var(--color-text-muted)]';
      trendIcon = '→';
    }

    trendHTML = `
      <span class="${trendColor} font-medium">
        ${trendIcon} ${Math.abs(trend).toFixed(2)}%
      </span>
    `;
  }

  return `
    <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 flex flex-col min-h-80">

      <div class="flex items-center gap-3 text-[var(--color-text-muted)]">
        <i data-lucide="${icon}" class="w-5 h-5"></i>
        <p class="text-sm font-medium">${title}</p>
      </div>

      <div class="mt-5">
        <h3 class="text-4xl font-semibold text-[var(--color-text)]">
          ${value}
        </h3>

        <p class="mt-3 text-sm text-[var(--color-text-muted)]">
          ${trendHTML}
          ${description}
        </p>
      </div>

      <div class="mt-auto pt-6">
        ${footer}
      </div>

    </div>
  `;
}
import { mockDeals } from '../mocks/deals.js';

export function createExclusiveDeals() {
    return `
        <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 flex flex-col gap-4 h-full">
            <div class="flex flex-col gap-1">
                <h3 class="text-xl font-semibold text-[var(--color-text)]">Deals & Savings</h3>
                <p class="text-sm text-[var(--color-text-muted)]">Explore ways to save on subscriptions</p>
            </div>
            <div class="flex flex-col divide-y divide-[var(--color-border)]">
                ${mockDeals.map(deal => {
        return `
      <div class="flex items-center justify-between gap-4 py-4">
        <div class="flex flex-col gap-1">
          <p class="text-base font-semibold text-[var(--color-text)]">
            ${deal.serviceName}
          </p>

          <p class="text-sm text-[var(--color-text-muted)]">
            ${deal.description}
          </p>

          <span class="text-sm text-[var(--color-brand)] inline-flex items-center w-fit rounded-full px-3 py-1 bg-[var(--color-surface-hover)] text-xs">
            ${deal.eligibility}
          </span>
        </div>

        <a
          href="${deal.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 rounded-xl bg-[var(--color-surface-hover)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:opacity-80 transition-opacity"
        >
          View
        </a>
      </div>
    `;
    }).join('')}
</div>
        </div>
    `
}
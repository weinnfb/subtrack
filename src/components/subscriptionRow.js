import { getNextRenewalDate } from './upcomingRenewals.js';

export function createSubscriptionRow(subscription) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(getNextRenewalDate(subscription));

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: subscription.currency
    }).format(subscription.price);

    const formattedCategory =
        subscription.category.charAt(0).toUpperCase() +
        subscription.category.slice(1);

    return `
        <div class="flex items-center justify-between gap-4 py-4">

            <div class="flex items-center gap-3 min-w-0">
                <div class="flex items-center justify-center h-12 w-12 shrink-0 rounded-xl bg-[var(--color-brand)] text-white font-bold text-lg">
                    ${subscription.name[0]}
                </div>

                <div class="flex flex-col gap-1 min-w-0">
                    <p class="text-base font-semibold text-[var(--color-text)] truncate">
                        ${subscription.name}
                    </p>

                    <p class="text-sm text-[var(--color-text-muted)]">
                        ${formattedCategory} · Renews on ${formattedDate}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-[110px_90px_40px_40px_40px] items-center gap-3 shrink-0">
                <span class="text-sm text-[var(--color-brand)] inline-flex items-center justify-center justify-self-center rounded-full px-3 py-1 bg-[var(--color-surface-hover)]">
                    ${subscription.plan}
                </span>

                <p class="text-base font-semibold text-[var(--color-text)] text-right">
                    ${formattedPrice}
                </p>

                <button
                    type="button"
                    aria-label="Pause ${subscription.name}"
                    title="Pause"
                    disabled
                    class="p-2 rounded-lg text-[var(--color-text-muted)] opacity-60 cursor-not-allowed"
                >
                    <i data-lucide="pause" class="w-5 h-5"></i>
                </button>

                <button
                    type="button"
                    aria-label="Change plan for ${subscription.name}"
                    title="Change plan"
                    disabled
                    class="p-2 rounded-lg text-[var(--color-text-muted)] opacity-60 cursor-not-allowed"
                >
                    <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                </button>

                <button
                    type="button"
                    aria-label="Delete ${subscription.name}"
                    title="Delete"
                    disabled
                    class="p-2 rounded-lg text-[var(--color-text-muted)] opacity-60 cursor-not-allowed"
                >
                    <i data-lucide="trash" class="w-5 h-5"></i>
                </button>
            </div>

        </div>
    `;
}
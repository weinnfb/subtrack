
import { mockSubscriptions } from '../mocks/subscriptions.js';

export function createUpcomingRenewals() {
  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  return `
    <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 flex flex-col gap-6 h-full">

      <div>
        <h3 class="text-xl font-semibold text-[var(--color-text)]">
          Upcoming Renewals
        </h3>
        <p class="mt-1 text-sm text-[var(--color-text-muted)]">
          Manage your upcoming subscription renewals
        </p>
      </div>

      <div class="flex flex-col divide-y divide-[var(--color-border)]">
        ${mockSubscriptions
          .filter(subscription =>
            subscription.status === 'active' &&
            subscription.nextPaymentDate >= todayString
          )
          .sort((a, b) =>
            a.nextPaymentDate.localeCompare(b.nextPaymentDate)
          )
          .slice(0, 3)
          .map(subscription => {
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }).format(new Date(`${subscription.nextPaymentDate}T12:00:00`));

            const formattedPrice = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: subscription.currency
            }).format(subscription.price);

            return `
              <div class="flex items-center justify-between gap-4 py-4">

                <!-- Logo and Name -->
                <div class="flex items-center gap-3 min-w-0">
                  <div class="flex items-center justify-center h-12 w-12 shrink-0 rounded-xl bg-[var(--color-brand)] text-white font-bold text-lg">
                    ${subscription.name[0]}
                  </div>

                  <div class="flex flex-col gap-1 min-w-0">
                    <p class="text-sm font-semibold text-[var(--color-text)] truncate">
                      ${subscription.name}
                    </p>
                    <p class="text-xs text-[var(--color-text-muted)]">
                      Renews on ${formattedDate}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3 shrink-0">

                  <div class="flex flex-col items-end gap-1">
                    <p class="text-sm font-semibold text-[var(--color-text)]">
                      ${formattedPrice}
                    </p>
                    <p class="text-xs text-[var(--color-text-muted)]">
                      ${subscription.plan}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Cancel ${subscription.name}"
                    title="Cancel"
                    disabled
                    class="p-2 rounded-lg text-[var(--color-text-muted)] opacity-60 cursor-not-allowed"
                  >
                    <i data-lucide="x" class="w-5 h-5"></i>
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
                    aria-label="Pay now for ${subscription.name}"
                    title="Pay now"
                    disabled
                    class="p-2 rounded-lg text-[var(--color-text-muted)] opacity-60 cursor-not-allowed"
                  >
                    <i data-lucide="circle-dollar-sign" class="w-5 h-5"></i>
                  </button>

                </div>
              </div>
            `;
          }).join('')}
      </div>

      <a
        href="#subscriptions"
        class=" mt-auto flex items-center justify-center w-full rounded-xl bg-[var(--color-surface-hover)] px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:opacity-80 transition-opacity"
      >
        View All Subscriptions
      </a>

    </div>
  `;
}
export function createSubscriptionModal() {
    return `
        <div
            id="subscription-modal-overlay"
            class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4"
        >
            <div
                id="subscription-modal"
                class="w-full max-w-lg rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="subscription-modal-title"
            >
                <div class="flex items-center justify-between mb-6">
                    <h2
                        id="subscription-modal-title"
                        class="text-xl font-bold text-[var(--color-text)]"
                    >
                        New Subscription
                    </h2>

                    <button
                        type="button"
                        id="close-subscription-modal"
                        class="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
                        aria-label="Close modal"
                    >
                        <i data-lucide="x" class="h-5 w-5"></i>
                    </button>
                </div>

                <div class="text-sm text-[var(--color-text-muted)]">
                    Subscription form will be here.
                </div>
            </div>
        </div>
    `;
}
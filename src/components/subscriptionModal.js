import flatpickr from 'flatpickr';
import { createSubscriptionForm } from './subscriptionForm.js';

export function createSubscriptionModal() {
    return `
        <div
            id="subscription-modal-overlay"
            class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4"
        >
            <div
                id="subscription-modal"
                class="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl"
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

                ${createSubscriptionForm()}
            </div>
        </div>
    `;
}

export function initializeSubscriptionModal() {
    const modalOverlay = document.getElementById('subscription-modal-overlay');
    flatpickr('#next-payment-date', {
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'M j, Y',
        disableMobile: true,
        allowInput: false,
        position: 'auto'
    });
    const closeButton = document.getElementById('close-subscription-modal');
    const subscriptionForm = document.getElementById('subscription-form');
    const cancelButton = modalOverlay.querySelector(
        '[data-action="cancel-subscription"]'
    );

    function closeModal() {
        modalOverlay.classList.remove('flex');
        modalOverlay.classList.add('hidden');
    }

    function openModal() {
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('flex');
    }

    document.addEventListener('click', (event) => {
        const openButton = event.target.closest(
            '[data-action="open-subscription-modal"]'
        );

        if (openButton) {
            openModal();
        }
    });

    closeButton.addEventListener('click', closeModal);

    cancelButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });

    subscriptionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData  = new FormData(subscriptionForm);
        const newSubscription = {
            name: formData.get('serviceName'),
            plan: formData.get('planName'),
            price: Number(formData.get('price')),
            currency: formData.get('currency'),
            category: formData.get('category'),
            billingCycle: formData.get('billingCycle'),
            nextPaymentDate: formData.get('nextPaymentDate'),
            notes: formData.get('notes')
        };
        console.log(newSubscription);
    });
}

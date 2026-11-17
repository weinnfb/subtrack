import { createPageHeader } from '../components/pageHeader.js';
import { createButton } from '../components/button.js';
import { initializeIcons } from '../utils/icons.js';
import {
    calculateActiveSubscriptions,
    calculateTotalMonthlyCost
} from '../utils/subscriptionCalculations.js';
import { mockSubscriptions } from '../mocks/subscriptions.js';
import { createSubscriptionRow } from '../components/subscriptionRow.js';

const categories = ['all', 'streaming', 'productivity', 'finance', 'other'];

export function createSubscriptionPage() {
    const activeCount = calculateActiveSubscriptions(mockSubscriptions);
    const monthlyCost = calculateTotalMonthlyCost(mockSubscriptions);

    return `
        ${createPageHeader({
            title: 'Subscriptions',
            description: `${activeCount} active subscriptions · $${monthlyCost.toFixed(2)} per month`,
            actions: createButton({
                label: 'New Subscription',
                icon: 'plus',
                variant: 'primary'
            })
        })}

        <div class="flex flex-wrap gap-2 mt-6 mb-4">
            ${categories
                .map(category => `
                    <button
                        type="button"
                        data-category="${category}"
                        class="category-filter rounded-full px-4 py-2 ${category === 'all' ? 'category-active' : ''}"
                    >
                        ${category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                `)
                .join('')}
        </div>

        <div
            id="subscriptions-list"
            class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 divide-y divide-[var(--color-border)]"
        >
            ${mockSubscriptions
                .map(subscription => createSubscriptionRow(subscription))
                .join('')}
        </div>
    `;
}

function filterSubscriptions(subscriptions, category) {
    if (category === 'all') {
        return subscriptions;
    }

    return subscriptions.filter(
        subscription => subscription.category === category
    );
}

export function initializeSubscriptionFilters() {
    const buttons = document.querySelectorAll('[data-category]');
    const list = document.getElementById('subscriptions-list');

    if (!list) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove('category-active');
            });

            button.classList.add('category-active');

            const selectedCategory = button.dataset.category;

            const filteredSubscriptions = filterSubscriptions(
                mockSubscriptions,
                selectedCategory
            );

            if (filteredSubscriptions.length === 0) {
                list.innerHTML = `
                    <div class="flex flex-col items-center justify-center py-12 gap-2">
                        <i data-lucide="inbox" class="w-8 h-8 text-[var(--color-text-muted)]"></i>

                        <p class="text-base font-semibold text-[var(--color-text)]">
                            No subscriptions found
                        </p>

                        <p class="text-sm text-[var(--color-text-muted)]">
                            You don't have any subscriptions in this category yet.
                        </p>
                    </div>
                `;
            } else {
                list.innerHTML = filteredSubscriptions
                    .map(subscription => createSubscriptionRow(subscription))
                    .join('');
            }

            initializeIcons();
        });
    });
}
import { createPageHeader } from '../components/pageHeader.js';
import { createButton } from '../components/button.js';
import { createSubscriptionRow } from '../components/subscriptionRow.js';
import {
    filterSubscriptions,
    sortSubscriptions,
    searchSubscriptions
} from '../utils/subscriptionFilters.js';
import { initializeIcons } from '../utils/icons.js';
import {
    calculateActiveSubscriptions,
    calculateTotalMonthlyCost
} from '../utils/subscriptionCalculations.js';
import { mockSubscriptions } from '../mocks/subscriptions.js';

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
                variant: 'primary',
                action: 'open-subscription-modal'
            })
        })}

        <div class="flex flex-wrap items-center justify-between gap-4 mt-6 mb-4">
            <div class="flex flex-wrap gap-2">
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

            <div class="relative self-center">
                <select
                    id="subscription-sort"
                    class="appearance-none bg-[var(--color-surface-hover)] text-[var(--color-text)] rounded-xl pl-4 pr-10 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
                >
                    <option value="name">Name</option>
                    <option value="low-to-high-price">Price: Low to High</option>
                    <option value="high-to-low-price">Price: High to Low</option>
                    <option value="next-payment">Next Payment</option>
                </select>

                <i
                    data-lucide="chevron-down"
                    class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none"
                ></i>
            </div>
        </div>

        <div
            id="subscriptions-list"
            class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 divide-y divide-[var(--color-border)]"
        >
            ${sortSubscriptions(mockSubscriptions, 'name')
                .map(subscription => createSubscriptionRow(subscription))
                .join('')}
        </div>
    `;
}

let previousSearchHandler = null;

export function initializeSubscriptionFilters() {
    const buttons = document.querySelectorAll('[data-category]');
    const list = document.getElementById('subscriptions-list');
    const sortSelect = document.getElementById('subscription-sort');
    const searchInput = document.getElementById('sidebar-search');

    if (!list || !sortSelect || !searchInput) return;

    let selectedCategory = 'all';

    function renderSubscriptions() {
        const searchValue = searchInput.value.trim();

        const filteredSubscriptions = filterSubscriptions(
            mockSubscriptions,
            selectedCategory
        );

        const searchedSubscriptions = searchSubscriptions(
            filteredSubscriptions,
            searchValue
        );

        const sortedSubscriptions = sortSubscriptions(
            searchedSubscriptions,
            sortSelect.value
        );

        if (sortedSubscriptions.length === 0) {
            list.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 gap-2">
                    <i
                        data-lucide="inbox"
                        class="w-8 h-8 text-[var(--color-text-muted)]"
                    ></i>

                    <p class="text-base font-semibold text-[var(--color-text)]">
                        No subscriptions found
                    </p>

                    <p class="text-sm text-[var(--color-text-muted)]">
                        You don't have any subscriptions matching your filters.
                    </p>
                </div>
            `;
        } else {
            list.innerHTML = sortedSubscriptions
                .map(subscription => createSubscriptionRow(subscription))
                .join('');
        }

        initializeIcons();
    }

    sortSelect.addEventListener('change', renderSubscriptions);

    if (previousSearchHandler) {
        document.removeEventListener(
            'subscription-search',
            previousSearchHandler
        );
    }

    document.addEventListener('subscription-search', renderSubscriptions);
    previousSearchHandler = renderSubscriptions;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove('category-active');
            });

            button.classList.add('category-active');
            selectedCategory = button.dataset.category;

            renderSubscriptions();
        });
    });

    renderSubscriptions();
}
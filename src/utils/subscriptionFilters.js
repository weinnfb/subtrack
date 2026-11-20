import { getNextRenewalDate } from '../components/upcomingRenewals.js';

export function filterSubscriptions(subscriptions, category) {
    if (category === 'all') {
        return subscriptions;
    }

    return subscriptions.filter(
        subscription => subscription.category === category
    );
};

export function sortSubscriptions(subscriptions, sortBy) {
    const sortedSubscriptions = [...subscriptions];

    if (sortBy === 'name') {
        sortedSubscriptions.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    } else if (sortBy === 'low-to-high-price') {
        sortedSubscriptions.sort((a, b) => {
            return a.price - b.price;
        });
    } else if (sortBy === 'high-to-low-price') {
        sortedSubscriptions.sort((a, b) => {
            return b.price - a.price;
        });
    } else if (sortBy === 'next-payment') {
        sortedSubscriptions.sort((a, b) => {
            return getNextRenewalDate(a).getTime()
                - getNextRenewalDate(b).getTime();
        });
    }

    return sortedSubscriptions;
};

export function searchSubscriptions(subscriptions, searchQuery) {
    if (searchQuery === '') {
        return subscriptions;
    }

    return subscriptions.filter(subscription =>
        subscription.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );
};
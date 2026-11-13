export function calculateMonthlyCost(subscription) {
    return subscription.billingCycle === 'monthly'
        ? subscription.price
        : subscription.price / 12;
}

export function calculateSpendingByCategory(subscriptions) {
    return subscriptions
        .filter(subscription => subscription.status === 'active')
        .reduce((acc, subscription) => {
            const category = subscription.category;
            const monthlyCost = calculateMonthlyCost(subscription);

            acc[category] = (acc[category] || 0) + monthlyCost;

            return acc;
        }, {});
}

export function calculateTotalMonthlyCost(subscriptions) {
    return subscriptions
        .filter(subscription => subscription.status === 'active')
        .reduce((total, subscription) => {
            return total + calculateMonthlyCost(subscription)

        }, 0);
}

export function calculateSpendingChange(current, previous) {

    if (previous === 0) {
        return null;
    }
    return (current - previous) / previous * 100;
}

export function getSpendingChange(spendingHistory) {
    if (spendingHistory.length < 2) {
        return null;
    }

    const current = spendingHistory[spendingHistory.length - 1].total;
    const previous = spendingHistory[spendingHistory.length - 2].total;

    return calculateSpendingChange(current, previous);
};

export function calculateActiveSubscriptions(subscriptions) {
    const activeCount = subscriptions.filter(
        subscription => subscription.status === 'active'
    ).length;

    return activeCount;
};

export function calculateBudgetUsage(monthlySpending, monthlyBudget) {
    if (monthlyBudget <= 0) {
        return null;
    }

    return (monthlySpending / monthlyBudget) * 100;
};
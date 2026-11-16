import { createPageHeader } from '../components/pageHeader.js';
import { createButton } from '../components/button.js';
import { createStatCard } from '../components/statCard.js';
import { createRecommendationCard } from '../components/statRecommendation.js';
import { createUpcomingRenewals } from '../components/upcomingRenewals.js';
import { createSpendingByCategory } from '../components/spendingByCategory.js';
import { mockSubscriptions } from '../mocks/subscriptions.js';
import { calculateActiveSubscriptions, calculateTotalMonthlyCost, calculateBudgetUsage, getSpendingChange } from '../utils/subscriptionCalculations.js';
import { spendingHistory } from '../mocks/spendingHistory.js';
import { createMonthlySpendingChart } from '../components/monthlySpendingChart.js';
import { createBudgetProgress } from '../components/budgetProgress.js';
import { mockUserSettings } from '../mocks/userSettings.js';
import { createExclusiveDeals } from '../components/exclusiveDeals.js';
import { createSubscriptionGrowth } from '../components/subscriptionGrowth.js';



export function createDashboardPage() {
    const spendingChange = getSpendingChange(spendingHistory);
    const monthlySpending = calculateTotalMonthlyCost(mockSubscriptions);
    const monthlyBudget = mockUserSettings.monthlyBudget;
    const budgetUsage = calculateBudgetUsage(monthlySpending, monthlyBudget);

    return `
    ${createPageHeader({
        title: 'Overview',
        description: 'Good morning, Guest!',
        actions: `
        ${createButton({
            label: 'Manage Budget',
            icon: 'wallet',
            variant: 'secondary'
        })}
        ${createButton({
            label: 'New Subscription',
            icon: 'plus',
            variant: 'primary'
        })}
      `
    })}

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        ${createStatCard({
        title: 'Monthly Spending',
        icon: 'circle-dollar-sign',
        value: `$${calculateTotalMonthlyCost(mockSubscriptions).toFixed(2)}`,
        trend: spendingChange,
        description: spendingChange === null
            ? 'No previous month to compare'
            : 'from last month',
        footer: createMonthlySpendingChart()
    })}
    ${createStatCard({
        title: 'Active Subscriptions',
        icon: 'credit-card',
        value: calculateActiveSubscriptions(mockSubscriptions),
        description: '2 renewals coming up',
        footer: createBudgetProgress({
            monthlySpending,
            monthlyBudget,
            budgetUsage
        })
    })}
    ${createStatCard({
        title: 'Potential Savings',
        icon: 'coins',
        value: '$0.00',
        description: 'No savings suggestions yet',
        footer: createButton({
            label: 'View Suggestions',
            variant: 'secondary',
            fullWidth: true
        })
    })}
      ${createRecommendationCard()}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div class="lg:col-span-2 h-full">
            ${createUpcomingRenewals()}
        </div>
        ${createSpendingByCategory()}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        ${createExclusiveDeals()}
        ${createSubscriptionGrowth()}
    </div>
  `;
}
import { createDashboardPage } from '../pages/dashboard.js';
import { createSubscriptionPage } from '../pages/subcsription.js';
import { createAnalyticsPage } from '../pages/analytics.js';
import { createSettingsPage } from '../pages/settings.js';
import { initializeIcons } from '../utils/icons.js';
import { initializeSpendingChart } from '../utils/charts.js';
import { initializeMonthlySpendingChart } from '../utils/charts.js';
import { initializeSubscriptionGrowthChart } from '../components/subscriptionGrowth.js';


export function getCurrentPage() {
    return window.location.hash === ''
        ? '#dashboard'
        : window.location.hash;
};

export function renderPage() {
    const currentPage = getCurrentPage();
    const pageContent = document.getElementById('page-content');
    if (currentPage === '#dashboard') {
        pageContent.innerHTML = createDashboardPage();
    } else if (currentPage === '#subscriptions') {
        pageContent.innerHTML = createSubscriptionPage();
    } else if (currentPage === '#analytics') {
        pageContent.innerHTML = createAnalyticsPage();
    } else if (currentPage === '#settings') {
        pageContent.innerHTML = createSettingsPage();
    }

    initializeIcons();
    initializeSpendingChart();
    initializeMonthlySpendingChart();
    initializeSubscriptionGrowthChart();
}
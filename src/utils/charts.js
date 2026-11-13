import Chart from 'chart.js/auto';
import { mockSubscriptions } from '../mocks/subscriptions.js';
import { calculateSpendingByCategory } from './subscriptionCalculations.js';
import { spendingHistory } from '../mocks/spendingHistory.js';

let spendingChart = null;

const categoryColors = {
    streaming: '#7468EC',
    productivity: '#31B0CA',
    finance: '#258EFF',
    other: '#C6C7CF'
};

const formatCurrency = value =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

export function initializeSpendingChart() {
    if (spendingChart) {
        spendingChart.destroy();
        spendingChart = null;
    }

    const canvas = document.getElementById('spending-category-chart');

    if (!canvas) return;

    const legend = document.getElementById('spending-category-legend');
    const chartContainer = document.getElementById('spending-chart-container');
    const emptyElement = document.getElementById('spending-chart-empty');

    const spending = calculateSpendingByCategory(mockSubscriptions);

    const entries = Object.entries(spending)
        .filter(([, amount]) => amount > 0);

    legend.replaceChildren();

    if (entries.length === 0) {
        chartContainer.classList.add('hidden');
        legend.classList.add('hidden');
        emptyElement.classList.remove('hidden');
        return;
    }

    chartContainer.classList.remove('hidden');
    legend.classList.remove('hidden');
    emptyElement.classList.add('hidden');

    const categories = entries.map(([category]) => category);
    const values = entries.map(([, amount]) => amount);

    const colors = categories.map(
        category => categoryColors[category] || '#8B6CFF'
    );

    categories.forEach((category, index) => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-2';

        const dot = document.createElement('span');
        dot.className = 'w-2 h-2 rounded-full shrink-0';
        dot.style.backgroundColor = colors[index];

        const label = document.createElement('span');
        label.className = 'text-xs text-[var(--color-text-muted)]';
        label.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);

        item.append(dot, label);
        legend.appendChild(item);
    });

    spendingChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: context => formatCurrency(context.parsed)
                    }
                }
            }
        }
    });
}


export function initializeMonthlySpendingChart() {
    const canvas = document.getElementById('monthly-spending-chart');

    if (!canvas) return;

    const labels = spendingHistory.map(record => record.month);
    const values = spendingHistory.map(record => record.total);

    new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    data: values,
                    borderColor: '#8074FF',
                    borderWidth: 2.5,
                    pointRadius: 0,
                    tension: 0.3,
                    fill: true,
                    backgroundColor: 'rgba(128, 116, 255, 0.15)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            }
        }
    });
}
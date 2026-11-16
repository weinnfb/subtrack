import { subscriptionGrowth } from '../mocks/subscriptionGrowth.js';
import Chart from 'chart.js/auto';

export function createSubscriptionGrowth() {
    return `
        <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 flex flex-col gap-4 h-full">
            <div class="flex flex-col gap-1">
                <h3 class="text-xl font-semibold text-[var(--color-text)]">
                    Subscription Growth
                </h3>
                <p class="text-sm text-[var(--color-text-muted)]">
                    Track how your subscriptions have changed over time
                </p>
            </div>

            <div class="relative h-48 w-full mt-auto">
                <canvas id="subscription-growth-chart"></canvas>
            </div>
        </div>
    `;
}

export function initializeSubscriptionGrowthChart() {
    const canvas = document.getElementById('subscription-growth-chart');

    if (!canvas) return;

    const labels = subscriptionGrowth.map(item => item.month);
    const data = subscriptionGrowth.map(item => item.count);

    const existingChart = Chart.getChart(canvas);
    if (existingChart) existingChart.destroy();

    new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    data,
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
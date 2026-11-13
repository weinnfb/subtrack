import { createButton } from './button.js';

export function createRecommendationCard() {
    return `
      <div class="bg-gradient-to-br from-[#6962ED] via-[#35318F] to-[#A44BD2] rounded-3xl p-6 flex flex-col min-h-80">
        <div class="flex items-center justify-between text-white">
            <h2 class="text-2xl font-bold">SubTrack</h2>
            <i data-lucide="sparkles" class="w-6 h-6"></i>
        </div>
        <div class="mt-6">
            <h3 class="text-lg font-semibold text-white">Smart Recommendations</h3>
            <p class="mt-2 text-sm text-white/75">AI-powered suggestions to optimize your subscriptions</p>
        </div>
        <div class="mt-auto pt-6">
            ${createButton({
                label: 'Begin Analysis',
                variant: 'gradient',
                fullWidth: true
            })}
        </div>
      </div>
    `;
}

export function createSpendingByCategory() {
    return `
      <div class="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 flex flex-col gap-6 h-full">
        <div>
          <h3 class="text-xl font-semibold text-[var(--color-text)]">
            Spending by Category
          </h3>
          <p class="mt-1 text-sm text-[var(--color-text-muted)]">
            Your subscription expenses by category
          </p>
        </div>
  
        <div class="flex-1 flex flex-col items-center justify-center gap-6">
          <div
            id="spending-chart-container"
            class="relative w-[210px] h-[210px] max-w-full mx-auto"
          >
            <canvas id="spending-category-chart"></canvas>
          </div>
  
          <div
            id="spending-category-legend"
            class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          ></div>
  
          <p
            id="spending-chart-empty"
            class="hidden text-sm text-[var(--color-text-muted)] text-center"
          >
            No active subscriptions yet
          </p>
        </div>
      </div>
    `;
  }
  
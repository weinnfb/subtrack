export function createBudgetProgress({
    monthlySpending,
    monthlyBudget,
    budgetUsage
}) {
    const progressWidth = budgetUsage === null
        ? 0
        : Math.max(0, Math.min(budgetUsage, 100));

    const progressColor = budgetUsage > 100
        ? 'bg-red-500'
        : 'bg-[var(--color-brand)]';

    return `
      <div class="flex flex-col gap-3">
  
        <div class="w-full h-2 bg-[var(--color-surface-hover)] rounded-full overflow-hidden">
          <div
            class="h-full rounded-full ${progressColor} transition-all duration-300"
            style="width: ${progressWidth}%"
          ></div>
        </div>
  
        <div class="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>
            Budget: $${monthlyBudget.toFixed(2)}
          </span>
  
          <span>
            $${monthlySpending.toFixed(2)} / $${monthlyBudget.toFixed(2)}
          </span>
        </div>
  
      </div>
    `;
}
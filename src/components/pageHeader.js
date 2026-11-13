export function createPageHeader({ title, description, actions }) {
    return `
        <div class="flex items-center justify-between gap-4 mb-8">
            <div class="flex flex-col gap-1">
                <h2 class="text-3xl font-bold text-[var(--color-text)]">${title}</h2>
                <p class="text-sm text-[var(--color-text-muted)]">${description}</p>
            </div>
            <div class="flex items-center gap-3">
                ${actions}
            </div>
        </div>
    `
}
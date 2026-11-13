export function createButton({ label,
  icon,
  variant = 'primary',
  fullWidth = false}) {
    const variants = {
        primary: 'bg-[var(--color-brand)] text-white',
        secondary: 'bg-[var(--color-surface-hover)] text-[var(--color-text)]',
        gradient: 'bg-white/20 hover:bg-white/30 text-white'
      };
      const variantClasses = variants[variant];
      const widthClasses = fullWidth ? 'w-full' : '';

    return `
      <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium ${variantClasses} ${widthClasses}">
        ${icon ? `<i data-lucide="${icon}" class="w-4.5 h-4.5 shrink-0"></i>` : ''}
        <span>${label}</span>
      </button>
    `;
  }
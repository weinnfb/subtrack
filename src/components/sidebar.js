
const navigationGroups = [
  {
    items: [
      { label: 'Overview', href: '#dashboard', icon: 'layout-dashboard' },
      { label: 'Subscriptions', href: '#subscriptions', icon: 'credit-card' },
      { label: 'Analytics', href: '#analytics', icon: 'chart-no-axes-column' },
      { label: 'Notifications', href: '#notifications', icon: 'bell' }
    ]
  },
  {
    title: 'Discover',
    items: [
      { label: 'All Apps', href: '#apps', icon: 'shopping-bag' },
      { label: 'Deals & Offers', href: '#deals', icon: 'tag' }
    ]
  },
  {
    title: 'Settings',
    items: [
      { label: 'Account', href: '#account', icon: 'user-round' },
      { label: 'Preferences', href: '#preferences', icon: 'sliders-horizontal' }
    ]
  }
];



export function createSidebar() {
  return `
      <aside class="w-64 h-[calc(100vh-2rem)] p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl flex flex-col">
        <div class="flex items-center gap-3 mb-6">
            <div class=" flex h-10 w-10 text-white font-bold rounded-xl bg-[var(--color-brand)] items-center justify-center">
              S
            </div>
           <h2 class="text-xl font-bold text-[var(--color-text)]">SubTrack</h2>
        </div>
        
<nav>
  <div class="divide-y divide-[var(--color-border)]">
  ${navigationGroups.map(group => {
    return `
      <div class="py-4">
        ${group.title
        ? `<h3 class="px-2 mb-3 text-xs font-normal uppercase tracking-wider text-[var(--color-text-muted)]">
               ${group.title}
             </h3>`
        : ''
      }

        <ul class="flex flex-col gap-2">
          ${group.items.map(item => {
        return `
              <li>
                <a
                  href="${item.href}"
                  class="nav-link flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text)]"
                >
                  <i data-lucide="${item.icon}" class="w-4.5 h-4.5 shrink-0"></i>
                  <span>${item.label}</span>
                </a>
              </li>
            `;
      }).join('')}
        </ul>
      </div>
    `;
  }).join('')}
  </div>
</nav>
      </aside>
    `;
};

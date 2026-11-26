import './style.css';
import 'flatpickr/dist/themes/dark.css';
import { createSidebar } from './components/sidebar';
import { updateActiveLink } from './navigations/activeLinks';
import { renderPage } from './navigations/router';
import { initializeIcons } from './utils/icons.js';
import { initializeSidebarSearch } from './components/sidebar';
import { createSubscriptionModal, initializeSubscriptionModal} from './components/subscriptionModal.js';

document.documentElement.dataset.theme = 'dark';
document.querySelector('#app').innerHTML = `
  <div class="flex h-screen overflow-hidden bg-[var(--color-background)] p-4 gap-4">
    ${createSidebar()}
    <main id="page-content" class="flex-1 p-8 min-h-0 overflow-y-auto">
      <h1 class="text-4xl font-bold text-[var(--color-brand)]">
        Dashboard
      </h1>
      <p class="text-[var(--color-text-muted)]">
        Manage all your subscriptions in one place.
      </p>
      <button class="bg-[var(--color-brand)] text-[var(--color-on-brand)] rounded-lg px-4 py-2">Add Subscription</button>
    </main>
    ${createSubscriptionModal()}
  </div>
`;
updateActiveLink();
renderPage();
initializeIcons();
initializeSidebarSearch();
initializeSubscriptionModal();


window.addEventListener('hashchange', updateActiveLink);
window.addEventListener('hashchange', renderPage);
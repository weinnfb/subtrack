export function toggleTheme() {
    document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark'
      ? 'light'
      : 'dark';
}
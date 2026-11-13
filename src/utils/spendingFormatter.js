export function formatSpendingChange(spendingChange) {
    let spendingDescription;
  
    if (spendingChange === null) {
      spendingDescription = 'No previous month to compare';
    } else if (spendingChange > 0) {
      spendingDescription = `↑ ${spendingChange.toFixed(2)}% from last month`;
    } else if (spendingChange < 0) {
      spendingDescription = `↓ ${Math.abs(spendingChange).toFixed(2)}% from last month`;
    } else {
      spendingDescription = 'No change from last month';
    }
  
    return spendingDescription;
  }
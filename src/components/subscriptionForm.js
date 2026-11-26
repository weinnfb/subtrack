
import { createButton } from './button.js';

export function createSubscriptionForm() {
    const inputClasses = `
        w-full min-w-0 rounded-xl
        border border-[var(--color-border)]
        bg-[var(--color-surface-hover)]
        px-4 py-3
        text-sm text-[var(--color-text)]
        placeholder:text-[var(--color-text-muted)]
        outline-none transition-colors
        focus:border-[var(--color-brand)]
        focus:ring-2 focus:ring-[var(--color-brand)]
    `;

    const labelClasses = `
        block mb-2 text-sm font-medium
        text-[var(--color-text)]
    `;

    const iconClasses = `
        absolute left-4 top-1/2 -translate-y-1/2
        w-4 h-4 text-[var(--color-text-muted)]
        pointer-events-none
    `;

    return `
        <form id="subscription-form" class="space-y-5">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div class="min-w-0">
                    <label for="service-name" class="${labelClasses}">
                        Service name <span class="text-red-400">*</span>
                    </label>

                    <div class="relative">
                        <i data-lucide="monitor" class="${iconClasses}"></i>

                        <input
                            type="text"
                            id="service-name"
                            name="serviceName"
                            placeholder="e.g. Netflix"
                            autocomplete="off"
                            required
                            class="${inputClasses} pl-11"
                        />
                    </div>
                </div>

                <div class="min-w-0">
                    <label for="plan-name" class="${labelClasses}">
                        Plan name <span class="text-red-400">*</span>
                    </label>

                    <div class="relative">
                        <i data-lucide="tag" class="${iconClasses}"></i>

                        <input
                            type="text"
                            id="plan-name"
                            name="planName"
                            placeholder="e.g. Premium"
                            required
                            class="${inputClasses} pl-11"
                        />
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">

                <div class="min-w-0 md:col-span-4">
                    <label for="subscription-price" class="${labelClasses}">
                        Price <span class="text-red-400">*</span>
                    </label>

                    <div class="relative">
                        <i data-lucide="coins" class="${iconClasses}"></i>

                        <input
                            type="number"
                            id="subscription-price"
                            name="price"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                            class="${inputClasses} pl-11"
                        />
                    </div>
                </div>

                <div class="min-w-0 md:col-span-3">
                    <label for="subscription-currency" class="${labelClasses}">
                        Currency <span class="text-red-400">*</span>
                    </label>

                    <div class="relative">
                        <select
                            id="subscription-currency"
                            name="currency"
                            required
                            class="${inputClasses} appearance-none pr-10 cursor-pointer"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GEL">GEL</option>
                            <option value="UAH">UAH</option>
                        </select>

                        <i
                            data-lucide="chevron-down"
                            class="absolute right-4 top-1/2 -translate-y-1/2
                                   w-4 h-4 text-[var(--color-text-muted)]
                                   pointer-events-none"
                        ></i>
                    </div>
                </div>

                <div class="min-w-0 md:col-span-5">
                    <label for="subscription-category" class="${labelClasses}">
                        Category <span class="text-red-400">*</span>
                    </label>

                    <div class="relative">
                        <select
                            id="subscription-category"
                            name="category"
                            required
                            class="${inputClasses} appearance-none pr-10 cursor-pointer"
                        >
                            <option value="" disabled selected>
                                Choose category
                            </option>
                            <option value="streaming">Streaming</option>
                            <option value="productivity">Productivity</option>
                            <option value="finance">Finance</option>
                            <option value="other">Other</option>
                        </select>

                        <i
                            data-lucide="chevron-down"
                            class="absolute right-4 top-1/2 -translate-y-1/2
                                   w-4 h-4 text-[var(--color-text-muted)]
                                   pointer-events-none"
                        ></i>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div class="min-w-0">
                    <label for="billing-cycle" class="${labelClasses}">
                        Billing cycle <span class="text-red-400">*</span>
                    </label>

                    <div class="relative">
                        <i data-lucide="calendar-sync" class="${iconClasses}"></i>

                        <select
                            id="billing-cycle"
                            name="billingCycle"
                            required
                            class="${inputClasses} pl-11 pr-10 appearance-none cursor-pointer"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="annual">Annual</option>
                        </select>

                        <i
                            data-lucide="chevron-down"
                            class="absolute right-4 top-1/2 -translate-y-1/2
                                   w-4 h-4 text-[var(--color-text-muted)]
                                   pointer-events-none"
                        ></i>
                    </div>
                </div>

                <div class="min-w-0">
                    <label for="next-payment-date" class="${labelClasses}">
                        Next payment date <span class="text-red-400">*</span>
                    </label>

                    <input
                        type="text"
                        id="next-payment-date"
                        name="nextPaymentDate"
                        placeholder="Select date"
                        required
                        readonly
                        class="${inputClasses} cursor-pointer"
                    />
                </div>
            </div>

            <div>
                <label for="subscription-notes" class="${labelClasses}">
                    Notes
                    <span class="font-normal text-[var(--color-text-muted)]">
                        (optional)
                    </span>
                </label>

                <textarea
                    id="subscription-notes"
                    name="notes"
                    rows="3"
                    maxlength="200"
                    placeholder="Add a note (e.g. shared plan, promo price, etc.)"
                    class="${inputClasses} resize-none"
                ></textarea>
            </div>

            <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-5 border-t border-[var(--color-border)]">

                ${createButton({
        label: 'Cancel',
        variant: 'secondary',
        action: 'cancel-subscription'
    })}

                ${createButton({
        label: 'Add Subscription',
        icon: 'plus',
        variant: 'primary',
        type: 'submit'
    })}

            </div>
        </form>
    `;
}

export const patterns = {
    description: /^\S(?:.*\S)?$/,
    amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,

    // Advanced regex (back-reference)
    duplicateWords: /\b(\w+)\s+\1\b/i
};

export function validateDescription(value) {
    return patterns.description.test(value);
}

export function validateAmount(value) {
    return patterns.amount.test(value);
}

export function validateDate(value) {
    return patterns.date.test(value);
}

export function validateCategory(value) {
    return patterns.category.test(value);
}
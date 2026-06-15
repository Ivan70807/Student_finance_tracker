import {
    validateDescription,
    validateAmount,
    validateCategory,
    validateDate
} from "./validators.js";

import { state } from "./state.js";

state.records = [
    {
        id: "txn_1",
        description: "Lunch at cafeteria",
        amount: 12.50,
        category: "Food",
        date: "2025-09-25"
    },
    {
        id: "txn_2",
        description: "Bus pass",
        amount: 20.00,
        category: "Transport",
        date: "2025-09-20"
    }
];

import { renderTransactions }
    from "./ui.js";

renderTransactions();

const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");

function showValidation(input, isValid, errorId, message) {
    const error = document.getElementById(errorId);

    if (isValid) {
        error.textContent = "";
        input.classList.remove("input-error");
    } else {
        error.textContent = message;
        input.classList.add("input-error");
    }
}

description.addEventListener("input", () => {
    showValidation(
        description,
        validateDescription(description.value),
        "description-error",
        "Description cannot start or end with spaces."
    );
});

amount.addEventListener("input", () => {
    showValidation(
        amount,
        validateAmount(amount.value),
        "amount-error",
        "Enter a valid amount."
    );
});

category.addEventListener("input", () => {
    showValidation(
        category,
        validateCategory(category.value),
        "category-error",
        "Letters, spaces and hyphens only."
    );
});

date.addEventListener("input", () => {
    showValidation(
        date,
        validateDate(date.value),
        "date-error",
        "Use YYYY-MM-DD format."
    );
});
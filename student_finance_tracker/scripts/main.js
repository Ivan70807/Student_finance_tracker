import {
    validateDescription,
    validateAmount,
    validateCategory,
    validateDate
} from "./validators.js";

import { state } from "./state.js";

import { renderTransactions } from "./ui.js";

import { compileRegex } from "./search.js";
import {updateStats, renderWeeklyTrend} from "./stats.js";

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

renderTransactions();
updateStats();
renderWeeklyTrend();

const searchInput =
    document.getElementById("search-pattern");

const caseSensitive =
    document.getElementById("case-sensitive");

const sortBy =
    document.getElementById("sort-by");

searchInput.addEventListener(
    "input",
    () => {

        const flags =
            caseSensitive.checked
                ? "g"
                : "gi";

        const regex =
            compileRegex(
                searchInput.value,
                flags
            );

        renderTransactions(regex);

        if (
            searchInput.value &&
            !regex
        ) {

            document.getElementById(
                "regex-error"
            ).textContent =
                "Invalid regex pattern";

        } else {

            document.getElementById(
                "regex-error"
            ).textContent = "";

        }

    }
);
sortBy.addEventListener(
    "change",
    () => {

        const value =
            sortBy.value;

        if (value === "date") {

            state.records.sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );

        }

        if (value === "description") {

            state.records.sort(
                (a, b) =>
                    a.description.localeCompare(
                        b.description
                    )
            );

        }

        if (value === "amount") {

            state.records.sort(
                (a, b) =>
                    b.amount -
                    a.amount
            );

        }

        renderTransactions();

    }
);

const budgetInput =
    document.getElementById("budget-cap");

budgetInput.addEventListener("input", () => {
    updateStats();
});
const toggle =
    document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});
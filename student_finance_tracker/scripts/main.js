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
import {
    saveTransactions,
    loadTransactions} from "./storage.js";
state.records = loadTransactions();

if (state.records.length === 0) {

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

    saveTransactions(state.records);
}

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
const form =
    document.getElementById(
        "transaction-form-element"
    );

form.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const description =
            document.getElementById(
                "description"
            ).value;

        const amount =
            document.getElementById(
                "amount"
            ).value;

        const category =
            document.getElementById(
                "category"
            ).value;

        const date =
            document.getElementById(
                "date"
            ).value;

        let valid = true;

        if (
            !validateDescription(
                description
            )
        ) {
            document.getElementById(
                "description-error"
            ).textContent =
                "Invalid description";

            valid = false;
        } else {
            document.getElementById(
                "description-error"
            ).textContent = "";
        }

        if (
            !validateAmount(
                amount
            )
        ) {
            document.getElementById(
                "amount-error"
            ).textContent =
                "Invalid amount";

            valid = false;
        } else {
            document.getElementById(
                "amount-error"
            ).textContent = "";
        }

        if (
            !validateCategory(
                category
            )
        ) {
            document.getElementById(
                "category-error"
            ).textContent =
                "Invalid category";

            valid = false;
        } else {
            document.getElementById(
                "category-error"
            ).textContent = "";
        }

        if (
            !validateDate(
                date
            )
        ) {
            document.getElementById(
                "date-error"
            ).textContent =
                "Invalid date";

            valid = false;
        } else {
            document.getElementById(
                "date-error"
            ).textContent = "";
        }

        if (!valid) return;

        const record = {

            id:
                "txn_" +
                Date.now(),

            description,

            amount:
                Number(amount),

            category,

            date,

            createdAt:
                new Date()
                    .toISOString(),

            updatedAt:
                new Date()
                    .toISOString()
        };

        state.records.push(
            record
        );

        saveTransactions(
            state.records
        );

        renderTransactions();

        updateStats();

        renderWeeklyTrend();

        form.reset();

    }
);
const currencySelect =
    document.getElementById("currency");

currencySelect.value =
    localStorage.getItem("currency") || "USD";

currencySelect.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "currency",
            currencySelect.value
        );
    }
);

// restore saved value
budgetInput.value =
    localStorage.getItem("budgetCap") || "";

// save on change
budgetInput.addEventListener(
    "input",
    () => {

        localStorage.setItem(
            "budgetCap",
            budgetInput.value
        );

        updateStats();
    }
);
const exportBtn =
    document.getElementById("export-btn");

exportBtn.addEventListener(
    "click",
    () => {

        const data =
            JSON.stringify(
                state.records,
                null,
                2
            );

        const blob =
            new Blob(
                [data],
                { type: "application/json" }
            );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;
        a.download = "finance-data.json";

        a.click();

        URL.revokeObjectURL(url);
    }
);
const importInput =
    document.getElementById("import-json");

importInput.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload =
            (e) => {

                try {

                    const data =
                        JSON.parse(e.target.result);

                    // basic validation
                    if (!Array.isArray(data)) {
                        alert("Invalid JSON format");
                        return;
                    }

                    const isValid =
                        data.every(item =>
                            item.id &&
                            item.description &&
                            item.amount &&
                            item.category &&
                            item.date
                        );

                    if (!isValid) {
                        alert("Invalid record structure");
                        return;
                    }

                    state.records = data;

                    saveTransactions(state.records);

                    renderTransactions();

                    updateStats();

                    renderWeeklyTrend();

                } catch (err) {
                    alert("Failed to import JSON");
                }
            };

        reader.readAsText(file);
    }
);
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        document.getElementById("search-pattern").value = "";
        renderTransactions();

    }

});
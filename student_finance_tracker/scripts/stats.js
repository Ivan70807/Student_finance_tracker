import { state } from "./state.js";

export function updateStats() {

    const totalRecords = state.records.length;

    document.getElementById("total-records")
        .textContent = totalRecords;

    const total = state.records.reduce(
        (sum, r) => sum + r.amount,
        0
    );

    document.getElementById("total-spending")
        .textContent = `$${total.toFixed(2)}`;

    // TOP CATEGORY
    const counts = {};

    state.records.forEach(r => {
        counts[r.category] =
            (counts[r.category] || 0) + 1;
    });

    let top = "None";
    let max = 0;

    for (const c in counts) {
        if (counts[c] > max) {
            max = counts[c];
            top = c;
        }
    }

    document.getElementById("top-category")
        .textContent = top;

    // BUDGET CAP
    const capInput =
        document.getElementById("budget-cap");

    const cap = Number(capInput.value);

    const message =
        document.getElementById("budget-message");

    if (cap > 0) {

        const remaining = cap - total;

        if (remaining >= 0) {
            message.setAttribute("aria-live", "polite");
            message.textContent =
                `Remaining: $${remaining.toFixed(2)}`;
        } else {
            message.setAttribute("aria-live", "assertive");
            message.textContent =
                `Over budget by $${Math.abs(remaining).toFixed(2)}`;
        }

    } else {
        message.textContent = "";
    }

}

export function renderWeeklyTrend() {

    const container =
        document.getElementById("weekly-trend");

    container.innerHTML = "";

    const today = new Date();

    const last7 = Array.from({ length: 7 })
        .map((_, i) => {

            const d = new Date();
            d.setDate(today.getDate() - i);

            const dateStr =
                d.toISOString().split("T")[0];

            const total = state.records
                .filter(r => r.date === dateStr)
                .reduce((sum, r) => sum + r.amount, 0);

            return { date: dateStr, total };
        })
        .reverse();

    last7.forEach(day => {

        const bar = document.createElement("div");

        bar.style.height = `${day.total * 2}px`;
        bar.style.width = "20px";
        bar.style.display = "inline-block";
        bar.style.marginRight = "4px";
        bar.style.background = "steelblue";

        bar.title = `${day.date}: $${day.total}`;

        container.appendChild(bar);
    });
}
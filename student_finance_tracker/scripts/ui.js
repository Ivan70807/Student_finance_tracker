import { state } from "./state.js";
import { highlight } from "./search.js";

export function renderTransactions(regex = null) {

    const container =
        document.getElementById(
            "transactions-container"
        );

    container.innerHTML = "";

    state.records.forEach(record => {

        const description =
            highlight(
                record.description,
                regex
            );

        container.innerHTML += `
            <div class="card">
                <h3>${description}</h3>
                <p>$${record.amount}</p>
                <p>${record.category}</p>
                <p>${record.date}</p>
            </div>
        `;
    });
}
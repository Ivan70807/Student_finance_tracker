import { state } from "./state.js";

export function renderTransactions() {

    const container =
        document.getElementById(
            "transactions-container"
        );

    container.innerHTML = "";

    state.records.forEach(record => {

        container.innerHTML += `
            <div class="card">
                <h3>${record.description}</h3>
                <p>$${record.amount}</p>
                <p>${record.category}</p>
                <p>${record.date}</p>
            </div>
        `;
    });
}
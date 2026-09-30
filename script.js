// ======================================
// SMARTSPEND EXPENSE CALCULATOR
// ======================================


// Get saved data
let savedData = localStorage.getItem("smartSpendData");


// If data exists, load it
if (savedData) {

    savedData = JSON.parse(savedData);

}
else {

    savedData = {

        income: 0,

        expenses: []

    };

}


// ======================================
// ADD EXPENSE
// ======================================

function addExpense() {

    let income =
        Number(savedData.income);


    // First time income entry

    if (income === 0) {

        let newIncome =
            Number(document.getElementById("income").value);


        if (newIncome <= 0) {

            alert("⚠️ Please enter your monthly income.");

            return;

        }


        savedData.income = newIncome;

        income = newIncome;

    }


    let category =
        document.getElementById("category").value;


    let amount =
        Number(document.getElementById("amount").value);


    // Check category

    if (category === "") {

        alert("⚠️ Please select an expense category.");

        return;

    }


    // Check amount

    if (amount <= 0) {

        alert("⚠️ Please enter a valid expense amount.");

        return;

    }


    // Calculate total expense

    let totalExpense = 0;


    for (let i = 0; i < savedData.expenses.length; i++) {

        totalExpense +=
            savedData.expenses[i].amount;

    }


    // Calculate remaining balance

    let remaining =
        savedData.income - totalExpense;


    // ==================================
    // IMPORTANT BALANCE CHECK
    // ==================================

    if (amount > remaining) {

        alert(
            "⚠️ Insufficient Balance!\n\n" +
            "You have only ₹" +
            remaining.toLocaleString("en-IN") +
            " remaining.\n\n" +
            "Please enter an amount within your available balance."
        );

        return;

    }


    // Add expense

    savedData.expenses.push({

        category: category,

        amount: amount,

        date: new Date().toLocaleDateString("en-IN"),

        time: new Date().toLocaleTimeString("en-IN")

    });


    // Save data

    localStorage.setItem(
        "smartSpendData",
        JSON.stringify(savedData)
    );


    // Clear inputs

    document.getElementById("amount").value = "";

    document.getElementById("category").value = "";


    // Update screen

    updateCalculator();

}


// ======================================
// UPDATE CALCULATOR
// ======================================

function updateCalculator() {

    let income =
        savedData.income;


    let totalExpense = 0;


    // Calculate total expense

    for (let i = 0; i < savedData.expenses.length; i++) {

        totalExpense +=
            savedData.expenses[i].amount;

    }


    // Remaining balance

    let remaining =
        income - totalExpense;


    // Income

    let incomeElement =
        document.getElementById("totalIncome");


    if (incomeElement) {

        incomeElement.innerText =
            "₹" +
            income.toLocaleString("en-IN");

    }


    // Total expense

    let expenseElement =
        document.getElementById("totalExpense");


    if (expenseElement) {

        expenseElement.innerText =
            "₹" +
            totalExpense.toLocaleString("en-IN");

    }


    // Remaining balance

    let savingsElement =
        document.getElementById("savings");


    if (savingsElement) {

        savingsElement.innerText =
            "₹" +
            remaining.toLocaleString("en-IN");

    }


    // Available balance

    let balanceElement =
        document.getElementById("availableBalance");


    if (balanceElement) {

        balanceElement.innerText =
            "₹" +
            remaining.toLocaleString("en-IN");

    }


    // ==================================
    // BUDGET PERCENTAGE
    // ==================================

    let percentage = 0;


    if (income > 0) {

        percentage =
            (totalExpense / income) * 100;

    }


    let percentageElement =
        document.getElementById("percentage");


    if (percentageElement) {

        percentageElement.innerText =
            Math.round(percentage) + "%";

    }


    let progress =
        document.getElementById("progress");


    if (progress) {

        progress.style.width =
            Math.min(percentage, 100) + "%";

    }


    // ==================================
    // MESSAGE
    // ==================================

    let message =
        document.getElementById("message");


    if (message) {

        if (income === 0) {

            message.innerText =
                "💰 Enter your monthly income to start.";

        }

        else if (remaining === 0) {

            message.innerText =
                "🚨 Your entire income has been spent.";

        }

        else {

            message.innerText =
                "💰 You have ₹" +
                remaining.toLocaleString("en-IN") +
                " available for spending.";

        }

    }


    // ==================================
    // INCOME INPUT
    // ==================================

    let incomeInput =
        document.getElementById("income");


    if (incomeInput) {

        if (income > 0) {

            incomeInput.value = income;

            incomeInput.readOnly = true;

            incomeInput.style.background =
                "#eeeeee";

        }

    }


    // Income status

    let incomeStatus =
        document.getElementById("incomeStatus");


    if (incomeStatus && income > 0) {

        incomeStatus.innerText =
            "✅ Monthly income already saved: ₹" +
            income.toLocaleString("en-IN");

    }

}


// ======================================
// REPORT PAGE
// ======================================

function loadReport() {

    let data =
        localStorage.getItem("smartSpendData");


    if (!data) {

        return;

    }


    let reportData =
        JSON.parse(data);


    let income =
        reportData.income;


    let totalExpense = 0;


    for (
        let i = 0;
        i < reportData.expenses.length;
        i++
    ) {

        totalExpense +=
            reportData.expenses[i].amount;

    }


    let remaining =
        income - totalExpense;


    // ==================================
    // REPORT SUMMARY
    // ==================================

    let reportIncome =
        document.getElementById("reportIncome");


    if (reportIncome) {

        reportIncome.innerText =
            "₹" +
            income.toLocaleString("en-IN");

    }


    let reportExpense =
        document.getElementById("reportExpense");


    if (reportExpense) {

        reportExpense.innerText =
            "₹" +
            totalExpense.toLocaleString("en-IN");

    }


    let reportSavings =
        document.getElementById("reportSavings");


    if (reportSavings) {

        reportSavings.innerText =
            "₹" +
            remaining.toLocaleString("en-IN");

    }


    // ==================================
    // REPORT MESSAGE
    // ==================================

    let reportMessage =
        document.getElementById("reportMessage");


    if (reportMessage) {

        if (remaining > 0) {

            reportMessage.innerText =
                "💰 You still have ₹" +
                remaining.toLocaleString("en-IN") +
                " available.";

        }

        else {

            reportMessage.innerText =
                "🚨 No balance remaining.";

        }

    }


    // ==================================
    // EXPENSE HISTORY
    // ==================================

    let reportList =
        document.getElementById("reportList");


    if (!reportList) {

        return;

    }


    reportList.innerHTML = "";


    if (reportData.expenses.length === 0) {

        reportList.innerHTML =
            "<p>No expenses added yet.</p>";

        return;

    }


    for (
        let i = 0;
        i < reportData.expenses.length;
        i++
    ) {

        let expense =
            reportData.expenses[i];


        reportList.innerHTML += `

            <div class="expense-item">

                <div>

                    <strong>
                        ${getEmoji(expense.category)}
                        ${expense.category}
                    </strong>

                    <br>

                    <small>
                        ${expense.date}
                        ${expense.time}
                    </small>

                </div>


                <strong>
                    ₹${expense.amount.toLocaleString("en-IN")}
                </strong>

            </div>

        `;

    }

}


// ======================================
// EMOJI
// ======================================

function getEmoji(category) {

    let emojis = {

        Food: "🍔",

        Travel: "🚗",

        Education: "📚",

        Shopping: "🛍️",

        Bills: "💡",

        Entertainment: "🎬",

        Medical: "🏥",

        Other: "📦"

    };


    return emojis[category] || "📦";

}


// ======================================
// GO TO REPORT
// ======================================

function goToReport() {

    window.location.href =
        "report.html";

}


// ======================================
// START NEW MONTH
// ======================================

function resetData() {

    let confirmReset =
        confirm(
            "Are you sure you want to start a new month?\n\n" +
            "Your current income and expense history will be cleared."
        );


    if (!confirmReset) {

        return;

    }


    localStorage.removeItem(
        "smartSpendData"
    );


    alert(
        "✅ New month started. You can enter a new income."
    );


    location.reload();

}


// ======================================
// PAGE LOAD
// ======================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCalculator();

        loadReport();

    }
);
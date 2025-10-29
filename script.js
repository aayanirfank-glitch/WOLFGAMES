// Timer for 1 hour
let time = 60 * 60; 
const timerElement = document.getElementById("timer");

function updateTimer() {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    timerElement.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (time > 0) time--;
}

setInterval(updateTimer, 1000);

// Razorpay payment
document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        let game = this.dataset.game;
        let amount = parseInt(this.dataset.amount);

        let options = {
            key: "YOUR_RAZORPAY_KEY_ID",
            amount: amount * 100,
            currency: "INR",
            name: "Wolf Trader Games",
            description: `Purchase for ${game}`,
            image: "https://cdn-icons-png.flaticon.com/512/732/732222.png",
            handler: function (response) {
                alert("Payment successful! ID: " + response.razorpay_payment_id);
                window.open("https://wa.me/919999999999?text=I%20have%20purchased%20" + game + "%20with%20Payment%20ID:%20" + response.razorpay_payment_id);
            },
            theme: { color: "#00ffcc" }
        };
        let rzp = new Razorpay(options);
        rzp.open();
    });
});

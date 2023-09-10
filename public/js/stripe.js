const stripe = Stripe(
  "pk_test_51NoKh1SDxcqzp1v08QfCvU2pyYPz6QEaCWfr9TT68oTrYCMocUZrW0xMaijsUEQldxibLW7MLImvmqXcaqsFfZay00gdhyztSR"
);

// Tour id is coming right from the interface.
const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};

const bookBtn = document.getElementById("book-tour");

if (bookBtn) {
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";

    const tourId = e.target.dataset.tourId;

    bookTour(tourId);
  });
}

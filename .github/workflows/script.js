const settings = {
  businessName: "Jubilee-Luxury-Mobile-Detailing Co.",
  phone: "+6153487683",
  displayPhone: "(615) 348-7683",
  email: "Contact@jubileeexecutivecarservice.com",
  calendlyUrl: "https://calendly.com/aarmstrong1234",
  formspreeEndpoint: "https://formspree.io/f/xqewgnbb",
};

const bookingLink = document.getElementById("bookingLink");
const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");
const phoneLink = document.getElementById("phoneLink");
const emailLink = document.getElementById("emailLink");
const yearLabel = document.getElementById("year");

if (bookingLink) bookingLink.href = settings.calendlyUrl;
if (quoteForm) quoteForm.action = settings.formspreeEndpoint;
if (phoneLink) {
  phoneLink.href = `tel:${settings.phone}`;
  phoneLink.textContent = `Call ${settings.displayPhone}`;
}
if (emailLink) {
  emailLink.href = `mailto:${settings.email}`;
  emailLink.textContent = settings.email;
}
if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());

if (formMessage && settings.formspreeEndpoint.includes("mpqkokga")) {
  formMessage.textContent = "Setup required: update formspreeEndpoint in script.js.";
}

if (quoteForm) {
  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!quoteForm.checkValidity()) {
      quoteForm.reportValidity();
      return;
    }

    if (settings.formspreeEndpoint.includes("mpqkokga")) {
      formMessage.textContent = "Cannot submit yet: add your real Formspree endpoint.";
      return;
    }

    const formData = new FormData(quoteForm);

    try {
      const response = await fetch(settings.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form request failed.");
      }

      quoteForm.reset();
      formMessage.textContent = "Success! Your quote request was sent.";
    } catch (error) {
      formMessage.textContent = "Submit failed. Try again or contact us by phone.";
    }
  });
}

const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ICICI Bank credentials
const AES_KEY = process.env.ICICI_AES_KEY; // Replace with real key
const MERCHANT_ID = process.env.ICICI_MERCHANT_ID;       // Given merchant ID

// AES-128-ECB encryption
function encrypt(text) {
  const key = Buffer.from(AES_KEY.slice(0, 16), 'utf8');
  const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

// API: Generate ICICI payment URL
app.post('/api/initiate-payment', (req, res) => {
  try {
    const {
      referenceNo,
      submerchantId,
      transactionAmount,
      customerName,
      mobileNumber,
      emailId,
      city,
      state,
      address,
      pincode,
      paymode,
      returnUrl
    } = req.body;

    // Build mandatory fields string (must be 10 fields)
    const mandatoryFields = [
      referenceNo,
      submerchantId,
      transactionAmount,
      customerName,
      mobileNumber,
      emailId,
      city,
      state,
      address,
      pincode
    ].join('|');

    // Encrypt required fields
    const encryptedMandatory = encrypt(mandatoryFields);
    const encryptedReturnUrl = encrypt(returnUrl);
    const encryptedReferenceNo = encrypt(referenceNo);
    const encryptedSubmerchantId = encrypt(submerchantId);
    const encryptedAmount = encrypt(transactionAmount);
    const encryptedPaymode = encrypt(paymode);

    // Construct payment URL
    const baseUrl = "https://eazypay.icicibank.com/EazyPG";
    const params = new URLSearchParams({
      merchantid: MERCHANT_ID,
      "mandatory fields": encryptedMandatory,
      "optional fields": "",
      returnurl: encryptedReturnUrl,
      "Reference No": encryptedReferenceNo,
      submerchantid: encryptedSubmerchantId,
      "transaction amount": encryptedAmount,
      paymode: encryptedPaymode
    });

    const paymentUrl = `${baseUrl}?${params.toString()}`;

    res.json({ success: true, paymentUrl });
  } catch (error) {
    console.error("Payment URL generation error:", error);
    res.json({ success: false, error: error.message });
  }
});

// API: Handle ICICI response (return URL)
app.get('/payment-response', (req, res) => {
  console.log("Payment Response from ICICI:", req.query);

  res.send(`
    <h2>Payment Response</h2>
    <pre>${JSON.stringify(req.query, null, 2)}</pre>
    <p><a href="/">Back to Home</a></p>
  `);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

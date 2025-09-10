import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config(); // loads .env file

const app = express();
app.use(cors({
  origin: "https://your-frontend-domain.com"
}));
app.use(express.json());

// 🔑 ICICI Config from .env
const AES_KEY = process.env.ICICI_AES_KEY; // must be 16 chars
const MERCHANT_ID = process.env.ICICI_MERCHANT_ID;
const RETURN_URL = process.env.ICICI_RETURN_URL;

// 🔒 AES-128-ECB encryption
function encrypt(text) {
  const key = Buffer.from(AES_KEY.slice(0, 16), "utf8");
  const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

// 🔓 AES-128-ECB decryption (for ICICI response)
function decrypt(encryptedText) {
  try {
    const key = Buffer.from(AES_KEY.slice(0, 16), "utf8");
    const decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch {
    return null;
  }
}

// 🟢 API to initiate payment
app.post("/api/initiate-payment", (req, res) => {
  try {
    const {
      referenceNo,
      subMerchantId,
      amount,
      name,
      mobile,
      email,
      city,
      state,
      address,
      pincode,
      paymode,
    } = req.body;

    // Basic validation
    if (
      !referenceNo ||
      !subMerchantId ||
      !amount ||
      !name ||
      !mobile ||
      !email ||
      !city ||
      !state ||
      !address ||
      !pincode
    ) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Mandatory fields (pipe separated, exactly 10)
    const mandatoryFields = [
      referenceNo,
      subMerchantId,
      amount,
      name,
      mobile,
      email,
      city,
      state,
      address,
      pincode,
    ].join("|");

    // Encrypt required fields
    const encryptedMandatory = encrypt(mandatoryFields);
    const encryptedReturnUrl = encrypt(RETURN_URL);
    const encryptedReferenceNo = encrypt(referenceNo);
    const encryptedSubmerchantId = encrypt(subMerchantId);
    const encryptedAmount = encrypt(amount.toString());
    const encryptedPaymode = encrypt(paymode?.toString() || "9");

    // Build ICICI payment URL
    const baseUrl = "https://eazypay.icicibank.com/EazyPG";
    const params = new URLSearchParams({
      merchantid: MERCHANT_ID,
      "mandatory fields": encryptedMandatory,
      "optional fields": "",
      returnurl: encryptedReturnUrl,
      "Reference No": encryptedReferenceNo,
      submerchantid: encryptedSubmerchantId,
      "transaction amount": encryptedAmount,
      paymode: encryptedPaymode,
    });

    const paymentUrl = `${baseUrl}?${params.toString()}`;

    res.json({ success: true, paymentUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟢 Payment response endpoint (ICICI return URL should point here)
app.get("/api/payment-response", (req, res) => {
  try {
    const responseData = req.query;
    const decryptedResponse = {};

    for (const [key, value] of Object.entries(responseData)) {
      decryptedResponse[key] = decrypt(value) || value;
    }

    res.json({
      success: true,
      raw: responseData,
      decrypted: decryptedResponse,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🟢 Test route
app.get("/", (req, res) => {
  res.send("ICICI Payment Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

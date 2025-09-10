import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config(); // loads .env file

const app = express();
app.use(cors());
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
  console.log("🔍 Request received:", req.body);
  
  try {
    // 1. Check environment variables first
    console.log("🔑 Environment check:");
    console.log("AES_KEY exists:", !!AES_KEY);
    console.log("AES_KEY length:", AES_KEY ? AES_KEY.length : 0);
    console.log("MERCHANT_ID exists:", !!MERCHANT_ID);
    console.log("RETURN_URL exists:", !!RETURN_URL);
    
    if (!AES_KEY || !MERCHANT_ID || !RETURN_URL) {
      console.error("❌ Missing environment variables!");
      return res.status(500).json({ 
        success: false, 
        error: "Server configuration error" 
      });
    }

    // ✅ Fixed: Use the correct field names from frontend
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

    // ✅ Fixed: Log the correct variable names
    console.log("📝 Extracted data:", {
      referenceNo, 
      submerchantId, 
      transactionAmount, 
      customerName, 
      mobileNumber, 
      emailId
    });

    // ✅ Fixed: Validate using the correct field names
    const missingFields = [];
    if (!referenceNo) missingFields.push('referenceNo');
    if (!submerchantId) missingFields.push('submerchantId');
    if (!transactionAmount) missingFields.push('transactionAmount');
    if (!customerName) missingFields.push('customerName');
    if (!mobileNumber) missingFields.push('mobileNumber');
    if (!emailId) missingFields.push('emailId');
    if (!city) missingFields.push('city');
    if (!state) missingFields.push('state');
    if (!address) missingFields.push('address');
    if (!pincode) missingFields.push('pincode');

    if (missingFields.length > 0) {
      console.log("❌ Missing fields:", missingFields);
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields",
        missingFields 
      });
    }

    // ✅ Fixed: Use correct variable names in mandatory fields
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
      pincode,
    ].join("|");
    
    console.log("📦 Mandatory fields:", mandatoryFields);

    // 4. Test encryption with error handling
    console.log("🔐 Starting encryption...");
    
    let encryptedMandatory, encryptedReturnUrl, encryptedReferenceNo, 
        encryptedSubmerchantId, encryptedAmount, encryptedPaymode;
    
    try {
      encryptedMandatory = encrypt(mandatoryFields);
      console.log("✅ Mandatory fields encrypted");
      
      encryptedReturnUrl = encrypt(RETURN_URL);
      console.log("✅ Return URL encrypted");
      
      encryptedReferenceNo = encrypt(referenceNo);
      console.log("✅ Reference No encrypted");
      
      encryptedSubmerchantId = encrypt(submerchantId);
      console.log("✅ Submerchant ID encrypted");
      
      // ✅ Fixed: Use transactionAmount instead of amount
      encryptedAmount = encrypt(transactionAmount.toString());
      console.log("✅ Amount encrypted");
      
      encryptedPaymode = encrypt(paymode?.toString() || "9");
      console.log("✅ Paymode encrypted");
      
    } catch (encryptError) {
      console.error("💥 Encryption failed:", encryptError);
      return res.status(500).json({ 
        success: false, 
        error: "Encryption failed: " + encryptError.message 
      });
    }

    // 5. Build payment URL
    console.log("🔗 Building payment URL...");
    
    const baseUrl = "https://eazypay.icicibank.com/EazyPG";
    const params = new URLSearchParams({
      merchantid: MERCHANT_ID,
      "mandatory fields": encryptedMandatory,
      "optional fields": "",
      returnurl: encryptedReturnUrl,
      "Reference No": encryptedReferenceNo,
      // ✅ Fixed: Use correct variable name
      submerchantid: encryptedSubmerchantId,
      "transaction amount": encryptedAmount,
      paymode: encryptedPaymode,
    });

    const paymentUrl = `${baseUrl}?${params.toString()}`;
    console.log("✅ Payment URL generated successfully");

    res.json({ success: true, paymentUrl });
    
  } catch (err) {
    console.error("💥 Unexpected error:", err);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error: " + err.message 
    });
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

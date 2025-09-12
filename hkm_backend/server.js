import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();

// Enhanced CORS with better security
app.use(cors({
  origin: [
    "https://harekrishnamarwar.org",
    "https://www.harekrishnamarwar.org"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For ICICI callbacks

// 🔑 ICICI Config from .env with validation
const AES_KEY = process.env.ICICI_AES_KEY;
const MERCHANT_ID = process.env.ICICI_MERCHANT_ID;
const RETURN_URL = process.env.ICICI_RETURN_URL;

// ✅ Production Environment Validation
function validateEnvironment() {
  const errors = [];
  
  if (!AES_KEY) errors.push("ICICI_AES_KEY is required");
  else if (AES_KEY.length !== 16) errors.push("ICICI_AES_KEY must be exactly 16 characters");
  
  if (!MERCHANT_ID) errors.push("ICICI_MERCHANT_ID is required");
  if (!RETURN_URL) errors.push("ICICI_RETURN_URL is required");
  
  if (errors.length > 0) {
    console.error("❌ Environment Configuration Errors:");
    errors.forEach(error => console.error(`   - ${error}`));
    process.exit(1);
  }
  
  console.log("✅ Environment validation passed");
}

// Validate on startup
validateEnvironment();

// 🔒 Enhanced AES-128-ECB encryption with better error handling
function encrypt(text) {
  try {
    if (text === undefined || text === null) {
      throw new Error(`Cannot encrypt undefined/null value: ${text}`);
    }
    
    const key = Buffer.from(AES_KEY.slice(0, 16), "utf8");
    const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
    let encrypted = cipher.update(String(text), "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  } catch (error) {
    console.error("💥 Encryption error for:", text, error.message);
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

// 🔓 Enhanced AES-128-ECB decryption
function decrypt(encryptedText) {
  try {
    if (!encryptedText) return null;
    
    const key = Buffer.from(AES_KEY.slice(0, 16), "utf8");
    const decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.warn("⚠️ Decryption failed for:", encryptedText);
    return null;
  }
}

// 🔐 SHA512 signature generation (for response validation)
function generateSHA512(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}

// 🔍 Enhanced response code handler
function parseICICIResponse(responseCode) {
  const responseCodes = {
    'E000': { status: 'SUCCESS', message: 'Payment successful' },
    'E327': { status: 'PENDING', message: 'Offline payment - challan generated (Bank)' },
    'E328': { status: 'PENDING', message: 'Offline payment - challan generated (Post)' },
    'E329': { status: 'PENDING', message: 'Offline payment - challan generated (EMI)' },
    'E00331': { status: 'PENDING', message: 'UPI transaction initiated' },
    'E001': { status: 'FAILED', message: 'Payment failed - insufficient funds' },
    'E002': { status: 'FAILED', message: 'Payment failed - invalid card' },
    'E003': { status: 'FAILED', message: 'Payment failed - transaction declined' },
    'E004': { status: 'FAILED', message: 'Payment failed - expired card' },
  };
  
  return responseCodes[responseCode] || { 
    status: 'UNKNOWN', 
    message: `Unknown response code: ${responseCode}` 
  };
}

// 🟢 Enhanced API to initiate payment
app.post("/api/initiate-payment", (req, res) => {
  const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  console.log(`🔍 [${transactionId}] Payment initiation started`);
  
  try {
    // Extract and validate request data
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
      paymode = "9", // Default to all payment modes
      returnUrl
    } = req.body;

    console.log(`📝 [${transactionId}] Request data:`, {
      referenceNo, submerchantId, transactionAmount, customerName, 
      mobileNumber, emailId, paymode
    });

    // Comprehensive field validation
    const requiredFields = {
      referenceNo, submerchantId, transactionAmount, customerName,
      mobileNumber, emailId, city, state, address, pincode
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log(`❌ [${transactionId}] Missing fields:`, missingFields);
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        missingFields,
        transactionId
      });
    }

    // Validate transaction amount
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid transaction amount",
        transactionId
      });
    }

    // Build mandatory fields string
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

    console.log(`📦 [${transactionId}] Mandatory fields prepared`);

    // Encrypt all required fields
    let encryptedData;
    try {
      encryptedData = {
        mandatoryFields: encrypt(mandatoryFields),
        returnUrl: encrypt(returnUrl || RETURN_URL),
        referenceNo: encrypt(String(referenceNo)),
        submerchantId: encrypt(String(submerchantId)),
        transactionAmount: encrypt(String(transactionAmount)),
        paymode: encrypt(String(paymode))
      };
      console.log(`✅ [${transactionId}] All fields encrypted successfully`);
    } catch (encryptError) {
      console.error(`💥 [${transactionId}] Encryption failed:`, encryptError);
      return res.status(500).json({
        success: false,
        error: "Payment processing error - encryption failed",
        transactionId
      });
    }

    // ✅ Fixed: Proper URL construction without URLSearchParams issues
    const baseUrl = "https://eazypay.icicibank.com/EazyPG";
    
    // Manual parameter construction to handle spaces in parameter names
    const params = [
      `merchantid=${encodeURIComponent(MERCHANT_ID)}`,
      `mandatory%20fields=${encodeURIComponent(encryptedData.mandatoryFields)}`,
      `optional%20fields=${encodeURIComponent("")}`,
      `returnurl=${encodeURIComponent(encryptedData.returnUrl)}`,
      `Reference%20No=${encodeURIComponent(encryptedData.referenceNo)}`,
      `submerchantid=${encodeURIComponent(encryptedData.submerchantId)}`,
      `transaction%20amount=${encodeURIComponent(encryptedData.transactionAmount)}`,
      `paymode=${encodeURIComponent(encryptedData.paymode)}`
    ].join('&');

    const paymentUrl = `${baseUrl}?${params}`;
    
    console.log(`✅ [${transactionId}] Payment URL generated successfully`);
    console.log(`🔗 [${transactionId}] Redirecting to ICICI EazyPay`);

    res.json({
      success: true,
      paymentUrl,
      transactionId,
      referenceNo
    });

  } catch (err) {
    console.error(`💥 [${transactionId}] Unexpected error:`, err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      transactionId
    });
  }
});

// 🟢 Enhanced payment response handler - REDIRECT to your frontend
// ✅ SIMPLE: Just receive ICICI callback and log it
app.post("/thank-you", (req, res) => {
  const responseId = `RESP_${Date.now()}`;
  console.log(`💳 [${responseId}] ICICI Response received:`, req.body);
  
  // Just acknowledge receipt - don't redirect
  res.send("Payment callback received");
});


// 🟢 Health check endpoint
app.get("/", (req, res) => {
  res.json({
    service: "ICICI EazyPay Payment Backend",
    status: "🚀 Running",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// 🟢 API health endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 ICICI EazyPay Server Started Successfully!
📍 Port: ${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
🔑 Merchant ID: ${MERCHANT_ID}
✅ Ready to process payments!
  `);
});

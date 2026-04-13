import { useState } from "react";
import { useNavigate } from "react-router-dom";
 import { useSelector } from "react-redux";
const cardIcons = {
  visa: (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
      <rect width="38" height="24" rx="4" fill="#1A1F71" />
      <text x="7" y="17" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">VISA</text>
    </svg>
  ),
  mastercard: (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
      <rect width="38" height="24" rx="4" fill="#252525" />
      <circle cx="15" cy="12" r="7" fill="#EB001B" />
      <circle cx="23" cy="12" r="7" fill="#F79E1B" />
      <path d="M19 7.3a7 7 0 0 1 0 9.4A7 7 0 0 1 19 7.3z" fill="#FF5F00" />
    </svg>
  ),
  amex: (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
      <rect width="38" height="24" rx="4" fill="#2557D6" />
      <text x="5" y="17" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">AMEX</text>
    </svg>
  ),
  jcb: (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
      <rect width="38" height="24" rx="4" fill="#003087" />
      <text x="8" y="17" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">JCB</text>
    </svg>
  ),
};
 
export default function StripeCheckout() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("inr");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [country, setCountry] = useState("India");
  const [saveInfo, setSaveInfo] = useState(false);
  const [qty] = useState(2);
  const [errors, setErrors] = useState({});
 
const cartItems = useSelector((state) => state.products.cartItem);
 
  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };
 
  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };
 
  // total quantity
const totalQuantity = cartItems.reduce(
  (acc, item) => acc + parseInt(item.qty),
  0
);

// subtotal (sum of all items)
const subtotal = cartItems.reduce(
  (acc, item) => acc + parseFloat(item.total),
  0
);

// shipping (you can keep fixed or dynamic)
const shipping = cartItems.length === 0 ? 0 : 385.71;

// final total
const total = (subtotal + shipping).toFixed(2);
  
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email address";
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    if (!expiry.trim() || expiry.length < 7)
      newErrors.expiry = "Enter a valid expiry date";
    if (!cvc.trim() || cvc.length < 3)
      newErrors.cvc = "Enter a valid CVC";
    if (!cardName.trim())
      newErrors.cardName = "Cardholder name is required";
    return newErrors;
  };
 
  const handlePay = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    navigate("/success");
  };
 
  const clearError = (field) =>
    setErrors((prev) => ({ ...prev, [field]: "" }));
 
  const borderFor = (field) =>
    errors[field] ? "1.5px solid #dc2626" : "1.5px solid #d1d5db";
 
  const errorStyle = {
    color: "#dc2626",
    fontSize: "11px",
    marginTop: "4px",
    display: "block",
  };
 
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f9fc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        display: "flex",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        overflow: "hidden",
        width: "100%",
        maxWidth: "900px",
      }}>
 
        {/* LEFT PANEL */}
        <div style={{ flex: 1, padding: "40px 36px", borderRight: "1px solid #e6ebf1", minWidth: "300px" }}>
          <div style={{ marginBottom: "28px" }}>
            <span style={{
              background: "#fff3cd", color: "#856404", border: "1px solid #ffc107",
              borderRadius: "4px", padding: "3px 10px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.5px",
            }}>TEST MODE</span>
          </div>
         <div style={{ borderTop: "1px solid #e6ebf1", paddingTop: "20px" }}>
  {cartItems.map((item, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "18px",
      }}
    >
      <div>
        <p style={{ fontWeight: 600, fontSize: "15px", margin: 0 }}>
          {item.name}
        </p>
        <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "3px" }}>
          Qty {item.qty} • ₹{item.price} each
        </p>
      </div>

      <p style={{ fontWeight: 600, fontSize: "15px", margin: 0 }}>
        ₹{item.total}
      </p>
    </div>
  ))}
            {[{ label: "Subtotal", value: `₹${subtotal}` }, { label: "Shipping", sub: "shipping (3-7 business days)", value: `₹${shipping.toFixed(2)}` }].map(({ label, sub, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "#374151", margin: 0 }}>{label}</p>
                  {sub && <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{sub}</p>}
                </div>
                <p style={{ fontSize: "14px", color: "#374151", margin: 0 }}>{value}</p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e6ebf1", marginTop: "14px", paddingTop: "14px", display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontWeight: 700, fontSize: "16px", color: "#1a1a1a", margin: 0 }}>Total due</p>
              <p style={{ fontWeight: 700, fontSize: "16px", color: "#1a1a1a", margin: 0 }}>₹{total}</p>
            </div>
          </div>
        </div>
 
        {/* RIGHT PANEL */}
        <div style={{ flex: 1, padding: "40px 36px", minWidth: "320px" }}>
          
 
          {/* Contact Information */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a1a", marginBottom: "10px" }}>Contact information</p>
            <label style={{ fontSize: "13px", color: "#374151" }}>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); clearError("email"); }}
              style={{ ...inputStyle, border: borderFor("email") }}
            />
            {errors.email && <span style={errorStyle}>⚠ {errors.email}</span>}
          </div>
 
          {/* Payment Method */}
          <div>
            <p style={{ fontWeight: 700, fontSize: "15px", color: "#1a1a1a", marginBottom: "12px" }}>Payment method</p>
            <div style={{ border: "1.5px solid #d1d5db", borderRadius: "8px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="1" y="4" width="18" height="13" rx="2.5" stroke="#374151" strokeWidth="1.5" />
                  <rect x="1" y="8" width="18" height="3" fill="#374151" />
                </svg>
                <span style={{ fontWeight: 600, fontSize: "14px", color: "#1a1a1a" }}>Card</span>
              </div>
 
              <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>Card information</label>
 
              {/* Card Number */}
              <div style={{ position: "relative", marginBottom: "2px" }}>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  value={cardNumber}
                  onChange={e => { setCardNumber(formatCard(e.target.value)); clearError("cardNumber"); }}
                  maxLength={19}
                  style={{ ...inputStyle, border: borderFor("cardNumber"), borderRadius: "6px 6px 0 0", paddingRight: "120px", marginBottom: 0 }}
                />
                <div style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", display: "flex", gap: "4px" }}>
                  {[cardIcons.visa, cardIcons.mastercard, cardIcons.amex, cardIcons.jcb].map((icon, i) => <span key={i}>{icon}</span>)}
                </div>
              </div>
              {errors.cardNumber && <span style={errorStyle}>⚠ {errors.cardNumber}</span>}
 
              {/* Expiry + CVC */}
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={expiry}
                  onChange={e => { setExpiry(formatExpiry(e.target.value)); clearError("expiry"); }}
                  maxLength={7}
                  style={{ ...inputStyle, border: borderFor("expiry"), borderRadius: "0 0 0 6px", borderTop: "none", borderRight: "none", marginBottom: 0, flex: 1 }}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={e => { setCvc(e.target.value.replace(/\D/g, "").slice(0, 4)); clearError("cvc"); }}
                  style={{ ...inputStyle, border: borderFor("cvc"), borderRadius: "0 0 6px 0", borderTop: "none", marginBottom: 0, flex: 1 }}
                />
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ flex: 1 }}>{errors.expiry && <span style={errorStyle}>⚠ {errors.expiry}</span>}</div>
                <div style={{ flex: 1 }}>{errors.cvc && <span style={errorStyle}>⚠ {errors.cvc}</span>}</div>
              </div>
 
              {/* Cardholder Name */}
              <div style={{ marginTop: "10px" }}>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "5px" }}>Cardholder name</label>
                <input
                  type="text"
                  placeholder="Full name on card"
                  value={cardName}
                  onChange={e => { setCardName(e.target.value); clearError("cardName"); }}
                  style={{ ...inputStyle, border: borderFor("cardName") }}
                />
                {errors.cardName && <span style={errorStyle}>⚠ {errors.cardName}</span>}
              </div>
 
              {/* Country */}
              <div style={{ marginTop: "10px" }}>
                <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "5px" }}>Country or region</label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  style={{ ...inputStyle, appearance: "none", background: "white url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\") no-repeat right 12px center", cursor: "pointer" }}
                >
                  {["India", "United States", "United Kingdom", "Germany", "Australia", "Canada", "Singapore", "Japan"].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
 
            
 
            {/* Pay Button */}
            <button
              onClick={handlePay}
              style={{
                width: "100%", background: "#0570de", color: "white", border: "none",
                borderRadius: "6px", padding: "14px", fontSize: "16px", fontWeight: 700,
                cursor: "pointer", marginTop: "14px", transition: "background 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#0353a4"}
              onMouseOut={e => e.currentTarget.style.background = "#0570de"}
            >
              Pay
            </button>
 
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "16px" }}>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                Powered by <span style={{ fontWeight: 700, color: "#635bff", fontStyle: "italic" }}>shiva</span>
              </span>
              <span style={{ color: "#d1d5db" }}>|</span>
              <a href="#" style={{ fontSize: "12px", color: "#6b7280", textDecoration: "none" }}>Terms</a>
              <a href="#" style={{ fontSize: "12px", color: "#6b7280", textDecoration: "none" }}>Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1.5px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  color: "#1a1a1a",
  outline: "none",
  boxSizing: "border-box",
  marginBottom: "0px",
  background: "white",
  transition: "border-color 0.15s",
};
 
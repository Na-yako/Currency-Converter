import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setAmount(0);
    setFrom("USD");
    setTo("EUR");
    setConverted(0);
  };

  const handleConversion = () => {
    async function convert() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setConverted(data.rates[to]);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    }

    if (from === to) return;
    convert();
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      {error ? (
        <Error onConversion={handleConversion} />
      ) : (
        <>
          <h2>
            Rates : {converted} {to}
          </h2>
          <label htmlFor="">Amount</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Input Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={isLoading}
          />

          <label htmlFor="">From</label>
          <select
            name=""
            id=""
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>

          <label htmlFor="">To</label>
          <select
            name=""
            id=""
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>

          <button className="button" onClick={handleConversion}>
            Convert
          </button>
          <button className="button" onClick={handleReset}>
            Reset
          </button>
        </>
      )}
    </form>
  );
}

function Error({ onConversion }) {
  return (
    <div>
      <h2>🙆‍♀️</h2>
      <h3>No internet</h3>
      <p>Try:</p>
      <ul style={{ marginLeft: "60px", margin: "10px" }}>
        <li>Checking the network cables, modem, and router</li>
        <li>Reconnecting to Wi-Fi</li>
        <li>Running Windows Network Diagnostics</li>
      </ul>
      <p style={{ margin: "10px" }}>ERR_INTERNET_DISCONNECTED</p>
      <button
        onClick={() => onConversion()}
        style={{
          background: "blue",
          color: "white",
          padding: "6px",
          borderRadius: "14px",
          border: "none",
          outline: "none",
        }}
      >
        Reload
      </button>
    </div>
  );
}

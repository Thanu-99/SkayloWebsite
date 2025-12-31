import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfileDropdown from "../components/ProfileDropdown";
import { auth } from "../firebase";

const slides = [
  { img: slide1, text: "Most packaged snacks hide dangerous sugar levels behind tiny labels." },
  { img: slide2, text: "Some ‘healthy’ foods burn more calories to digest than they provide." },
  { img: slide3, text: "Ultra-processed foods rewire hunger signals and increase cravings." }
];
export default function Home() {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* Slider auto-change */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* Firebase auth state listener */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  /* Scan button logic (AUTH PROTECTED) */
  const handleScanClick = () => {
    if (user) {
      navigate("/scan");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("/")}>
          Skaylo
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#facts">Food Facts</a>
          <a href="#swap">Swap Foods</a>

          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <button className="nav-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="slider-card">
            <img src={slides[index].img} alt="food awareness" />
            <div className="fact-overlay">{slides[index].text}</div>
          </div>
        </div>

        <div className="hero-right">
          <h1>
            Know what you eat.
            <br />
            <span>Instantly.</span>
          </h1>

          <p className="hero-desc">
            Skaylo helps you decode food labels that are intentionally confusing.
            Just search or scan a product to instantly see calories, sugar,
            burn-time, health risks, and who should avoid it.
          </p>

          {/* 🔒 AUTH-AWARE BUTTON */}
          <button className="hero-btn" onClick={handleScanClick}>
            Scan your food 🍽️
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="info-section" id="about">
        <h2>What is Skaylo?</h2>
        <p>
          Skaylo is a health awareness platform that breaks down confusing food
          labels into simple, honest insights. No marketing tricks. Just facts
          that help you make better food choices.
        </p>
        <p>
          The idea for Skaylo came from the need to decode misleading packaging
          and nutrition claims. Many products look “healthy” but are loaded with
          hidden sugar, sodium, and additives that affect long-term health.
        </p>
        <ul>
          <li>Calories, sugar, and sodium content</li>
          <li>Health risks from ingredients</li>
          <li>Who should avoid specific foods</li>
          <li>Estimated calorie burn-time</li>
        </ul>
      </section>

      {/* FOOD FACTS */}
      <section className="info-section soft" id="facts">
        <h2>Food Facts</h2>
        <ul>
          <li>🍭 High sugar foods spike insulin and increase cravings.</li> 
          <li>🧂 Excess sodium silently raises blood pressure.</li> 
          <li>🧠 Ultra-processed foods affect hunger signals.</li> 
          <li>⚠️ “Low-fat” often means high sugar.</li> 
          <li>🥤 Sugary drinks are linked to fatty liver disease.</li> 
          <li>🍫 Milk chocolate contains more sugar than cocoa.</li> 
          <li>🥪 White bread can spike blood sugar faster than candy.</li> 
          <li>🍟 Deep-fried foods increase inflammation in the body.</li> 
          <li>🥛 Excess dairy may worsen acne in some people.</li> 
          <li>🧈 Trans fats raise “bad” LDL cholesterol.</li> 
          <li>🍹 Artificially sweetened drinks may increase cravings for sweets.</li> 
          <li>🍕 Frozen or packaged pizza is often packed with sodium.</li> 
          <li>🥫 Canned soups often contain more salt than a fast-food meal.</li> 
          <li>🍩 Highly processed snacks can rewire your brain’s reward system.</li> 
          <li>🌽 High-fructose corn syrup is linked to obesity and insulin resistance.</li> 
          <li>🥤 Energy drinks can spike heart rate and blood pressure.</li> 
          <li>🍔 Fast food regularly eaten can shrink brain volume over time.</li> 
          <li>🍟 Packaged chips contain acrylamides, a possible carcinogen when fried.</li> 
          <li>🥤 Cola drinks can erode tooth enamel.</li> 
          <li>🍪 Pre-packaged cookies often contain hidden hydrogenated oils.</li>
           </ul>
      </section>

      {/* SWAP FOODS */}
      <section className="info-section" id="swap">
        <h2>Swap Foods</h2>
        <div className="swap-grid">
          {[
            { from: "Pepsi / Cola", to: "Sparkling water with lemon" },
             { from: "Lemonade (sugary)", to: "Fresh lemon water / infused water" }, 
             { from: "Lays / Potato chips", to: "Roasted chickpeas / baked veggie chips" }, 
             { from: "Dairy milk chocolate", to: "Dark chocolate (70%+)" }, 
             { from: "Sugary cereals", to: "Oats or muesli with fruits" }, 
             { from: "Packaged fruit juice", to: "Fresh fruit juice or smoothies" }, 
             { from: "Instant noodles", to: "Whole grain pasta with veggies" }, 
             { from: "Flavored yogurt", to: "Greek yogurt with berries" }, 
             { from: "Candy bars", to: "Nuts + dried fruits" }, 
             { from: "Ice cream", to: "Frozen banana “nice cream”" }, 
             { from: "White bread", to: "Whole grain / multigrain bread" }, 
             { from: "Sweetened granola bars", to: "Homemade oat bars with honey" }, 
             { from: "Creamy salad dressings", to: "Olive oil + lemon / yogurt dressing" }, 
             { from: "Sugary coffee drinks", to: "Black coffee / coffee with milk & cinnamon" }, 
             { from: "Energy drinks", to: "Green tea / coconut water" }, 
             { from: "Fried chicken", to: "Oven-baked chicken or air-fried" }, 
             { from: "Soft drinks", to: "Infused water (mint, cucumber, berries)" }, 
             { from: "Instant pudding", to: "Chia pudding with almond milk" }, 
             { from: "Packaged muffins", to: "Homemade banana or zucchini muffins" }, 
             { from: "Sugary snack cakes", to: "Dates + nut balls / protein balls" },
            
          ].map((item, idx) => (
            <div className="swap-card" key={idx}>
              <strong>{item.from}</strong> → <span>{item.to}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Skaylo</h3>
            <p>Decode food. Protect health. Eat smarter.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#facts">Food Facts</a></li>
              <li><a href="#swap">Swap Foods</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>Email: support@skaylo.com</li>
              <li>Instagram: @SkayloOfficial</li>
              <li>Twitter: @SkayloHealth</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Skaylo. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

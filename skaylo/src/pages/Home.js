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
      <nav className="navbar container mx-auto px-4 flex items-center justify-between">
        <div className="nav-logo cursor-pointer" onClick={() => navigate("/")}>
          Skaylo
        </div>
        <div className="nav-links flex items-center space-x-4">
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
      <section className="hero container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 mt-8" id="home">
        <div className="hero-left flex-1">
          <div className="slider-card">
            <img src={slides[index].img} alt="food awareness" className="w-full rounded-md" />
            <div className="fact-overlay">{slides[index].text}</div>
          </div>
        </div>

        <div className="hero-right flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold">
            Know what you eat.
            <br />
            <span>Instantly.</span>
          </h1>

          <p className="hero-desc mt-4 text-base md:text-lg">
            Skaylo helps you decode food labels that are intentionally confusing.
            Just search or scan a product to instantly see calories, sugar,
            burn-time, health risks, and who should avoid it.
          </p>

          <button className="hero-btn mt-6" onClick={handleScanClick}>
            Scan your food 🍽️
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="info-section container mx-auto px-4 mt-12" id="about">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">What is Skaylo?</h2>
        <p>
          Skaylo is a health awareness platform that breaks down confusing food
          labels into simple, honest insights. No marketing tricks. Just facts
          that help you make better food choices.
        </p>
        <p className="mt-2">
          The idea for Skaylo came from the need to decode misleading packaging
          and nutrition claims. Many products look “healthy” but are loaded with
          hidden sugar, sodium, and additives that affect long-term health.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Calories, sugar, and sodium content</li>
          <li>Health risks from ingredients</li>
          <li>Who should avoid specific foods</li>
          <li>Estimated calorie burn-time</li>
        </ul>
      </section>

      {/* FOOD FACTS */}
      <section className="info-section soft container mx-auto px-4 mt-12" id="facts">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Food Facts</h2>
        <ul className="list-disc list-inside space-y-1">
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
      <section className="info-section container mx-auto px-4 mt-12" id="swap">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Swap Foods</h2>
        <div className="swap-grid grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="swap-card p-4 border rounded-md" key={idx}>
              <strong>{item.from}</strong> → <span>{item.to}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer container mx-auto px-4 mt-12">
        <div className="footer-container flex flex-col md:flex-row justify-between gap-8">
          <div className="footer-section">
            <h3>Skaylo</h3>
            <p>Decode food. Protect health. Eat smarter.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#facts">Food Facts</a></li>
              <li><a href="#swap">Swap Foods</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="space-y-1">
              <li>Email: support@skaylo.com</li>
              <li>Instagram: @SkayloOfficial</li>
              <li>Twitter: @SkayloHealth</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom mt-6 text-center">
          <p>© 2025 Skaylo. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

// Home page that composes Header, Hero, Services, About, Contact, and Footer
import React from "react"; // Import React
import Header from "../components/Header"; // Import site header
import Hero from "../components/Hero"; // Import hero section
import ServiceCard from "../components/ServiceCard"; // Import service card component
import Footer from "../components/Footer"; // Import footer component

const Home = () => {
  // Array of services to display on the homepage
  const services = [
    { title: "Digital Banking", description: "Manage accounts, payments, and transfers easily online." },
    { title: "Loans & Credit", description: "Flexible loan options for personal and business needs." },
    { title: "Investments", description: "Tools and advisors to grow your wealth responsibly." },
    { title: "Insurance", description: "Comprehensive coverage to protect your assets." },
    { title: "Cards & Rewards", description: "Credit and debit cards with tailored rewards." },
    { title: "24/7 Support", description: "We are here to help whenever you need us." }
  ];

  return (
    <>
      <Header /> {/* Top navigation header */}
      <Hero /> {/* Hero / marketing section */}

      <section id="services" className="py-16 bg-white"> {/* Services section */}
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Responsive grid */}
            {services.map((s, idx) => <ServiceCard key={idx} title={s.title} description={s.description} />)} {/* Map services */}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-blue-50"> {/* About section */}
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">About Bankify</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">Bankify is a modern digital bank that blends secure technology with personalized service to help customers manage finances, access credit, and invest responsibly.</p>
        </div>
      </section>

      <section id="contact" className="py-16 bg-white"> {/* Contact section */}
        <div className="container max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Contact Us</h2>
          <form className="bg-blue-50 p-6 rounded-lg shadow-sm"> {/* Simple contact form */}
            <input className="w-full p-3 mb-3 border rounded" placeholder="Your name" />
            <input className="w-full p-3 mb-3 border rounded" placeholder="Email address" />
            <textarea className="w-full p-3 mb-3 border rounded" rows="4" placeholder="Message"></textarea>
            <div className="text-center">
              <button className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800">Send Message</button> {/* Submit */}
            </div>
          </form>
        </div>
      </section>

      <Footer /> {/* Footer */}
    </>
  );
};

export default Home; // Export Home page

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Destinations from './components/Destinations';
import Properties from './components/Properties';
import PropertyDetail from './components/PropertyDetail';
import PaymentConfirmation from './components/PaymentConfirmation';
import PaymentSuccess from './components/PaymentSuccess';
import SearchPage from './components/SearchPage';
import { properties } from './data/properties';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Destinations />
                <Properties />
              </>
            }
          />
          <Route
            path="/property/:id"
            element={<PropertyDetailWrapper />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/payment" element={<PaymentConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

function PropertyDetailWrapper() {
  const { id } = useParams();
  const property = properties.find(p => p.id === Number(id));

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Property not found</div>;
  }

  return <PropertyDetail property={property} />;
}

export default App;
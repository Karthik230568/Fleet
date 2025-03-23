import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <body>
    <div className="container">
        <h1>Terms and Conditions</h1>
        <section>
            <h2>1. User Agreement</h2>
            <p>By using the Fleet platform, the customer agrees to abide by all terms and conditions stated here.</p>
            <ul>
            <li>The customer must be at least 18 years old (or the legal driving age in their region) to rent a vehicle.</li>
            <li>A valid government-issued ID and driver’s license must be provided for verification.</li>
            </ul>
        </section>
        
        <section>
            <h2>2. Account Registration</h2>
            <ul>
            <li>Customers must register an account using a valid email ID and phone number.</li>
            <li>The platform reserves the right to suspend or terminate any account found to be engaging in fraudulent activities.</li>
            </ul>
        </section>
        
        <section>
            <h2>3. Vehicle Booking and Rental</h2>
            <ul>
            <li>All vehicle bookings must be made through the official platform.</li>
            <li>Customers must provide accurate information regarding rental dates, pickup, and return locations.</li>
            <li>Late returns may incur additional charges as per the pricing policy.</li>
            </ul>
        </section>
        
        <section>
            <h2>4. Payment and Refund Policy</h2>
            <ul>
            <li>Payments must be made through the secure payment gateway provided on the platform.</li>
            <li>A cancellation fee may be applied if the booking is canceled within a specified time.</li>
            <li>Refunds (if applicable) will be processed within 7-10 business days.</li>
            </ul>
        </section>
        
        <section>
            <h2>5. License and Documentation</h2>
            <ul>
            <li>Customers must possess a valid driver’s license when renting a vehicle without a driver.</li>
            <li>The platform and vehicle owners reserve the right to verify all documents before allowing rentals.</li>
            <li>If the customer is found driving without a valid license, the booking may be immediately canceled without a refund.</li>
            </ul>
        </section>
        
        <section>
            <h2>6. Vehicle Usage and Responsibilities</h2>
            <ul>
            <li>Customers are responsible for the vehicle during the rental period.</li>
            <li>Any damage, theft, or loss of the vehicle must be reported immediately, and the renter may be liable for repair costs.</li>
            <li>Vehicles must be returned in the same condition as received, with the agreed-upon fuel level.</li>
            </ul>
        </section>
        
        <section>
            <h2>7. Insurance and Liability</h2>
            <ul>
            <li>The customer must ensure the rented vehicle has valid insurance.</li>
            <li>The platform is not responsible for any accidents, fines, or legal violations committed by the customer while using the rented vehicle.</li>
            <li>In case of an accident, the renter must follow the insurance claim process outlined by the vehicle owner.</li>
            </ul>
        </section>
        
        <section>
            <h2>8. Prohibited Uses</h2>
            <ul>
            <li>Vehicles must not be used for illegal activities, racing, towing, or sub-renting.</li>
            <li>Customers cannot drive under the influence of alcohol or drugs.</li>
            <li>Any violation may lead to legal consequences and permanent account suspension.</li>
            </ul>
        </section>
        
        <section>
            <h2>9. Privacy and Data Protection</h2>
            <ul>
            <li>Personal information provided during registration and transactions will be stored securely and used only for service purposes.</li>
            <li>The platform complies with data protection laws to ensure user privacy.</li>
            </ul>
        </section>
        
        <section>
            <h2>10. Termination of Service</h2>
            <ul>
            <li>The platform reserves the right to terminate or suspend a customer's account if they violate these terms.</li>
            <li>Customers engaging in fraudulent bookings, misuse of vehicles, or false claims will be permanently banned.</li>
            </ul>
        </section>
        
        <div className="button-container">
            <button className="agree-button">I Agree</button>
            <button className="cancel-button">Cancel</button>
        </div>
        </div>
    </body>
  );
};

export default TermsAndConditions;
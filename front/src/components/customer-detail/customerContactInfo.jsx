import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

const CustomerContactInfo = ({ customer }) => {
  return (
    <div className="info-section">
      <h2>Contact Information</h2>

      <div className="info-card">
        <h3>Primary Contact</h3>
        <div className="contact-info">
          {customer.Phone && (
            <div className="contact-item">
              <FaPhone className="icon" />
              <a href={`tel:${customer.Phone}`}>{customer.Phone}</a>
            </div>
          )}

          {customer.Phone2 && (
            <div className="contact-item">
              <FaPhone className="icon" />
              <a href={`tel:${customer.Phone2}`}>{customer.Phone2}</a>
              <span className="label">Alternative</span>
            </div>
          )}

          {customer.Email && (
            <div className="contact-item">
              <FaEnvelope className="icon" />
              <a href={`mailto:${customer.Email}`}>{customer.Email}</a>
            </div>
          )}

          {customer.Website && (
            <div className="contact-item">
              <FaGlobe className="icon" />
              <a
                href={customer.Website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {customer.Website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="info-card">
        <h3>Address Information</h3>
        <div className="address-info">
          {customer.Address && (
            <div className="address-item">
              <h4>
                <FaMapMarkerAlt /> Billing Address
              </h4>
              <address>
                {customer.Address}
                {customer.City && (
                  <span>
                    <br />
                    {customer.City}
                  </span>
                )}
                {customer.Zipcode && <span>, {customer.Zipcode}</span>}
                {customer.Country && (
                  <span>
                    <br />
                    {customer.Country}
                  </span>
                )}
              </address>
            </div>
          )}

          {customer.DeliveryAddress && (
            <div className="address-item">
              <h4>
                <FaMapMarkerAlt /> Delivery Address
              </h4>
              <address>{customer.DeliveryAddress}</address>
            </div>
          )}
        </div>
      </div>

      {(customer.ContactPerson ||
        customer.ContactEmail ||
        customer.ContactPhone ||
        customer.ContactMobile) && (
        <div className="info-card">
          <h3>Contact Person</h3>
          <div className="contact-person">
            {customer.ContactPerson && (
              <div className="contact-person-item">
                <FaUser className="icon" />
                <span>{customer.ContactPerson}</span>
                {customer.JobPosition && (
                  <span className="job-title">{customer.JobPosition}</span>
                )}
              </div>
            )}

            {customer.ContactPhone && (
              <div className="contact-item">
                <FaPhone className="icon" />
                <a href={`tel:${customer.ContactPhone}`}>
                  {customer.ContactPhone}
                </a>
                <span className="label">Office</span>
              </div>
            )}

            {customer.ContactMobile && (
              <div className="contact-item">
                <FaPhone className="icon" />
                <a href={`tel:${customer.ContactMobile}`}>
                  {customer.ContactMobile}
                </a>
                <span className="label">Mobile</span>
              </div>
            )}

            {customer.ContactEmail && (
              <div className="contact-item">
                <FaEnvelope className="icon" />
                <a href={`mailto:${customer.ContactEmail}`}>
                  {customer.ContactEmail}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerContactInfo;

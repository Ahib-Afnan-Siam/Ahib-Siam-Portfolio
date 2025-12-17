const ContactResponse = ({ contactInfo }) => {
  return (
    <div className='max-w-4xl w-full'>
      {/* Contact Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-gray-600">Feel free to reach out to me through any of these channels</p>
      </div>
      
      {/* Contact Information Cards */}
      <div className="grid gap-6" style={{ 
        gridTemplateColumns: 'var(--contact-grid-columns, repeat(auto-fit, minmax(200px, 1fr)))',
        maxWidth: 'var(--contact-max-width, 100%)'
      }}>
        {contactInfo.map((contact, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-500"
            style={{ opacity: 1, transform: 'translateY(0)' }}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                {contact.icon === 'phone' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )}
                {contact.icon === 'email' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 01-2 2z" />
                  </svg>
                )}
                {contact.icon === 'linkedin' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{contact.label}</h3>
            </div>
            {contact.type === 'linkedin' ? (
              <a 
                href={contact.value} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-words"
                aria-label={`Visit my ${contact.label} profile`}
              >
                {contact.value}
              </a>
            ) : (
              <p className="text-gray-700 break-words">{contact.value}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-700 leading-relaxed">
          I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          Feel free to reach out!
        </p>
      </div>
    </div>
  );
};

export default ContactResponse;
import React from 'react';

const ResearchResponse = ({ researchWorks, blogs }) => {
  return (
    <div className='max-w-4xl w-full'>
      {/* Research Work Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Research Work And Blogs</h2>
        <p className="text-gray-600">Exploring the frontiers of AI, Machine Learning, and Software Engineering</p>
      </div>
      
      {/* Research Works Section */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Research Papers</h3>
        <div className="space-y-6">
          {researchWorks && researchWorks.length > 0 ? (
            researchWorks.map((research, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{research.title}</h4>
                <p className="text-gray-700 leading-relaxed">{research.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No research works available at the moment.</p>
          )}
        </div>
      </div>
      
      {/* Blogs Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Blog Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{blog.title}</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">{blog.description}</p>
                <a 
                  href={blog.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  aria-label={`Read blog: ${blog.title}`}
                >
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic col-span-2">No blog articles available at the moment.</p>
          )}
        </div>
      </div>
      
      {/* Closing Message */}
      <div className="mt-10 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-700 leading-relaxed">
          I'm passionate about sharing knowledge and insights on emerging technologies. 
          My research focuses on making AI more efficient and accessible, while my blogs 
          explore the latest trends and practical applications in the field.
        </p>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Would you like to know more about any specific research area or blog topic?
        </p>
      </div>
    </div>
  );
};

export default ResearchResponse;
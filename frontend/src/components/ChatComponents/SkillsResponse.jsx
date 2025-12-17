const SkillsResponse = ({ skillsCategories, ANIMATION_DELAYS }) => {
  return (
    <div className='max-w-4xl w-full'>
      {/* Skills Loading State - Apple-inspired minimalist waiting state */}
      {!skillsCategories.length ? (
        <div className="flex flex-col items-center justify-center py-16">
          {/* Blue speech bubble with question */}
          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md py-5 px-8 mb-8 shadow-lg">
            <p className="text-xl font-medium" style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 500
            }}>What are your skills?</p>
          </div>
          
          {/* Typing indicator - three-dot animation */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full" style={{ animationDelay: `${ANIMATION_DELAYS.TYPING_INDICATOR_DOT_1}ms` }}></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full" style={{ animationDelay: `${ANIMATION_DELAYS.TYPING_INDICATOR_DOT_2}ms` }}></div>
          </div>
          
          {/* Subtle hint text */}
          <p className="text-gray-500 mt-6 text-center max-w-md text-lg" style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            letterSpacing: '0.01em'
          }}>
            Steve Jobs is thoughtfully preparing his response...
          </p>
        </div>
      ) : (
        <>
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3" style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.03em'
            }}>Skills & Expertise</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Skills Categories - Apple-inspired layout with precise alignment */}
          <div className="space-y-10">
            {skillsCategories.map((category, catIndex) => (
              <div key={catIndex} style={{ 
                opacity: 1
              }}>
                {/* Category Header with icon - Apple-like precision */}
                <div className="flex items-center mb-5">
                  <span className="text-2xl mr-4" style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px'
                  }}>{category.icon}</span>
                  <h3 className="text-xl font-bold text-black" style={{ 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    marginLeft: '12px'
                  }}>{category.title}</h3>
                </div>
                
                {/* Skills Tags - Apple-inspired pill-shaped capsules with hover effect */}
                <div className="flex flex-wrap gap-3 pl-14">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-black text-white shadow-sm skill-tag"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 500,
                        letterSpacing: '0.01em',
                        minWidth: 'fit-content',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Competitive Programming Links - Apple-like buttons */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-black mb-5 text-center" style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              letterSpacing: '-0.01em'
            }}>Competitive Programming Profiles</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://leetcode.com/Ahib_Afnan_Siam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gray-900 hover:bg-black text-white font-medium py-3.5 px-7 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  fontWeight: 500,
                  letterSpacing: '0.01em'
                }}
                aria-label="View my LeetCode profile with 400+ solved problems"
              >
                <span className="mr-2.5 text-lg">💻</span>
                LeetCode Profile (400+ solved)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a 
                href="https://www.hackerrank.com/ahibafnan99" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 px-7 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  fontWeight: 500,
                  letterSpacing: '0.01em'
                }}
                aria-label="View my HackerRank profile with 100+ solved problems"
              >
                <span className="mr-2.5 text-lg">🏆</span>
                HackerRank Profile (100+ solved)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Closing Message - Apple-like typography */}
          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-lg" style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              lineHeight: '1.65',
              fontWeight: 400,
              letterSpacing: '0.01em'
            }}>
              These skills represent my core competencies and the tools I use to build innovative solutions. 
              With over 500 competitive programming problems solved, I've developed strong problem-solving 
              abilities and algorithmic thinking.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed max-w-2xl mx-auto text-lg" style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              lineHeight: '1.65',
              fontWeight: 400,
              letterSpacing: '0.01em'
            }}>
              What specific skills or technologies would you like to know more about?
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsResponse;
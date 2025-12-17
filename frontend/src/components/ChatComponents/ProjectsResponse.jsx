import pricewise from "@/assets/icons/pricewise.svg";
import threads from "@/assets/icons/threads.svg";
import car from "@/assets/icons/car.svg";
import snapgram from "@/assets/icons/snapgram.svg";
import estate from "@/assets/icons/estate.svg";
import summiz from "@/assets/icons/summiz.svg";
import football from "@/assets/icons/football.svg";
import player from "@/assets/icons/player.svg";
import eye from "@/assets/icons/eye.svg";
import uttoronLogo from "@/assets/images/uttoron-logo.png";

const ProjectsResponse = ({ projects, projectsDescription }) => {
  return (
    <div className='max-w-4xl w-full'>
      {/* Projects Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Projects</h2>
        <p className="text-gray-600">A curated showcase of my proudest innovations</p>
      </div>
      
      {/* Projects Grid - Apple-inspired cinematic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {projects.map((project, projIndex) => (
          <div 
            key={projIndex} 
            className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative"
            style={{ 
              opacity: 1, 
              '--project-card-min-height': 'var(--project-card-height, auto)'
            }}
          >
            {/* Card background with theme color - full card background */}
            <div className={`absolute inset-0 rounded-3xl ${project.theme} opacity-50`}></div>
            
            {/* Project Category Label - subtle, whispering context - positioned at top-left with precise alignment */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-xs font-medium tracking-widest text-gray-700 uppercase bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                {project.category || "Project"}
              </span>
            </div>
            
            {/* Project Title - bold yet unembellished, centered in upper third */}
            <div className="pt-16 pb-6 px-4 relative z-1">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight text-center">{project.name}</h3>
            </div>
            
            {/* Project Image Container - the true star of the composition with overlap effect */}
            <div className="px-6 pb-8 flex justify-center relative z-1">
              <div className="block-container w-32 h-32 -mb-6">
                <div className={`btn-back rounded-2xl ${project.theme}`} />
                <div className='btn-front rounded-2xl flex items-center justify-center'>
                  <img
                    src={
                      project.iconUrl === 'pricewise' ? pricewise :
                      project.iconUrl === 'threads' ? threads :
                      project.iconUrl === 'car' ? car :
                      project.iconUrl === 'snapgram' ? snapgram :
                      project.iconUrl === 'estate' ? estate :
                      project.iconUrl === 'summiz' ? summiz :
                      project.iconUrl === 'football' ? football :
                      project.iconUrl === 'player' ? player :
                      project.iconUrl === 'eye' ? eye :
                      project.iconUrl === 'uttoronLogo' ? uttoronLogo :
                      pricewise // fallback to pricewise if no match
                    }
                    alt={project.name}
                    className='w-16 h-16 object-contain'
                  />
                </div>
              </div>
            </div>
            
            {/* Project Description - understated yet informative */}
            <div className="px-6 pb-6 relative z-1">
              <p className="text-gray-700 text-sm text-center line-clamp-2">{project.description}</p>
            </div>
            
            {/* View Project Button - elegant call to action */}
            <div className="px-6 pb-6 flex justify-center relative z-1">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-800 hover:text-gray-900 font-medium text-sm bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full"
                aria-label={`View project: ${project.name}`}
              >
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-6">Want to see more of my work?</p>
        <a 
          href="https://github.com/Ahib-Afnan-Siam?tab=repositories" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md"
          aria-label="Explore all my projects on GitHub"
        >
          Explore All Projects
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Storytelling Description */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        {projectsDescription ? (
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {projectsDescription.split('\n\n').map((paragraph, paraIndex) => (
              <p key={paraIndex} className="mb-4 last:mb-0">
                {paragraph.split('**').map((part, i) => 
                  i % 2 === 1 ? <span key={i} className="font-semibold">{part}</span> : part
                )}
              </p>
            ))}
          </div>
        ) : (
          <>
            <p className="text-gray-700 mb-4 leading-relaxed">
              I'm proud of many projects that have shaped my journey as a software engineer, but the ones that stand out the most are those that pushed the boundaries of technology while solving real-world problems. Each project represents not just a technical achievement, but a step forward in making technology more accessible, intelligent, and impactful.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The <span className="font-semibold">PRAN-RFL AI Assistant – Uttoron</span> represents my most significant achievement, where I built a natural-language-to-SQL assistant using FastAPI, ChromaDB, and Oracle, integrating hybrid LLMs to enable intelligent enterprise data access and analytics. <span className="font-semibold">Drishty</span>, a facial recognition–based monitoring and attendance system for <span className="font-semibold">PRAN-RFL Group</span>, applied advanced computer vision and deep learning to deliver real-time multi-camera face recognition, secure access control, and automated attendance tracking, strengthening workplace security and operational efficiency. The <span className="font-semibold">MedSoServe Hospital Management System</span> was transformative in its comprehensive approach to digitizing healthcare workflows, improving hospital administration and enhancing patient care. The <span className="font-semibold">Car Price Prediction</span> project demonstrated the power of data-driven decision-making through machine learning–based market insights, while the <span className="font-semibold">Football Match Result Prediction</span> project explored predictive analytics in sports. Finally, the <span className="font-semibold">Space Invaders game</span> showcased my creativity and game development skills by delivering an engaging interactive experience.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you're curious about any specific project or would like to dive deeper into one of them, just let me know. What excites you the most about technology today?
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsResponse;
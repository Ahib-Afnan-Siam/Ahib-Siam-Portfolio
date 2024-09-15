import { Link } from "react-router-dom";
import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  return (
    <section className='max-container flex flex-col justify-between min-h-screen'>
      <div>
        <h1 className='head-text'>
          My{" "}
          <span className='blue-gradient_text drop-shadow font-semibold'>
            Projects
          </span>
        </h1>

        <p className='text-slate-500 mt-2 leading-relaxed'>
          I've embarked on numerous projects throughout the years, but these are
          the ones I hold closest to my heart. Many of them are open-source, so if
          you come across something that piques your interest, feel free to
          explore the codebase and contribute your ideas for further enhancements.
          Your collaboration is highly valued!
        </p>

        <div className='flex flex-wrap my-20 gap-16'>
          {projects.map((project) => (
            <div className='lg:w-[400px] w-full' key={project.name}>
              <div className='block-container w-12 h-12'>
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className='btn-front rounded-xl flex justify-center items-center'>
                  <img
                    src={project.iconUrl}
                    alt='project icon'
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>
              </div>

              <div className='mt-5 flex flex-col'>
                <h4 className='text-2xl font-poppins font-semibold'>
                  {project.name}
                </h4>
                <p className='mt-2 text-slate-500'>{project.description}</p>
                <div className='mt-5 flex items-center gap-2 font-poppins'>
                  <Link
                    to={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-semibold text-blue-600'
                  >
                    Live Link
                  </Link>
                  <img
                    src={arrow}
                    alt='arrow'
                    className='w-4 h-4 object-contain'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add the info-box div for 'Learn more' */}
      <div className='info-box mt-auto flex flex-col items-center justify-center'>
        <p className='font-medium sm:text-xl text-center'>
          Wanna explore some more exciting projects?
        </p>

        <Link to='https://github.com/Ahib-Afnan-Siam?tab=repositories' className='neo-brutalism-white neo-btn mt-5'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain ml-2' />
        </Link>
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;

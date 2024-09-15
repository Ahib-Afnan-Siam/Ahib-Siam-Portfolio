import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

import { CTA } from "../components";
import { experiences, skills, achievements, cvLink } from "../constants";

import "react-vertical-timeline-component/style.min.css";

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          Ahib Afnan Siam
        </span>{" "}
        👋
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          A software engineer currently completing an undergraduate degree in
          Computer Science and Engineering at BRAC University, specializing in
          Web Development (Front-End and Back-End), App Development, Game
          Development, and AI/Machine Learning through hands-on learning and
          application building.
        </p>
      </div>

      {/* Adding the Live Link for the CV */}
      <div className='mt-5 flex items-center gap-2 font-poppins'>
        <Link
          to={cvLink[0].link}
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-blue-600'
        >
          Live CV Link
        </Link>
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience.</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            I have had the opportunity to collaborate with leading organizations,
            where I enhanced my skills and worked alongside talented professionals. 
            Here’s a summary of my experience:
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {experience.title}
                  </h3>
                  <p
                    className='text-black-500 font-medium text-base'
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className='text-black-500/50 font-normal pl-1 text-sm'
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Personal Achievement.</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            Throughout my career, I have demonstrated a strong commitment to excellence,
            achieving notable milestones, including winning the NDECS Astronomy Competition
            and leading innovative AI-driven projects. These achievements reflect my passion
            for continuous learning and my ability to contribute to impactful outcomes.
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {achievements.map((achievement, index) => (
              <VerticalTimelineElement
                key={achievement.organization}
                date={achievement.date}
                iconStyle={{ background: achievement.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={achievement.icon}
                      alt={achievement.organization}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: achievement.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {achievement.title}
                  </h3>
                  <p
                    className='text-black-500 font-medium text-base'
                    style={{ margin: 0 }}
                  >
                    {achievement.organization}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {achievement.points.map((point, index) => (
                    <li
                      key={`achievement-point-${index}`}
                      className='text-black-500/50 font-normal pl-1 text-sm'
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <div className='info-box mt-auto flex flex-col items-center justify-center'>
        <p className='font-medium sm:text-xl text-center'>
          Wanna know more about me and my career?
        </p>

        <Link
          to='https://drive.google.com/file/d/1GTb98GpVdZ2MNO5oIik76fPtYi02Rheo/view?usp=drive_link'
          className='neo-brutalism-white neo-btn mt-5 flex items-center justify-center'
        >
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain ml-2' />
        </Link>
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default About;

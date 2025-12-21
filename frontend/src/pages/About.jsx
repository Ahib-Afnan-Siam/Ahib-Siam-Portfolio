import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { arrow } from "../assets/icons";

import { CTA } from "../components";
import { blogLink } from "../constants";
import { getApiBaseUrl } from "../utils/api"; 

// Import all icons
import {
  css,
  dart,
  django,
  dotnet,
  figma,
  flutter,
  git,
  github,
  html,
  java,
  javascript,
  Keras,
  linkedin,
  Matplotlib,
  mongodb,
  motion,
  mui,
  mysql,
  nextjs,
  nodejs,
  Numpy,
  opencv,
  opengl,
  Pandas,
  php3,
  player,
  python,
  PyTorch,
  react,
  redux,
  sass,
  scikit,
  send,
  tailwindcss,
  TensorFlow,
  typescript,
  unity,
  car,
  estate,
  pricewise,
  snapgram,
  summiz,
  threads,
  football
} from '../assets/icons';

// Import images
import {
  meta,
  shopify,
  starbucks,
  tesla,
  Turing,
  pi,
  bracu,
  craft,
  cerf1,
  cerf2,
  cerf3,
  hackerrank,
  ndesc,
  part,
  robu,
  win,
  pranrfl
} from '../assets/images';

import "react-vertical-timeline-component/style.min.css";

const About = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [extracurricularActivities, setExtracurricularActivities] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data in parallel
        const baseUrl = getApiBaseUrl();
        const [
          experiencesRes,
          skillsRes,
          achievementsRes,
          extracurricularActivitiesRes,
          certificatesRes
        ] = await Promise.all([
          fetch(`${baseUrl}/api/data/experiences`),
          fetch(`${baseUrl}/api/data/skills`),
          fetch(`${baseUrl}/api/data/achievements`),
          fetch(`${baseUrl}/api/data/extracurricular-activities`),
          fetch(`${baseUrl}/api/data/certificates`)
        ]);

        // Check if all responses are ok
        if (!experiencesRes.ok || !skillsRes.ok || !achievementsRes.ok || 
            !extracurricularActivitiesRes.ok || !certificatesRes.ok) {
          throw new Error('Failed to fetch data from server');
        }

        // Parse JSON data
        const experiencesData = await experiencesRes.json();
        const skillsData = await skillsRes.json();
        const achievementsData = await achievementsRes.json();
        const extracurricularActivitiesData = await extracurricularActivitiesRes.json();
        const certificatesData = await certificatesRes.json();

        // Set state with fetched data
        setExperiences(experiencesData);
        setSkills(skillsData);
        setAchievements(achievementsData);
        setExtracurricularActivities(extracurricularActivitiesData);
        setCertificates(certificatesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map icon names to actual icon components
  const iconMap = {
    css,
    dart,
    django,
    dotnet,
    figma,
    flutter,
    git,
    github,
    html,
    java,
    javascript,
    Keras,
    linkedin,
    Matplotlib,
    mongodb,
    motion,
    mui,
    mysql,
    nextjs,
    nodejs,
    Numpy,
    opencv,
    opengl,
    Pandas,
    php3,
    player,
    python,
    PyTorch,
    react,
    redux,
    sass,
    scikit,
    send,
    tailwindcss,
    TensorFlow,
    typescript,
    unity,
    car,
    estate,
    pricewise,
    snapgram,
    summiz,
    threads,
    football,
    Turing,
    pi,
    bracu,
    craft,
    part,
    win,
    ndesc,
    robu,
    hackerrank,
    cerf1,
    cerf2,
    cerf3
  };

  // Map image names to actual image components
  const imageMap = {
    meta,
    shopify,
    starbucks,
    tesla,
    Turing,
    pi,
    bracu,
    craft,
    cerf1,
    cerf2,
    cerf3,
    hackerrank,
    ndesc,
    part,
    robu,
    win,
    pranrfl
  };

  // Function to get icon by name
  const getIconByName = (iconName) => {
    return iconMap[iconName] || iconMap['github']; // fallback to github icon if not found
  };

  // Function to get image by name
  const getImageByName = (imageName) => {
    return imageMap[imageName] || imageMap['meta']; // fallback to meta image if not found
  };

  if (loading) {
    return (
      <section className='max-container'>
        <div className='flex justify-center items-center h-screen'>
          <div className='text-xl font-poppins'>Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='max-container'>
        <div className='flex justify-center items-center h-screen'>
          <div className='text-xl font-poppins text-red-500'>{error}</div>
        </div>
      </section>
    );
  }

  // Process skills data to include imageUrl
  const processedSkills = skills.map(skill => ({
    ...skill,
    imageUrl: getIconByName(skill.imageUrl)
  }));

  // Process experiences data to include icon
  const processedExperiences = experiences.map(experience => ({
    ...experience,
    icon: getImageByName(experience.icon)
  }));

  // Process achievements data to include icon
  const processedAchievements = achievements.map(achievement => ({
    ...achievement,
    icon: getIconByName(achievement.icon)
  }));

  // Process certificates data to include icon
  const processedCertificates = certificates.map(certificate => ({
    ...certificate,
    icon: getIconByName(certificate.icon)
  }));

  // Process extracurricular activities data to include icon
  const processedExtracurricularActivities = extracurricularActivities.map(activity => ({
    ...activity,
    icon: getIconByName(activity.icon)
  }));

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

      {/* Adding the Download CV Button */}
      <div className='mt-5 flex justify-center'>
        <a 
          href='/cv/Ahib_Afnan_mainCV.pdf' 
          download="Ahib_Afnan_Siam_CV.pdf"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 border-2 border-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download My CV
        </a>
      </div>

      {/* Updated Order - Skills first */}
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {processedSkills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                {/* Hover text (tooltip) with skill name */}
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  title={skill.name} 
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
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
            {processedExperiences.map((experience, index) => (
              <VerticalTimelineElement
                key={`${experience.company_name}-${index}`}
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

      {/* Achievements */}
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
            {processedAchievements.map((achievement, index) => (
              <VerticalTimelineElement
                key={`${achievement.organization}-${achievement.title}-${index}`}
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

      {/* Certificates */}
      <div className='py-16'>
        <h3 className='subhead-text'>Certificates.</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            I have earned various certificates that showcase my commitment to continuous learning 
            and development in different domains. Here are some notable certificates I have received:
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {processedCertificates.map((certificate, index) => (
              <VerticalTimelineElement
                key={`${certificate.organization}-${certificate.title}-${index}`}
                date={certificate.date}
                iconStyle={{ background: certificate.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={certificate.icon}
                      alt={certificate.organization}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: certificate.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {certificate.title}
                  </h3>
                  <p
                    className='text-black-500 font-medium text-base'
                    style={{ margin: 0 }}
                  >
                    {certificate.organization}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {certificate.points.map((point, index) => (
                    <li
                      key={`certificate-point-${index}`}
                      className='text-black-500/50 font-normal pl-1 text-sm'
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Add credential details */}
                {certificate.credentialId && (
                  <p className='text-black-500/50 font-normal text-sm'>
                    Credential ID: {certificate.credentialId}
                  </p>
                )}
                {certificate.credentialUrl && (
                  <p className='text-black-500 font-normal text-sm'>
                    <a
                      href={certificate.credentialUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600'
                    >
                      View Credential
                    </a>
                  </p>
                )}
                {certificate.skills && (
                  <p className='text-black-500/50 font-normal text-sm'>
                    Skills Gained: {certificate.skills.join(", ")}
                  </p>
                )}
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      {/* Extracurricular Activities */}
      <div className='py-16'>
        <h3 className='subhead-text'>Extracurricular Activities.</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            Alongside academics, I have been actively involved in various clubs and activities that enhanced my leadership and teamwork skills.
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {processedExtracurricularActivities.map((activity, index) => (
              <VerticalTimelineElement
                key={`${activity.organization}-${activity.title}-${index}`}
                date={activity.date}
                iconStyle={{ background: activity.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={activity.icon}
                      alt={activity.organization}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: activity.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {activity.title}
                  </h3>
                  <p
                    className='text-black-500 font-medium text-base'
                    style={{ margin: 0 }}
                  >
                    {activity.organization}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {activity.points.map((point, index) => (
                    <li
                      key={`activity-point-${index}`}
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

      <div className='info-box mt-auto flex flex-col items-center justify-center text-center'>
        <p className='font-medium sm:text-xl text-center'>
          Wanna read my blogs?
        </p>

        <Link
          to={blogLink[0].link}
          target="_blank"  // This will make the link open in a new tab
          rel="noopener noreferrer"  // This adds security to prevent reverse tabnabbing
          className='neo-brutalism-white neo-btn mt-5 flex items-center justify-center text-center'
          style={{ width: 'fit-content', padding: '0.5rem 0.5rem' }}
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
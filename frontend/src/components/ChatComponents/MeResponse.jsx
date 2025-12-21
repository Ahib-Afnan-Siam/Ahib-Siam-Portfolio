import ahibPortrait from "@/assets/images/ahib-portrait.png";

const MeResponse = () => (
  <div className="p-4">
    {/* Greeting */}
    <div className="mb-6">
      <p className="text-lg font-semibold">Hey, I'm Ahib 👋</p>
    </div>
    
    {/* Profile section with image and info */}
    <div className="flex flex-col items-start mb-6" style={{ flexDirection: 'var(--profile-flex-direction, column)', alignItems: 'var(--profile-align-items, center)' }}>
      {/* Profile Image */}
      <div className="mb-4 flex-shrink-0" style={{ marginBottom: 'var(--profile-image-mb, 1rem)', marginRight: 'var(--profile-image-mr, 0)' }}>
        <img 
          src={ahibPortrait}
          alt="Ahib Afnan Siam" 
          className="rounded-full object-cover border-4 border-blue-100"
          style={{ width: 'var(--profile-image-size, 8rem)', height: 'var(--profile-image-size, 8rem)' }}
        />
      </div>
      
      {/* Profile Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Ahib Afnan Siam</h2>
        <p className="text-gray-600 mb-1">AI Software Engineer</p>
        <p className="text-gray-500 mb-4">Bangladesh</p>
        
        <p className="text-gray-700 mb-4">AI Software Engineer at PRAN-RFL Group | Building RAG & NL→SQL Systems on Enterprise Data (Billions of Rows) | BRAC University | Top 5 (Worldwide) in Mission OZ 2022</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">AI</span>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Machine Learning</span>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Full-Stack</span>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Data Analytics</span>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Problem Solver</span>
        </div>
      </div>
    </div>
    
    {/* Extended Bio */}
    <div className="mb-6">
      <p className="text-gray-700 mb-4 leading-relaxed">
        I am an <span className="font-semibold">AI Software Engineer</span> passionate about developing intelligent systems that bridge <span className="font-semibold">large language models (LLMs)</span> and <span className="font-semibold">enterprise-scale data</span>. At <span className="font-semibold">PRAN-RFL Group</span>, I design and build <span className="font-semibold">Natural Language to SQL (NL→SQL)</span> assistants and <span className="font-semibold">schema-aware RAG (Retrieval-Augmented Generation)</span> pipelines that operate over <span className="font-semibold">billions of records</span>. My work integrates <span className="font-semibold">hybrid LLMs</span> — including <span className="font-semibold">DeepSeek</span>, <span className="font-semibold">Mistral</span>, and <span className="font-semibold">Llama 3.1</span> — through <span className="font-semibold">Ollama</span> and <span className="font-semibold">OpenRouter</span>, enabling real-time <span className="font-semibold">Oracle SQL</span> execution, reasoning, and data visualization. These solutions enhance operational efficiency by turning complex enterprise queries into conversational insights.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        I hold a <span className="font-semibold">Bachelor’s degree in Computer Science and Engineering</span> from <span className="font-semibold">BRAC University</span>, where I built a strong foundation in <span className="font-semibold">backend systems</span>, <span className="font-semibold">data management</span>, and <span className="font-semibold">AI engineering</span>. My hands-on experience with <span className="font-semibold">FastAPI</span>, <span className="font-semibold">React</span>, <span className="font-semibold">ChromaDB</span>, and <span className="font-semibold">Oracle</span> allows me to deliver production-grade AI systems like the <span className="font-semibold">PRAN-RFL AI Assistant (Uttaran)</span> and <span className="font-semibold">Renata PLC Analytics Dashboard</span>. Beyond development, I continuously strengthen my problem-solving skills — solving <span className="font-semibold">400+ challenges on LeetCode</span> and <span className="font-semibold">100+ on HackerRank</span> to refine my algorithmic thinking.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Recognized among the <span className="font-semibold">Top 5 worldwide in Mission OZ 2022</span> and a <span className="font-semibold">winner at Mind Sparks 2023</span>, I am driven by the vision of making <span className="font-semibold">enterprise data accessible</span> through natural interaction. I thrive on blending <span className="font-semibold">engineering precision</span> with <span className="font-semibold">creative AI design</span>, building systems that make data <span className="font-semibold">intelligent</span>, <span className="font-semibold">explainable</span>, and <span className="font-semibold">impactful</span>.
      </p>
      <p className="text-gray-700 leading-relaxed">
        What aspects of AI development or software engineering interest you most? I'd love to discuss how these technologies are shaping the future of work and innovation.
      </p>
    </div>
    
    {/* Download CV Button */}
    <div className="flex justify-center mt-6">
      <a 
        href="/cv/Ahib_Afnan_mainCV.pdf" 
        download="Ahib_Afnan_Siam_CV.pdf"
        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download My CV
      </a>
    </div>
  </div>
);

export default MeResponse;
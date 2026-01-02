'use client'

export default function Index() {
  return (
    <section
      id='about'
      className='relative z-20 min-h-screen bg-[#141516] px-8 py-24 text-[#E6E6E2]'
    >
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2'>
        {/* LEFT SIDE */}
        <div className='flex items-center'>
          <h1 className='text-[12vw] leading-[0.95] font-extrabold tracking-tight lg:text-[7rem]'>
            DEVELOPER
            <br />
            DESIGNER
            <br />
            CREATOR/
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex flex-col justify-center'>
          <h2 className='mb-12 text-6xl font-bold tracking-tight'>Skills</h2>

          <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
            {/* Languages & Tools */}
            <div>
              <h3 className='mb-6 text-lg font-semibold text-[#BFBFB9]'>
                Languages & Tools
              </h3>
              <ul className='space-y-2 text-sm text-[#9E9E99]'>
                <li>Python</li>
                <li>SQL</li>
                <li>C++</li>
                <li>Java</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>Git</li>
                <li>Postman</li>
                <li>Docker</li>
                <li>Firebase</li>
              </ul>
            </div>

            {/* Frameworks & Libraries */}
            <div>
              <h3 className='mb-6 text-lg font-semibold text-[#BFBFB9]'>
                Frameworks & Libraries
              </h3>
              <ul className='space-y-2 text-sm text-[#9E9E99]'>
                <li>React</li>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>Flask</li>
                <li>Bootstrap</li>
                <li>jQuery</li>
                <li>TailwindCSS</li>
                <li>Framer Motion</li>
                <li>GSAP</li>
              </ul>
            </div>

            {/* Core CS Concepts */}
            <div>
              <h3 className='mb-6 text-lg font-semibold text-[#BFBFB9]'>
                Core CS Concepts
              </h3>
              <ul className='space-y-2 text-sm text-[#9E9E99]'>
                <li>DSA</li>
                <li>DBMS</li>
                <li>OOP</li>
                <li>Operating Systems</li>
                <li>System Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* eslint-disable react/no-unescaped-entities */


const WhoWeAreSection = () => {
  return (
    <div className="w-full space-y-6 max-w-5xl px-4 mx-auto text-center md:text-left">
      {/* MISSION & VISION Title*/}
      <h1 className="text-4xl md:text-5xl lg:text-7xl  fade-up  font(var(--font-redhat)) font-bold text-balance">
        Who We Are?
      </h1>

      {/* About */}
      <div className="space-y-6">
        <ul className="fade-up">
          <p className="text-justify hyphens-auto">
            At Algorim, we are architects of the digital future. Our name is
            inspired by "algorithm" a testament to our core belief in creating
            logical, efficient, and powerful solutions to complex business
            challenges. We were founded on a simple premise: that access to
            elite technology talent shouldn't be limited by geography or budget.
            We provide fully engineered teams with expertise equivalent to the
            top talent in Silicon Valley. These are not individual freelancers;
            they are cohesive, managed units that integrate directly with your
            company. They operate in your timezone, ensuring real-time
            collaboration and communication. All of this is delivered at a
            reasonable and transparent cost, giving you an unparalleled return
            on your technology investment.
          </p>
        </ul>
      </div>

      {/* MISSION & VISION Explained*/}
      <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
          Mission-Driven & Visionary
        </h1>
        <div className="space-y-3 text-left ">
          <ul className="fade-up">
            <p className="text-2xl font-bold">Mission</p>
            <p className="text-justify hyphens-auto max-w-2xl">
              To democratize access to elite technology talent, empowering
              businesses worldwide to build secure, intelligent, and
              decentralized solutions without the Silicon Valley price tag. We
              bridge the gap between brilliant ideas and world-class execution.
            </p>
          </ul>
          <ul className="fade-up">
            <p className="text-2xl font-bold">Vision</p>
            <p className="text-justify hyphens-auto max-w-2xl">
              To be the world's most trusted partner for applied innovation,
              creating a future where any company from ambitious startups to
              established enterprises can harness the power of AI, Web3, and
              secure development to build what's next.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAreSection;

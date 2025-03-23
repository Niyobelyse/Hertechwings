function HomeSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        
        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img 
            src="images/g1.png" 
            className="rounded-lg w-full sm:mt-12 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full"
            alt="HerTechWings"
          />
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 lg:ml-12 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Empowering Women in Tech with{" "}
            <span className="text-[#ff69b4]">HerTechWings</span>
          </h1>
          <p className="mt-4 text-black text-base sm:text-lg">
            Join a community dedicated to fostering{" "}
            <span className="font-semibold">innovation, collaboration, and growth</span> 
            for women in technology. At HerTechWings, we provide{" "}
            <span className="font-semibold">resources, mentorship, and opportunities</span> 
            to help you soar in the tech industry.
          </p>

      
          <div className="mt-6">
            <button className="bg-[#ff69b4] text-white px-6 py-3 rounded-lg mb-4 font-medium shadow-md hover:bg-pink-500 transition">
              Join Our Community
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HomeSection;

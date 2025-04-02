export default function JoinSection() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-16 h-1.5 bg-gradient-to-r from-transparent to-[#ff69b4]"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#ff69b4] tracking-wide">JOIN HERTECHWINGS</h2>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            Become a part of HerTechWings, a thriving community empowering women in tech! We offer mentorship, skill
            development programs, and career opportunities to help you excel in the tech industry. Whether you're
            looking to upskill, find mentorship, or connect with like-minded women, we've got you covered!
          </p>

          <div className="pt-4">
            <button className="flex items-center border-2 border-[#ff69b4] text-[#ff69b4] hover:bg-pink-50 rounded px-8 py-6 text-base font-medium">
              JOIN US TODAY
              <svg
                className="ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 17l5-5-5-5v10z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="aspect-video w-full h-full rounded-md overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_LINK_HERE"
            title="HerTechWings: Empowering Women in Tech"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

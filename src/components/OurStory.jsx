export default function HertechwingsStory() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#ff69b4]">
            The Story Behind
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-black">
            "HerTechWings"
          </h3>
          <p className="text-gray-800 text-lg">
            Our name, HerTechWings, is inspired by three words; "Her", which
            symbolizing empowerment and the drive to solve pressing issues.
            "Tech" which is representing Information Technology (IT), which
            serves as the core of the skills we aim to teach.
            "Wings",epresenting Africa, the continent where we are based, aiming
            to give the youth the wings to rise and transform their communities
            through technology. We are equipping the youth with the skills they
            need to solve Information Technology challenges across Africa, one
            innovation at a time.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="rounded-[40px] overflow-hidden">
            <img
              src="images/girls.webp"
              alt="SOLVIT AFRICA team members with medals"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

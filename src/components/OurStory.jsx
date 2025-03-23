export default function HertechwingsStory() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#ff69b4]">The Story Behind</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-black">"HerTechWings"</h3>
          <p className="text-gray-800 text-lg">
            Our name, HerTechWings, is inspired by three words; "Her", which has a literal meaning of fixing an issue
            or solving a problem, "Tech" which is a common abbreviation for Information Technology, but also reads as
            'it', and lastly "Wings", the continent where we are based. We're equipping the youth with the skills they
            need to solve information technology problems for the African continent.
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
  )
}


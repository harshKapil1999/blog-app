

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center">
      <div className=" w-full p-16  py-24 md:py-20 lg:py-32 bg-red-50 order-last md:order-first">
        <img 
          src="https://res.cloudinary.com/dftj1zpln/image/upload/v1709103719/portfolio/pictures/photo_harsh_nojv5y.jpg" 
          alt="about" 
        />
      </div>
      <div className=" w-full p-16 py-6 md:py-10 justify-start mb-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl py-3">Hi! I&apos;m Harsh,</h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl py-2">A Full Stack Web Developer & Athlete</h2>
        <p className="text-sm lg:text-base py-1">I&apos;ve been interested in science and technology since I was a young child, so I plan to graduate with a bachelor&apos;s degree in science in 2020. I then opted to pursue my master&apos;s in Master of Computer Applications and began learning coding and full stack development because I found web development to be a very intriguing and in-demand career option. I am skilled at creating web applications using the well-known React/Nextjs, MERN Stack and Javascript development technologies.</p>
        <p className="text-sm lg:text-base py-1">Possessing a strong skill set in web development, I am driven by a relentless pursuit of technical excellence and a commitment to staying at the forefront of industry innovations. Seeking a challenging position that not only leverages my technical and analytical expertise but also offers the opportunity to continually expand and refine my skill set and knowledge base. </p>
      </div>
    </div>
  )
}

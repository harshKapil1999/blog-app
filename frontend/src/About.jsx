

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center">
      <div className=" w-full p-16  py-24 md:py-20 lg:py-32 bg-red-50 order-last md:order-first">
        <img 
          src="https://images.pexels.com/photos/10335360/pexels-photo-10335360.jpeg" 
          alt="about" 
        />
      </div>
      <div className=" w-full p-16 py-6 md:py-10 justify-start mb-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl py-3">Hi! I&apos;m Dena,</h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl py-2">A mental health advocate & blogger</h2>
        <p className="text-sm lg:text-base py-1">I&apos;m a paragraph. Click here to add your own text and edit me. It&apos;s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p>
        <p className="text-sm lg:text-base py-1">This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are. </p>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        We are dedicated to providing accessible and engaging learning
        experiences for everyone. Our mission is to empower individuals through
        knowledge and skills.
      </p>
      <img
        src="https://picsum.photos/600/400?random=2"
        alt="About Us"
        className="mt-6 rounded-lg shadow-lg"
      />
    </div>
  );
}

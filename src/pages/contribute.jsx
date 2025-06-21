import React from "react";
import NavBar from "../components/navBar";

export default function ContributionForm() {
  const handleGoogleFormRedirect = () => {
    // Replace this URL with your actual Google Form URL for blog contributions
    const googleFormURL = "https://forms.gle/VxogJUGYswhsDd5w7";
    window.open(googleFormURL, "_blank");
  };

  const handleFeedbackFormRedirect = () => {
    // Replace this URL with your actual Google Form URL for feedback
    const feedbackFormURL = "https://forms.gle/PUqXs71ZSUSjV8pq7";
    window.open(feedbackFormURL, "_blank");
  };

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto bg-white/80 p-6 rounded-xl shadow-lg mt-30">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ✍️ Contribute a Post or Share Feedback
        </h2>

        <p className="mb-4 text-md text-gray-700 text-start">
          We welcome contributions from teachers, students, and enthusiasts! You
          can help others by sharing your notes, guides, or educational content.
          <br />
          <br />
          To keep everything safe and well-organized, we collect contributions
          through a quick and easy Google Form. Once submitted, we review and
          publish your post to the site. To maintain security and ensure
          quality, we manually review and publish submitted posts. <br />
          <br />
          If you'd like to contribute a blog post or share an idea, click the
          appropriate button below and fill out the linked Google Form.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            onClick={handleGoogleFormRedirect}
          >
            Contribute a Blog Post
          </button>

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={handleFeedbackFormRedirect}
          >
            Share Feedback / Suggestions
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-600 text-center">
          Your input helps us grow and improve. Thank you for supporting our
          community of learners!
        </p>
        <p className="mt-6 text-xs text-gray-600 text-center px-4">
          You can also email us if you face any issues:{" "}
          <a
            href="mailto:drukyultechies@gmail.com"
            className="text-blue-600 underline"
          >
            drukyultechies@gmail.com
          </a>
        </p>
      </div>
    </>
  );
}

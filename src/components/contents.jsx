import FadeInSection from "./effects/FadeInSection"; // adjust path
import Stepper, { Step } from "./effects/bitsComponents/stepper";
import { useState } from "react";

export default function Contents() {
  const [name, setName] = useState("");

  return (
    <>
      {/* Section 1 - Text Left, Graphic Right (slide from left) */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 md:p-10">
        <FadeInSection direction="left">
          <div>
            <h1 className="text-3xl text-white font-bold">
              Learning that is accessible to all
            </h1>
            <p className="text-gray-300 mt-5 text-lg">
              Education should never be limited by location, background, or
              resources. Our platform is dedicated to providing clear, concise,
              and comprehensive study notes and articles that are freely
              accessible to every student. Whether you’re in class 10, preparing
              for higher studies, or diving into computer science at the
              graduate level, our content is designed to empower you to learn
              anytime, anywhere—because knowledge belongs to everyone.
            </p>
          </div>
        </FadeInSection>
        <div className="flex justify-center">
          <FadeInSection direction="right" delay={0.2}>
            <img
              src="https://picsum.photos/400/300?random=1"
              alt="Learning Illustration"
              className="rounded-xl shadow-lg"
            />
          </FadeInSection>
        </div>
      </div>

      {/* Section 2 - Graphic Left, Text Right (slide from right) */}
      <FadeInSection direction="right" delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 md:p-10">
          <div className="flex justify-center md:order-1">
            <Stepper
              initialStep={1}
              onStepChange={(step) => {
                console.log(step);
              }}
              onFinalStepCompleted={() => console.log("All steps completed!")}
              backButtonText="Previous"
              nextButtonText="Next"
            >
              <Step>
                <h2>Welcome to the React Bits stepper!</h2>
                <p>Check out the next step!</p>
              </Step>
              <Step>
                <h2>Step 2</h2>
                <img
                  style={{
                    height: "100px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center -70px",
                    borderRadius: "15px",
                    marginTop: "1em",
                  }}
                  src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
                />
                <p>Custom step content!</p>
              </Step>
              <Step>
                <h2>How about an input?</h2>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name?"
                />
              </Step>
              <Step>
                <h2>Final Step</h2>
                <p>You made it!</p>
              </Step>
            </Stepper>
          </div>
          <div className="md:order-2">
            <h1 className="text-3xl text-white font-bold">
              How to use the Site
            </h1>
            <p className="text-gray-300 mt-5 text-lg">
              Start by selecting your course or subject, then dive into expertly
              crafted notes and articles designed to reinforce your
              understanding. Our intuitive layout helps you quickly find the
              topics you need, with updates and new content added regularly to
              keep your knowledge fresh and relevant.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* Section 3 - Text Left, Graphic Right (slide from left again) */}
      <FadeInSection direction="left" delay={0.4}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 p-4 md:p-10">
          <div>
            <h1 className="text-3xl text-white font-bold">
              Contribute to the Subject
            </h1>
            <p className="text-gray-300 mt-5 text-lg">
              We believe education is a collaborative effort. If you’re an
              educator, student, or subject enthusiast, we warmly invite you to
              share your insights, notes, or articles. By contributing, you help
              build a vibrant community of learners and educators, enriching the
              platform with diverse perspectives and knowledge that benefit
              everyone.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://picsum.photos/400/300?random=3"
              alt="Contribution Illustration"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </FadeInSection>
    </>
  );
}

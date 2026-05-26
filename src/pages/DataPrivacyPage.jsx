import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function DataPrivacyPage() {
  return (
    <div className="bg-background-main text-text-high font-primary flex min-h-screen w-full flex-col overflow-hidden">
      <main
        id="data-privacy"
        className="relative flex flex-grow justify-center px-10 py-20"
      >
        {/* Background glow similar to About section */}
        <div className="bg-brand-primary pointer-events-none absolute top-1/4 -left-1/4 h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]"></div>

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <div className="mb-12">
            <p className="text-brand-light mb-4 text-sm font-medium tracking-widest uppercase">
              Legal
            </p>
            <h1 className="text-text-high mb-8 text-4xl leading-tight font-bold md:text-5xl">
              Data Privacy Policy
            </h1>

            <div className="text-text-medium space-y-6 text-base leading-relaxed md:text-lg">
              <p>
                The Algerian Developer Survey collects only the data necessary
                to operate this project. When you sign in via Google or GitHub,
                we collect your display name, profile picture, and email
                address. Your username (Google or GitHub) is used solely to
                prevent duplicate submissions — no passwords are ever accessed
                or stored. Your email address is used only to notify you when
                the results page is published, it will not be used for any other
                purpose.
              </p>
              <p>
                Survey responses cover demographics, career information, tech
                stack, and opinions about the Algerian developer landscape. This
                data is collected for academic purposes as part of a
                second-semester university project, and to identify trends and
                technologies currently in use by Algerian developers.
              </p>
              <p>
                Your data is never sold, shared, or disclosed to any third
                party. It is stored securely on Supabase infrastructure. By
                participating in this survey, you consent to the collection and
                use of your data as described above.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DataPrivacyPage;

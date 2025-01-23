import LoginForm from "./LoginForm";

const AuthenticationPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div
        className="
        hidden lg:flex 
        w-[35%] flex-col bg-[#046FFB] p-12 pt-16 text-white
        motion-preset-slide-right-lg motion-duration-2000 
      "
      >
        <div className="mb-24 ">
          {/* Logo placeholder */}
          <h1 className="text-2xl font-bold motion-preset-fade motion-duration-2000 motion-delay-500">Company Name</h1>
        </div>
        <div>
          <h2 className="mb-8 text-5xl font-bold leading-[0.5] motion-opacity-in-0 -motion-translate-x-in-25 motion-duration-[.8s] motion-blur-in-lg motion-delay-[0.8s]">
            Let's setup your
          </h2>
          <h2 className="mb-8 text-5xl font-bold leading-[0.5] motion-opacity-in-0 -motion-translate-x-in-25 motion-duration-[.8s] motion-blur-in-lg motion-delay-[1s]">
            Operating
          </h2>
          <h2 className="mb-8 text-5xl font-bold leading-[0.5] motion-opacity-in-0 -motion-translate-x-in-25 motion-duration-[.8s] motion-blur-in-lg motion-delay-[1.2s]">
            Agreement
          </h2>
          <p className="text-base leading-relaxed motion-preset-fade motion-duration-2000 motion-delay-[1s]">
            All-in-one solution to fix your business in the state. Form a new company from scratch or onboard your existing US company
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthenticationPage;

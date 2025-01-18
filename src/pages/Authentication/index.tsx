const AuthenticationPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div
        className="
        hidden lg:flex 
        w-[35%] flex-col bg-blue-600 p-12 pt-16 text-white
      "
      >
        <div className="mb-24 -ml-4">
          {/* Logo placeholder */}
          <h1 className="text-2xl font-bold">Company Name</h1>
        </div>
        <div>
          <h2 className="mb-8 text-5xl font-bold leading-tight">Let's setup your Operating Agreement</h2>
          <p className="text-base leading-relaxed opacity-90">
            All-in-one solution to fix your business in the state. Form a new company from scratch or onboard your existing US company
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-4xl">Test Content</div>
      </div>
    </div>
  );
};

export default AuthenticationPage;

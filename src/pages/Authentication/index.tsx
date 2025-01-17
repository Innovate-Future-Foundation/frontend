const AuthenticationPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-[40%] flex-col bg-blue-600 p-8 text-white">
        <div className="mb-8">
          {/* Logo placeholder */}
          <h1 className="text-2xl font-bold">Company Name</h1>
        </div>
        <div>
          <h2 className="mb-4 text-4xl font-bold leading-tight">Let's setup your Operating Agreement</h2>
          <p className="text-base leading-relaxed opacity-90">
            All-in-one solution to fix your business in the state. Form a new company from scratch or onboard your existing US company
          </p>
        </div>
      </div>
      <div className="flex w-[60%] bg-white">{/* Login component will be added here later */}</div>
    </div>
  );
};

export default AuthenticationPage;

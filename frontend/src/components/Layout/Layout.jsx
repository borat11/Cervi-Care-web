const Layout = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-accent">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-secondary">
      <h1 className="text-2xl font-bold text-center text-primary mb-6">
        Cervical Cancer Diagnosis Portal
      </h1>
      {children}
    </div>
  </div>
);
export default Layout;

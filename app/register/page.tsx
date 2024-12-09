import ClientForm from "@/components/forms/ClientForm";

const RegisterPage = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="max-w-[496px] sub-container">
          <ClientForm />
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;

import React from "react";
import MultiStepForm from "../components/MultiStepForm";

const CreateAccount = () => {
  return (
    <div className="p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default CreateAccount;
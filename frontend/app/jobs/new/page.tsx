// Job form component
import JobForm from "@/components/JobForm";

// Displays form for posting a service request
export default function NewJobPage() {
  return (
    // Container for the form with a heading and description
    <div className="w-full max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-7 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Post a Service Request
        </h1>
        {/* Page Description */}
        <p className="text-base text-gray-500 mt-2">
          Fill in the details below and tradespeople in your area will be able to browse your request.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white/85 backdrop-blur p-6 sm:p-8 shadow-sm">
        {/* Job Form */}
        <JobForm />
      </div>
    </div>
  );
}
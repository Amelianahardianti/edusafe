"use client";

export default function FormContainer({ title, fields, onSubmit }) {
  return (
    <section className="bg-gray-50 font-sans p-4 sm:p-8 flex justify-center items-center min-h-screen w-full">
      <div className="w-full max-w-5xl bg-white border-[3px] border-black/10 rounded-[32px] py-[37px] px-4 sm:px-[43px]">
        <div className="flex flex-col gap-10">
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#2B2F32]">
            {title}
          </h1>

          <form onSubmit={onSubmit} className="flex flex-col gap-11">

            <div className="flex flex-col gap-6">
              {fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label
                    htmlFor={field.id}
                    className="text-xs text-[#5E6366] font-normal px-1"
                  >
                    {field.label}
                  </label>

                  {field.type === "text" && (
                    <div className="bg-[#EFF1F9]/60 rounded-lg px-4 py-3">
                      <input
                        id={field.id}
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full bg-transparent text-base text-gray-800 placeholder:text-[#ABAFB1] focus:outline-none"
                      />
                    </div>
                  )}

                  {field.type === "select" && (
                    <div className="relative">
                      <select
                        id={field.id}
                        className="w-full appearance-none bg-[#EFF1F9]/60 rounded-lg px-4 py-3 text-base text-[#ABAFB1] focus:outline-none cursor-pointer"
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                        <img
                          src="/assets/svg/chevron-down.svg"
                          className="w-6 h-6"
                        />
                      </div>
                    </div>
                  )}

                  {field.type === "textarea" && (
                    <div className="bg-[#EFF1F9]/60 rounded-lg px-4 py-3">
                      <textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        rows={field.rows || 2}
                        className="w-full bg-transparent text-base text-gray-800 placeholder:text-[#ABAFB1] focus:outline-none resize-y"
                      />
                    </div>
                  )}

                  {field.type === "number" && (
                  <div className="bg-[#EFF1F9]/60 rounded-lg px-4 py-3">
                    <input
                      type="number"
                      id={field.id}
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      className="w-full bg-transparent text-base text-gray-800 placeholder:text-[#ABAFB1] focus:outline-none"
                    />
                  </div>
                )}

                  {field.type === "date" && (
                    <input
                        type="date"
                        id={field.id}
                        className="w-full bg-[#EFF1F9]/60 rounded-lg px-4 py-3 text-base text-gray-800 focus:outline-none"
                    />
                    )}

                  {field.type === "time" && (
                    <input
                        type="time"
                        id={field.id}
                        className="w-full bg-[#EFF1F9]/60 rounded-lg px-4 py-3 text-base text-gray-800 focus:outline-none"
                    />
                    )}

                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full sm:w-[375px] self-start bg-[#608FC2] text-white font-bold text-base rounded-xl py-[17px] flex items-center justify-center gap-2.5 hover:bg-opacity-90 transition-colors"
            >
              <span>Konfirmasi</span>
              <img src="/assets/svg/Check.svg" className="w-[17px] h-[17px]" />
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

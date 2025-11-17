"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormContainer from "../../components/userPage/FormContainer";
import { apiFetch } from "@/lib/api";
import Navbar from "../../components/userPage/NavbarDesktop";

export default function CreateClassPage(){
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fields = [
    {
      id: "name",
      label: "Nama Kelas",
      type: "text",
      placeholder: "contoh : 1A",
    },
    {
      id: "grade",
      label: "Tingkat (angka)",
      type: "number",
      placeholder: "contoh : 1",
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: "schoolyear",          
      label: "Tahun Ajaran",
      type: "text",
      placeholder: "contoh : 2025/2026",
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name.value,
      grade: Number(form.grade.value),
      schoolYear: form.schoolyear.value,
    };

    if (!payload.name || !payload.schoolYear || !payload.grade) {
      setError("Nama, tingkat, dan tahun ajaran wajib diisi");
      setSuccess("");
      return;
    }

    try {
      setError("");
      await apiFetch("/api/classes", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccess("Kelas berhasil dibuat");
      router.push("/daftarkelas");
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal membuat kelas");
      setSuccess("");
    }
  }

    return (
        <div className="flex flex-col items-center mt-[10vh]">
      
      <FormContainer
      tittle="Input Kelas Baru"
       fields={fields} 
        onSubmit={handleSubmit}
        error={error}
        success={success}
      />
    </div>
      );
}

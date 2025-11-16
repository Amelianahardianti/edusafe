// File: /app/edit-parent/page.js
"use client";
import React from "react";
import FormContainer from "../../components/userPage/FormContainer";

export default function Page() {
  const parentFields = [
    { id: "parentName", label: "Nama Wali", type: "text", placeholder: "Select" },
    { id: "childName", label: "Nama Anak / Murid", type: "text", placeholder: "Select" },
    { id: "email", label: "Email", type: "text", placeholder: "Select" },
    { id: "password", label: "Password", type: "password", placeholder: "Select" },
    {
      id: "schoolYear",
      label: "School year",
      type: "select",
      options: [
        { value: "2022/2023", label: "2022/2023" },
        { value: "2023/2024", label: "2023/2024" },
        { value: "2024/2025", label: "2024/2025" },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {};
    parentFields.forEach((f) => {
      const el = document.getElementById(f.id);
      values[f.id] = el ? el.value : null;
    });
    // replace with API call as needed
    console.log("Parent form submitted:", values);
  };

  return <FormContainer title="Edit Akun Orang Tua" fields={parentFields} onSubmit={handleSubmit} />;
}


// File: /app/edit-teacher/page.js


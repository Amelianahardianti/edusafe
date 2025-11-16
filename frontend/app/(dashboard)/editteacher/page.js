"use client";
import React from "react";
import FormContainer from "../../components/userPage/FormContainer";

export default function Page() {
  const teacherFields = [
    { id: "teacherName", label: "Nama", type: "text", placeholder: "Select" },
    { id: "teacherEmail", label: "Email", type: "text", placeholder: "Select" },
    { id: "teacherPassword", label: "Password", type: "password", placeholder: "Select" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {};
    teacherFields.forEach((f) => {
      const el = document.getElementById(f.id);
      values[f.id] = el ? el.value : null;
    });
    // replace with API call as needed
    console.log("Teacher form submitted:", values);
  };

  return <FormContainer title="Edit Akun Guru" fields={teacherFields} onSubmit={handleSubmit} />;
}

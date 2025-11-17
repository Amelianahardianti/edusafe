"use client";

import { useState, useEffect } from "react";
import FormContainer from "../../components/userPage/FormContainer";
import Image from "next/image";

export default function CreateAccount() {
  const [selectedRole, setSelectedRole] = useState("");

  // field dasar (tanpa role & field anak)
  const baseFields = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "isi nama lengkap",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
      placeholder: "john.doe@gmail.com",
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      type: "text",
      placeholder: "+62 123456789",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "********",
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "********",
    },
  ];

  // field tambahan khusus orang tua
  const parentExtraFields = [
    {
      id: "childClass",
      label: "Child Class",
      type: "select",
      options: [
        { value: "Abesar", label: "Abesar" },
        { value: "Akecil", label: "Akecil" },
        { value: "Bbesar", label: "Bbesar" },
        { value: "Bkecil", label: "Bkecil" },
      ],
    },
    {
      id: "childName",
      label: "Child Name",
      type: "text",
      placeholder: "isi nama lengkap anak",
    },
    {
      id: "childBirthDate",
      label: "Child Birth Date",
      type: "date",
    },
  ];

  // role field SELALU ada dan dirender di DALAM FormContainer
  const fields = [
    {
      id: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "teacher", label: "Guru" },
        { value: "parent", label: "Orang Tua" },
      ],
    },
    ...(selectedRole === "parent" ? parentExtraFields : []),
    ...baseFields,
  ];

  // "nguping" perubahan select role yang dirender oleh FormContainer
  useEffect(() => {
    const roleSelect = document.getElementById("role");
    if (!roleSelect) return;

    const handleChange = (e) => {
      setSelectedRole(e.target.value);
    };

    roleSelect.addEventListener("change", handleChange);
    return () => {
      roleSelect.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-[10vh] ml-[10vh]">
      <FormContainer
        title="Buat Akun"
        fields={fields}
      />
    </div>
  );
}

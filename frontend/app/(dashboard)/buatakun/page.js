"use client";

import { useState, useEffect } from "react";
import FormContainer from "../../components/userPage/FormContainer";
import Image from "next/image";

export default function CreateAccount() {
  const [selectedRole, setSelectedRole] = useState("");
  const [form, setForm] = useState({});


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
        onSubmit={(e) => handleSubmit(e)}
      />
    </div>
  );

  async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const payload = {
    role: formData.get("role"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // cek parent → harus kirim child
  if (payload.role === "parent") {
    payload.child = {
      name: formData.get("childName"),
      birthDate: formData.get("childBirthDate"),
      classId: formData.get("childClass"),  
    };
  }

  console.log("PAYLOAD = ", payload);

  // 1. buat akun dulu
  const res = await fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log("USER CREATED =", data);

  if (!res.ok) {
    alert("Gagal buat akun: " + data.msg);
    return;
  }

  // 2. kalau parent → nambah data anak
  if (payload.role === "parent") {
    const childRes = await fetch("http://localhost:4000/api/children", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: payload.child.name,
        birthDate: payload.child.birthDate,
        parentID: data.id, // id user baru
        classId: payload.child.classId,
      }),
    });

    const childData = await childRes.json();
    console.log("CHILD CREATED =", childData);
  }

  alert("Akun berhasil dibuat!");
  window.location.href = "/admin/users";
}

}

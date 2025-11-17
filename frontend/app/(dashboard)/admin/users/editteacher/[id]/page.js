"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import FormContainer from "../../../../../components/userPage/FormContainer";

export default function EditTeacher() {
  const { id: userId } = useParams(); 
  const [user, setUser] = useState(null);
  const router = useRouter();              

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:4000/api/users/${userId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);
  }, [userId]);

  if (!user) return <p className="mt-20 p-10">Loading...</p>;

  const teacherFields = [
    { id: "name", label: "Nama", type: "text", placeholder: "Nama guru" },
    { id: "email", label: "Email", type: "text", placeholder: "Email guru" },
    { id: "password", label: "Password Baru (opsional)", type: "password" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
    };

    if (fd.get("password")) payload.password = fd.get("password");

    await fetch(`http://localhost:4000/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    alert("Teacher updated!");
    router.push("/admin/users"); 
  }

  return (
    <FormContainer
      title="Edit Akun Guru"
      fields={teacherFields}
      defaultValues={user}
      onSubmit={handleSubmit}
    />
  );
}

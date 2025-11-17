// File: /app/edit-parent/page.js
"use client";
import React from "react";
import FormContainer from "../../../../../components/userPage/FormContainer";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditParent({ params }) {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const router = useRouter();   

    useEffect(() => {
    fetch(`http://localhost:4000/api/users/${userId}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setUser(data));
  }, []);

    if (!user) return <p className="mt-20 p-10">Loading...</p>;

  const parentFields = [
    { id: "name", label: "Nama Wali", type: "text" },
    { id: "email", label: "Email", type: "text" },
    { id: "password", label: "Password Baru (optional)", type: "password" },

    { id: "childName", label: "Nama Anak", type: "text" },
    { id: "childBirthDate", label: "Tanggal Lahir Anak", type: "date" },
    {
      id: "childClass",
      type: "select",
      label: "Kelas Anak",
      options: [
        { value: "Abesar", label: "Abesar" },
        { value: "Akecil", label: "Akecil" },
        { value: "Bbesar", label: "Bbesar" },
        { value: "Bkecil", label: "Bkecil" },
      ],
    },
  ];

  

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    const userPayload = {
      name: fd.get("name"),
      email: fd.get("email"),
    };

     if (fd.get("password")) userPayload.password = fd.get("password");

    await fetch(`http://localhost:4000/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userPayload),
    });

    const childId = user.children[0].id;

    const childPayload = {
      name: fd.get("childName"),
      birthDate: fd.get("childBirthDate"),
      classId: fd.get("childClass"),
    };

      await fetch(`http://localhost:4000/api/children/${childId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(childPayload),
    });

    alert("Parent and Child updated!");
    router.push("/admin/users"); 
  }

    return (
    <FormContainer
      title="Edit Akun Orang Tua"
      fields={parentFields}
      defaultValues={{
        name: user.name,
        email: user.email,
        childName: user.children[0]?.name,
        childBirthDate: user.children[0]?.birthDate?.substring(0, 10),
        childClass: user.children[0]?.classId,
      }}
      onSubmit={handleSubmit}
    />
  );
}





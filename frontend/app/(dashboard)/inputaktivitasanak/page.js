import FormContainer from "../../components/userPage/FormContainer";
import Navbar from "../../components/userPage/NavbarDesktop";


export default function CreateNotification() {
  return (
    <div className="flex flex-col items-center mt-[10vh]">
     

      <FormContainer
        title="Input Aktivitas Anak"
        fields={[
          { id: "Aktivitas", 
            label: "Judul", 
            type: "text", 
            placeholder: "Select" },
        {
        id: "tanggal",
        label: "Tanggal",
        type: "date"
        },
        {
        id: "waktuMulai",
        label: "Waktu Mulai",
        type: "time"
        },  
        {
        id: "waktuselesai",
        label: "Waktu Selesai",
        type: "time"
        },
          { 
            id: "body", 
            label: "Additional Notes", 
            type: "textarea",
            placeholder: "Maksimal 1000 karakter"
          }
        ]}
      />
    </div>
  );
}

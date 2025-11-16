import FormContainer from "../../components/userPage/FormContainer";
import Navbar from "../../components/userPage/NavbarDesktop";


export default function CreateNotification() {
  return (
    <div className="flex flex-col items-center mt-[10vh]">
      

      <FormContainer
        title="Buat Notifikasi"
        fields={[
          { id: "judul", 
            label: "Judul", 
            type: "text", 
            placeholder: "Select" 
        },

        {
        id: "tanggal",
        label: "Tanggal",
        type: "date"
        },

        {
        id: "waktuMulai",
        label: "Waktu Selesai",
        type: "time"
        },
        
        {
        id: "waktuselesai",
        label: "Waktu Selesai",
        type: "time"
        },

          { 
            id: "body", 
            label: "Isi Notifikasi", 
            type: "textarea",
            placeholder: "Maksimal 1000 karakter"
          }
        ]}
      />
    </div>
  );
}

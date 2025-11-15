import FormContainer from "../components/userPage/FormContainer";
import Navbar from "../components/userPage/NavbarDesktop";


export default function CreateNotification() {
  return (
    <div className="flex flex-col items-center mt-[10vh]">
      <Navbar />

      <FormContainer
        title="Presensi Anak"
        fields={[
         {
            id:"date",
            label:"Tanggal:",
            type:"date",
         },
          { 
            id: "status", 
            label: "Status Kehadiran", 
            type: "select",
            options: [
              { label: "Hadir", value: "Hadir" },
              { label: "sakit", value: "Sakit" },
              { label: "izin", value: "Izin" },
               { label: "Alfa", value: "Alfa" },
            ]
          },
           {
            id: "CheckIn",
            label: "Check In",
            type: "time"
            },  
            {
            id: "checkOut",
            label: "Check Out",
            type: "time"
            },
          { 
            id: "body", 
            label: "Note", 
            type: "textarea",
            placeholder: "Maksimal 1000 karakter"
          }
        ]}
      />
    </div>
  );
}

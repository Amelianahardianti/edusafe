import FormContainer from "../../components/userPage/FormContainer";
import Navbar from "../../components/userPage/NavbarDesktop";

export default function createclass(){
    return (
        <div className="flex flex-col items-center mt-[10vh]">
      
      <FormContainer
      title="Input Kelas Baru"
      tittle="Input Kelas Baru"
       fields={[
        { 
            id: "name", 
            label: "nama Kelas", 
            type: "text",
            placeholder: "contoh : Kelas A"
          },
           {
            id: "grade",
            label: "Grade",
            type: "number",
            placeholder: "Masukkan nilai...",
            min: 0,
            max: 100,
            step: 1
         },
        { 
            id: "schoolyear", 
            label: "Tahun Ajaran", 
            type: "text",
            placeholder: "contoh : 2025/2026"
          },
       ]} />
    </div>

      );
}

import React, { useState, useEffect } from "react";
import { StudentWork, StudentWorkStatus } from "../../types/StudentWork";
import { BASE_URL } from "../../const";

interface StudentWorkPopupProps {
  studentData: StudentWork;
  activityId: number | undefined;
  teacherId: number | undefined;
  onClose: () => void;
  onSaveSuccess: (updatedStudent: StudentWork) => void;
  onSaveFailed: () => void;
  onSaving: () => void;
  onDelete: (updatedStudent: StudentWork) => void;
}

const StudentWorkTabPopUp: React.FC<StudentWorkPopupProps> = ({
  studentData,
  activityId,
  teacherId,
  onClose,
  onSaveSuccess,
  onSaveFailed,
  onSaving,
  onDelete,
}) => {
  const [studentWork, setStudentWork] = useState<StudentWork>(studentData);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setStudentWork(studentData);
  }, [studentData]);

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      onSaving();

      if (!activityId || !teacherId || !file) {
        throw new Error("Activity ID, Teacher ID, or file is missing");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${BASE_URL}/hasil_karya?jadwal=${activityId}&murid=${studentWork.id}&guru=${teacherId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        onSaveFailed();
        throw new Error("Failed to patch student's work");
      }

      const updatedStudentWork = {
        ...studentWork,
        status: StudentWorkStatus.COMPLETE,
      };
      onSaveSuccess(updatedStudentWork);
      onClose();
    } catch (error) {
      onSaveFailed();
      console.error("Error submitting student's work:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `${BASE_URL}/hasil_karya?id=${studentData.id_work}`,
        {
          method: "DELETE",
        }
      );
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to delete student's work");
      }
      const updatedStudentWork = {
        ...studentWork,
        status: StudentWorkStatus.NOT_YET,
        file: "",
        file_type: "",
      };
      onDelete(updatedStudentWork);
    } catch (error) {
      console.error("Error deleting student's work:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "1000",
        textAlign: "center",
      }}
    >
      <div
        className="popup"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "80%",
        }}
      >
        <span
          className="close"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            cursor: "pointer",
            fontSize: "30px",
          }}
        >
          &times;
        </span>
        <img
          src={studentWork.imgUrl}
          alt={studentWork.name}
          className="w-24 h-24 rounded-full mb-4 mx-auto"
        />
        <h2 className="text-2xl text-text-100 font-semibold mb-4">
          {studentWork.name}
        </h2>
        {studentWork.file ? (
          <div
            className="popup-content-uploaded"
            style={{ textAlign: "center", padding: "30px" }}
          >
            <div
              className="bg-neutral3 flex justify-center items-center rounded-lg"
              style={{ height: "300px" }}
            >
              {["video/mp4", "video/webm", "video/ogg"].includes(
                studentWork.file_type
              ) ? (
                <video src={studentWork.file} controls />
              ) : [
                  "image/png",
                  "image/jpeg",
                  "image/gif",
                  "image/webp",
                ].includes(studentWork.file_type) ? (
                <img
                  src={studentWork.file}
                  alt={studentWork.work_name}
                  style={{ width: "90%", height: "90%", objectFit: "cover" }}
                />
              ) : (
                <div>
                  <p className="font-bold mb-5">File tidak dapat ditampilkan</p>
                  <button className="bg-persian-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-persian-blue-600 transition duration-300">
                    <a href={studentWork.file} download>
                      Unduh
                    </a>
                  </button>
                </div>
              )}
            </div>
            <h2
              className="text-lg font-semibold mt-4 overflow-hidden whitespace-nowrap text-overflow-ellipsis"
              style={{
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {studentWork.work_name}
            </h2>
            {/* <button
              onClick={handleDelete}
              disabled={isSaving}
              className={`bg-red-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-600 transition duration-300 mt-4
              ${ isSaving ? "opacity-50 cursor-not-allowed" : "" }`}
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </button> */}
          </div>
        ) : (
          <div className="popup-content-empty" style={{ textAlign: "center" }}>
            <div className="flex items-center mb-4">
              <label className="text-label-1 text-text-100 mr-5">
                Hasil Karya:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border rounded-md p-2 text-label-1 bg-neutral-4 w-full"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className={`bg-persian-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-persian-blue-600 transition duration-300
              ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentWorkTabPopUp;

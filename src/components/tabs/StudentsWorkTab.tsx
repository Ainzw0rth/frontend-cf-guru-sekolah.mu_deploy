import {
  StudentWorkData,
  StudentWorkStatus,
  StudentWork,
} from "../../types/StudentWork";
import StudentWorkTabPopUp from "./StudentWorkTabPopUp";
import { useState, useEffect } from "react";
import { fetchStudentWorkData } from "../../data/studentWork";
import ToastType from "../toasts/ToastType";
import Toast from "../toasts/Toast";
import { Skeleton } from "@mui/material";

interface StudentWorkCardProps {
  student: StudentWork;
  onClick: () => void;
}

const StudentWorkCard = ({ student, onClick }: StudentWorkCardProps) => {
  const getStatusClass = () => {
    switch (student.status) {
      case StudentWorkStatus.COMPLETE:
        return "bg-presence-complete";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex flex-col w-full p-5 shadow-hard rounded-lg gap-3 ${getStatusClass()}`}
      onClick={onClick}
    >
      <div className="flex items-center w-full gap-3">
        <img
          src={student.imgUrl}
          alt={student.name}
          className="w-8 h-8 rounded-full"
        />
        <h3 className="text-text-100 text-body-3 font-semibold">
          {student.name}
        </h3>
      </div>
    </div>
  );
};

interface StudentWorkTabProps {
  activityId: number;
  studentWorkData?: StudentWorkData;
  onStudentWorkDataChange: (data: StudentWorkData) => void;
}

const StudentWorkTab = ({
  activityId,
  studentWorkData,
  onStudentWorkDataChange,
}: StudentWorkTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isLoading, setIsLoading] = useState(!studentWorkData);
  const [filteredStudents, setFilteredStudents] = useState<StudentWork[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentWork | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  // Toast
  const [activeToast, setToastActive] = useState<ToastType>(ToastType.NONE);

  useEffect(() => {
    if (!studentWorkData || isSaving) {
      setIsLoading(true);
      setIsSaving(false);
      fetchStudentWorkData(activityId)
        .then((dataWork) => {
          onStudentWorkDataChange(dataWork);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching student's work data:", error);
          setIsLoading(false);
        });
    }
  }, [activityId, studentWorkData]);

  useEffect(() => {
    if (studentWorkData) {
      filterStudents(searchTerm, filterStatus);
    }
  }, [studentWorkData, searchTerm, filterStatus]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filterStudents = (searchTerm: string, filterStatus: string) => {
    if (!studentWorkData) return;

    const filteredStudents = studentWorkData.students.filter((student) => {
      return (
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === "" || student.status === filterStatus)
      );
    });

    setFilteredStudents(filteredStudents);
  };

  const handleStudentClick = (student: StudentWork) => {
    setSelectedStudent(student);
  };

  const handleClosePopup = () => {
    setSelectedStudent(null);
  };

  const updateStudentWork = (updatedStudent: StudentWork) => {
    if (studentWorkData) {
      const updatedStudents = studentWorkData.students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      );
      setIsSaving(true);
      onStudentWorkDataChange({
        ...studentWorkData,
        students: updatedStudents,
      });
    }
  };

  return (
    <div className="flex flex-col mt-5 gap-5 w-5/6 mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex-1 mr-2">
          <input
            type="text"
            placeholder="Cari Siswa"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded-md p-2 w-full text-lg"
            style={{
              border: "1px solid #1890ff",
              borderRadius: "8px",
              paddingLeft: "10px",
            }}
          />
        </div>
      </div>
      <div>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="filter-dropdown px-2 py-1 border bg-neutral5 rounded-md flex-auto text-lg"
        >
          <option value="" className="text-xs">
            Status
          </option>
          <option value={StudentWorkStatus.NOT_YET} className="text-xs">
            Belum Dikerjakan
          </option>
          <option value={StudentWorkStatus.COMPLETE} className="text-xs">
            Selesai
          </option>
        </select>
      </div>
      {isLoading ? (
        <div>
          <Skeleton variant="rounded" width="100%" height={70} sx={{marginBottom:2}}/>
          <Skeleton variant="rounded" width="100%" height={70} sx={{marginBottom:2}}/>
          <Skeleton variant="rounded" width="100%" height={70} sx={{marginBottom:2}}/>
          <Skeleton variant="rounded" width="100%" height={70} sx={{marginBottom:2}}/>
          <Skeleton variant="rounded" width="100%" height={70} sx={{marginBottom:2}}/>
          <Skeleton variant="rounded" width="100%" height={70} sx={{marginBottom:2}}/>
        </div>
      ) : filteredStudents.length === 0 ? (
        <p className="text-neutral9 italic">Siswa tidak ditemukan</p>
      ) : (
        filteredStudents.map((student) => (
          <StudentWorkCard
            key={student.id}
            student={student}
            onClick={() => handleStudentClick(student)}
          />
        ))
      )}

      {selectedStudent && (
        <StudentWorkTabPopUp
          studentData={selectedStudent}
          activityId={studentWorkData?.activityId}
          teacherId={studentWorkData?.teacherId}
          onClose={handleClosePopup}
          onSaveSuccess={(data: StudentWork) => {
            updateStudentWork(data);
            setToastActive(ToastType.SUCCESS);
          }}
          onSaveFailed={() => setToastActive(ToastType.FAILED)}
          onSaving={() => setToastActive(ToastType.SAVING)}
          onDelete={updateStudentWork}
        />
      )}
      <Toast
        message="Berhasil Menyimpan Hasil Karya!"
        onClose={() => setToastActive(ToastType.NONE)}
        open={activeToast == ToastType.SUCCESS}
        severity="success"
        title="Success"
        autoHideDuration={4000}
      />
      <Toast
        message="Gagal Menyimpan Hasil Karya!"
        onClose={() => setToastActive(ToastType.NONE)}
        open={activeToast == ToastType.FAILED}
        severity="error"
        title="Failed"
        autoHideDuration={4000}
      />
      <Toast
        message="Menyimpan Hasil Karya..."
        onClose={() => {
          setToastActive(ToastType.NONE);
        }}
        open={activeToast == ToastType.SAVING}
        severity="info"
        title="Loading"
      />
    </div>
  );
};

export default StudentWorkTab;

import {
  PresenceClass,
  PresenceData,
  PresenceStatus,
  StudentPresence,
} from "../../types/Presence";
import { useEffect, useState } from "react";
import { fetchPresenceData, savePresenceData } from "../../utils/presenceUtils";
import BulkEditPresencePopUp from "./BulkEditPresencePopUp";
import Toast from "../toasts/Toast";
import ToastType from "../toasts/ToastType";

const PresenceStatsCard = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  return (
    <div className="shadow-hard rounded-lg flex flex-col w-20 h-20 justify-center items-center shrink-0">
      <h3 className="text-text-100 text-heading-4 font-semibold text-center">
        {value}
      </h3>
      <h3 className="text-neutral-900 text-paragraph-3 font-medium text-center">
        {title}
      </h3>
    </div>
  );
};

const PresenceStats = ({ presenceClass }: { presenceClass: PresenceClass }) => {
  const notYetStudents = presenceClass.students.filter(
    (student) => student.status === "Not Yet"
  ).length;
  const absentStudents = presenceClass.students.filter(
    (student) => student.status === "Absent"
  ).length;
  const sickStudents = presenceClass.students.filter(
    (student) => student.status === "Sick"
  ).length;
  const permittedStudents = presenceClass.students.filter(
    (student) => student.status === "Permitted"
  ).length;
  const presentStudents = presenceClass.students.filter(
    (student) => student.status === "Present"
  ).length;

  return (
    <div className="flex gap-5 overflow-auto whitespace-nowrap pb-4">
      <PresenceStatsCard title="Belum" value={notYetStudents} />
      <PresenceStatsCard title="Hadir" value={presentStudents} />
      <PresenceStatsCard title="Absen" value={absentStudents} />
      <PresenceStatsCard title="Sakit" value={sickStudents} />
      <PresenceStatsCard title="Izin" value={permittedStudents} />
    </div>
  );
};

interface StudentPresenceCardProps {
  student: StudentPresence;
  onStatusChange: (studentId: number, newStatus: PresenceStatus) => void;
  isSelectMode: boolean;
  isSelected: boolean;
  onSelectToggle: (studentId: number) => void;
}

const StudentPresenceCard = ({
  student,
  onStatusChange,
  isSelectMode,
  isSelected,
  onSelectToggle,
}: StudentPresenceCardProps) => {
  const [status, setStatus] = useState(student.status);

  useEffect(() => {
    setStatus(student.status);
  }, [student.status]);

  const toggleStatus = (newStatus: PresenceStatus) => {
    let appliedStatus = status;
    if (status !== newStatus) {
      appliedStatus = newStatus;
    }

    onStatusChange(student.id, appliedStatus);
    setStatus(appliedStatus);
  };

  return (
    <div className="flex flex-col w-full p-5 shadow-hard rounded-lg gap-3 relative">
      {isSelectMode && (
        <input
          type="checkbox"
          className="absolute top-5 right-5 w-5 h-5"
          checked={isSelected}
          onChange={() => onSelectToggle(student.id)}
        />
      )}
      <div className="flex items-center w-full gap-4">
        <img
          src={student.imgUrl}
          alt={student.name}
          className="w-12 h-12 rounded-full"
        />
        <h3 className="text-text-100 text-heading-4 font-semibold">
          {student.name}
        </h3>
      </div>
      <div className="flex gap-2 w-full justify-between items-center">
        <button
          className={`w-1/2 py-1.5 px-2  border-presence-red border-2 
                    font-semibold rounded-xl text-label-4
                    ${
                      status === PresenceStatus.ABSENT
                        ? "bg-presence-red text-white"
                        : "text-presence-red"
                    }`}
          onClick={() => toggleStatus(PresenceStatus.ABSENT)}
        >
          Absen
        </button>
        <button
          className={`w-1/2 py-1.5 px-2 border-presence-yellow border-2 
                    font-semibold rounded-xl text-label-4
                    ${
                      status === PresenceStatus.SICK
                        ? "bg-presence-yellow text-white"
                        : "text-presence-yellow"
                    }`}
          onClick={() => toggleStatus(PresenceStatus.SICK)}
        >
          Sakit
        </button>
        <button
          className={`w-1/2 py-1.5 px-2 border-presence-blue border-2 
                    font-semibold rounded-xl text-label-4
                    ${
                      status === PresenceStatus.PERMITTED
                        ? "bg-presence-blue text-white"
                        : "text-presence-blue"
                    }`}
          onClick={() => toggleStatus(PresenceStatus.PERMITTED)}
        >
          Izin
        </button>
        <button
          className={`w-1/2 py-1.5 px-2 border-presence-green border-2 
                    font-semibold rounded-xl text-label-4
                    ${
                      status === PresenceStatus.PRESENT
                        ? "bg-presence-green text-white"
                        : "text-presence-green"
                    }`}
          onClick={() => toggleStatus(PresenceStatus.PRESENT)}
        >
          Hadir
        </button>
      </div>
    </div>
  );
};

interface PresenceTabProps {
  activityId: number;
  presenceData?: PresenceData | null;
  onPresenceDataChange: (data: PresenceData | null) => void;
  fetchData: () => void;
}


const PresenceTab = (props: PresenceTabProps) => {
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [changedIds, setChangedIds] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number[]>([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // Toast
  const [activeToast, setToastActive] = useState<ToastType>(ToastType.NONE);

  const handleStudentStatusChange = (
    studentId: number,
    newStatus: PresenceStatus
  ) => {
    const newPresenceData = props.presenceData!;
    const studentIndex = newPresenceData.students.findIndex(
      (student) => student.id === studentId
    );
    newPresenceData.students[studentIndex].status = newStatus;
    setIsChangesSaved(false);
    if (!changedIds.includes(studentId))
      setChangedIds((prev) => {
        const updated = [...prev, studentId];
        return updated;
      });
    props.onPresenceDataChange(newPresenceData);
  };

  if (!props.presenceData) {
    fetchPresenceData(props.activityId)
      .then((data) => {
        props.onPresenceDataChange(data);
      })
      .catch((err) => {
        console.error(err);
        props.onPresenceDataChange(null);
      });

    return <div>Loading...</div>;
  }

  const onSelectAll = () => {
    setSelectedStudent(
      props.presenceData!.students.map((student) => student.id)
    );
    setIsSelectMode(!isSelectMode);
  };

  const onCancelSelect = () => {
    setSelectedStudent([]);
    setIsSelectMode(false);
  };

  const onItemSelectToggle = (studentId: number) => {
    if (selectedStudent.includes(studentId)) {
      setSelectedStudent((prevSelectedStudent) =>
        prevSelectedStudent.filter((id) => id !== studentId)
      );
    } else {
      setSelectedStudent((prevSelectedStudent) => [
        ...prevSelectedStudent,
        studentId,
      ]);
    }
  };

  const onStartBulkEdit = () => {
    setIsPopUpOpen(true);
  };

  const onBulkEditDone = (status: PresenceStatus) => {
    selectedStudent.forEach((studentId) => {
      handleStudentStatusChange(studentId, status);
    });
    setSelectedStudent([]);
    setIsSelectMode(false);
    setIsPopUpOpen(false);
  };

  const onSaveChanges = () => {
    setToastActive(ToastType.SAVING);
    savePresenceData(props.activityId, props.presenceData!, changedIds).then(
      () => {
        setIsChangesSaved(true);
        setIsSelectMode(false);
        setChangedIds([]);
        setSelectedStudent([]);
        setToastActive(ToastType.SUCCESS);
      }
    ).catch((e) => {
      console.error(e);
      setToastActive(ToastType.FAILED);
    });
  };

  const data: PresenceData = props.presenceData;

  return (
    <div className="flex flex-col mt-5 gap-5 w-5/6 mx-auto">
      <PresenceStats presenceClass={data} />
      <button
        className="bg-persian-blue-500 text-neutral8 rounded-xl py-2 font-semibold disabled:opacity-50"
        disabled={isChangesSaved || activeToast == ToastType.SAVING}
        onClick={onSaveChanges}
      >
        {activeToast == ToastType.SAVING ? "Menyimpan" : "Simpan"}
      </button>
      <div className="flex justify-between items-end w-full gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-text-100 text-heading-4 font-semibold">
            Daftar Murid
          </h3>
          <a
            className="cursor-pointer underline underline-offset-1 text-indigo-700"
            onClick={isSelectMode ? onCancelSelect : onSelectAll}
          >
            {isSelectMode ? "Batalkan Pilihan" : "Pilih Semua"}
          </a>
        </div>
        {isSelectMode && (
          <a
            className="cursor-pointer underline underline-offset-1 text-indigo-700"
            onClick={onStartBulkEdit}
          >
            Edit Terpilih
          </a>
        )}
      </div>
      {data.students.map((student) => (
        <StudentPresenceCard
          key={student.id}
          student={student}
          onStatusChange={handleStudentStatusChange}
          isSelected={selectedStudent.includes(student.id)}
          onSelectToggle={(studentId) => onItemSelectToggle(studentId)}
          isSelectMode={isSelectMode}
        />
      ))}
      {isPopUpOpen && <BulkEditPresencePopUp onPopUpDone={onBulkEditDone} />}
      <Toast
        message="Berhasil Menyimpan Presensi!"
        onClose={() => setToastActive(ToastType.NONE)}
        open={activeToast == ToastType.SUCCESS}
        severity="success"
        title="Success"
        autoHideDuration={4000}
      />
      <Toast
        message="Gagal Menyimpan Presensi!"
        onClose={() => setToastActive(ToastType.NONE)}
        open={activeToast == ToastType.FAILED}
        severity="error"
        title="Failed"
        autoHideDuration={4000}
      />
      <Toast
        message="Menyimpan Presensi..."
        onClose={() => {
          setToastActive(ToastType.NONE);
          console.log("loading");
        }}
        open={activeToast == ToastType.SAVING}
        severity="info"
        title="Loading"
      />
    </div>
  );
};

export default PresenceTab;

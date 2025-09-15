
import React, { useEffect, useState } from "react"; 
import { getAllCourses } from "../services/courseService";
import { updateStudent } from "../services/studentService";
import {
  FullNameValid,
  validateEmailValue,
  PhoneValid,
} from "../Validations/UpdateStudentValid";

export default function UpdateStudent({ student = {}, onClose }) {
  const [sid, setSid] = useState(student.sid ?? "");
  const [name, setName] = useState(student.name ?? "");
  const [email, setEmail] = useState(student.email ?? "");
  const [contact, setContact] = useState(student.contact ?? "");
  const [uid, setUid] = useState(student.uid ?? "");
  const [originalCid, setOriginalCid] = useState(student.cid ?? null);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [currentCourseName, setCurrentCourseName] = useState(
    student.course_name ?? (student.cid ? "Loading..." : "N/A")
  );
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    setSid(student.sid ?? "");
    setName(student.name ?? "");
    setEmail(student.email ?? "");
    setContact(student.contact ?? "");
    setUid(student.uid ?? "");
    setOriginalCid(student.cid ?? null);
    setSelectedCourse("");
    setCurrentCourseName(
      student.course_name ?? (student.cid ? "Loading..." : "N/A")
    );
  }, [student]);


  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingCourses(true);
      try {
        const data = await getAllCourses();
        if (!mounted) return;
        setCourses(data || []);

        if (student.course_name) {
          setCurrentCourseName(student.course_name);
        } else if (student.cid) {
          const found = (data || []).find(
            (c) => String(c.cid) === String(student.cid)
          );
          setCurrentCourseName(found ? found.name : "Unknown");
        } else {
          setCurrentCourseName("N/A");
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
        if (mounted) {
          setCurrentCourseName(
            student.course_name ?? (student.cid ? "Unknown" : "N/A")
          );
        }
      } finally {
        if (mounted) setLoadingCourses(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [student]);

  const handleUpdate = async () => {
    const isNameValid = FullNameValid(name);
    const isEmailValid = validateEmailValue(email);
    const isPhoneValid = PhoneValid(contact);

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      alert("Please fix errors before submitting");
      return;
    }

    const cidToSend = selectedCourse ? Number(selectedCourse) : originalCid ?? null;

    const studentData = {
      sid,
      name,
      email,
      contact,
      uid,
      cid: cidToSend,
    };

    try {
      const res = await updateStudent(studentData);
      alert(res?.message ?? "Student updated successfully");

      if (selectedCourse) {
        const found = courses.find((c) => String(c.cid) === String(selectedCourse));
        setCurrentCourseName(found ? found.name : "Unknown");
        setOriginalCid(Number(selectedCourse));
        setSelectedCourse("");
      }

      if (typeof onClose === "function") onClose();
    } catch (err) {
      const msg =
        err.response?.data?.message ?? err.message ?? "Failed to update student";
      alert(msg);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 640 }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Update Student</h4>

          <div className="mb-3">
            <label className="form-label">Student ID</label>
            <input className="form-control" value={sid} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={(e) => {
                setName(e.target.value); 
                FullNameValid(e.target.value);}}/>
            <span id="nameError"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => {
                setEmail(e.target.value);
                validateEmailValue(e.target.value);}}
              onBeforeInput={(e) => {
                const data = e.data;
                const selStart = typeof e.target.selectionStart === "number" ? e.target.selectionStart : 0;
                if (data === " " && selStart === 0) {
                  validateEmailValue(" " + e.target.value);
                }
              }}
              onKeyDown={(e) => {
                const selStart = typeof e.target.selectionStart === "number" ? e.target.selectionStart : 0;
                if (e.key === " " && selStart === 0) {
                  validateEmailValue(" " + e.target.value);
                }
              }}
              onPaste={(e) => {
                const text = (e.clipboardData || window.clipboardData).getData("text");
                if (text && text[0] === " ") {
                  validateEmailValue(" " + e.target.value);
                }
              }}
              className="form-control"/>
            <span id="emailError"></span>
          </div>

    
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input className="form-control" value={contact} onChange={(e) => {
                setContact(e.target.value);
                PhoneValid(e.target.value);}}/>
            <span id="phoneError"></span>
          </div>

          
          <div className="mb-3">
            <label className="form-label">Current Course</label>
            <input type="text" className="form-control"
              value={loadingCourses ? "Loading..." : currentCourseName} disabled/>
          </div>

        
          <div className="mb-4">
            <label className="form-label">Update Course </label>
            <select className="form-select" value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">
                Select New Course 
              </option>
              {!loadingCourses &&
                courses.map((c) => (
                  <option key={c.cid} value={String(c.cid)}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success flex-fill" onClick={handleUpdate}>
              Update Student
            </button>
            <button className="btn btn-secondary flex-fill"
              onClick={() => onClose && onClose()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
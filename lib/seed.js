// Sample data shown the first time you open the app.
// You can delete it all from the pages, or use "Reset sample data" in the sidebar.
export const seed = {
  teachers: [
    { id: "t1", name: "Ayesha Khan", subject: "Mathematics", phone: "0300-1112233", salary: 45000 },
    { id: "t2", name: "Imran Ali", subject: "English", phone: "0301-2223344", salary: 42000 },
    { id: "t3", name: "Sana Memon", subject: "Science", phone: "0302-3334455", salary: 44000 },
  ],
  classes: [
    { id: "c1", name: "Class 5-A", teacherId: "t1", room: "Room 1" },
    { id: "c2", name: "Class 6-A", teacherId: "t2", room: "Room 2" },
    { id: "c3", name: "Class 7-A", teacherId: "t3", room: "Room 3" },
  ],
  students: [
    { id: "s1", name: "Ahmed Raza", fatherName: "Raza Hussain", rollNo: "501", classId: "c1", phone: "0310-1000001" },
    { id: "s2", name: "Fatima Noor", fatherName: "Noor Ahmed", rollNo: "502", classId: "c1", phone: "0310-1000002" },
    { id: "s3", name: "Hamza Sheikh", fatherName: "Sheikh Yusuf", rollNo: "601", classId: "c2", phone: "0310-1000003" },
    { id: "s4", name: "Zainab Bhatti", fatherName: "Bhatti Tariq", rollNo: "602", classId: "c2", phone: "0310-1000004" },
    { id: "s5", name: "Bilal Soomro", fatherName: "Soomro Karim", rollNo: "701", classId: "c3", phone: "0310-1000005" },
    { id: "s6", name: "Mariam Qureshi", fatherName: "Qureshi Asif", rollNo: "702", classId: "c3", phone: "0310-1000006" },
  ],
  fees: [
    { id: "f1", studentId: "s1", month: "2026-10", amount: 1500, status: "paid" },
    { id: "f2", studentId: "s2", month: "2026-10", amount: 1500, status: "unpaid" },
    { id: "f3", studentId: "s3", month: "2026-10", amount: 1800, status: "paid" },
    { id: "f4", studentId: "s4", month: "2026-10", amount: 1800, status: "unpaid" },
    { id: "f5", studentId: "s5", month: "2026-10", amount: 2000, status: "paid" },
  ],
  // attendance: { "YYYY-MM-DD": { studentId: "present" | "absent" | "leave" } }
  attendance: {},
};

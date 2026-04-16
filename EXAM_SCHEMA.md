# Smart School Hub - Data Architecture (Firestore)

While this application use **Firebase Firestore** (NoSQL), here is the equivalent relational schema and data structure for your reference.

## 1. Users Collection
Stores account information, roles, and academic status.
- **uid**: Primary Key
- **email**: User Email
- **displayName**: Full Name
- **role**: `admin` | `guru` | `siswa`
- **department**: Academic Major (TKJ, DKV, etc.)
- **nisn**: Student National ID
- **passingStatus**: `Lulus` | `Tidak Lulus` | `Proses`

## 2. Exam Results Collection
Stores results once a student finishes an exam.
- **userId**: Foreign Key (Users.uid)
- **userName**: Denormalized for reports
- **userMajor**: Denormalized for reports
- **score**: Percentage (0.0 - 100.0)
- **isPassed**: Boolean (`true` if score >= 75)
- **timestamp**: Server Timestamp

## 3. Attendance (Presensi) Collection
Daily logs for students and teachers.
- **userId**: Foreign Key (Users.uid)
- **userName**: Full Name
- **status**: `Hadir` | `Izin` | `Sakit`
- **type**: `Siswa` | `Guru`
- **timestamp**: Server Timestamp

---

### Access Control Rules (RBAC)
1. **Students (Siswa)**:
   - Access: `Hub Utama`, `Ujian Online`, `Pengaturan`.
   - Hidden: `Sistem Administrasi`, `Rekap Presensi`, `Management Siswa`.
2. **Teachers/Admins**:
   - Access: All modules including Management, Recap, and Reports.

### Security Note
All database security is handled via **Firestore Security Rules** (`firestore.rules`) ensuring that Students can only write their own results and cannot modify their score after submission.

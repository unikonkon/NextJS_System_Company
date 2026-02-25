import type { UserRole } from '@/types/auth.types';

export interface FixedUserConfig {
  email: string;
  password: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  firstNameTh: string;
  lastNameTh: string;
  nickname: string;
  role: UserRole;
  department: string;
  position: string;
}

export const FIXED_USERS: FixedUserConfig[] = [
  { email: 'admin@webagency.co.th', password: 'Admin@2026!', employeeCode: 'EMP-001', firstName: 'Somchai', lastName: 'Wongsakul', firstNameTh: 'สมชาย', lastNameTh: 'วงศ์สกุล', nickname: 'ชาย', role: 'SUPER_ADMIN', department: 'Management', position: 'CEO / ผู้บริหาร' },
  { email: 'nida@webagency.co.th', password: 'HrNida@2026!', employeeCode: 'EMP-002', firstName: 'Nida', lastName: 'Kaewmanee', firstNameTh: 'นิดา', lastNameTh: 'แก้วมณี', nickname: 'นิด', role: 'HR', department: 'Human Resources', position: 'HR Manager' },
  { email: 'ploy@webagency.co.th', password: 'HrPloy@2026!', employeeCode: 'EMP-003', firstName: 'Ploynapas', lastName: 'Srisuk', firstNameTh: 'พลอยนภัส', lastNameTh: 'ศรีสุข', nickname: 'พลอย', role: 'ADMIN', department: 'Human Resources', position: 'HR Officer' },
  { email: 'tanakorn@webagency.co.th', password: 'PmTana@2026!', employeeCode: 'EMP-004', firstName: 'Tanakorn', lastName: 'Phansuwan', firstNameTh: 'ธนากร', lastNameTh: 'พันธ์สุวรรณ', nickname: 'ต้น', role: 'PM', department: 'Project Management', position: 'Senior Project Manager' },
  { email: 'fern@webagency.co.th', password: 'PmFern@2026!', employeeCode: 'EMP-005', firstName: 'Fernlada', lastName: 'Thongkham', firstNameTh: 'เฟิร์นลดา', lastNameTh: 'ทองคำ', nickname: 'เฟิร์น', role: 'PM', department: 'Project Management', position: 'Project Manager' },
  { email: 'peem@webagency.co.th', password: 'DevPeem@2026!', employeeCode: 'EMP-006', firstName: 'Peemwit', lastName: 'Chaiyo', firstNameTh: 'ปิ่มวิชญ์', lastNameTh: 'ไชโย', nickname: 'ปิ่ม', role: 'DEVELOPER', department: 'Development', position: 'Lead Frontend Developer' },
  { email: 'bank@webagency.co.th', password: 'DevBank@2026!', employeeCode: 'EMP-007', firstName: 'Bankitti', lastName: 'Rodprasert', firstNameTh: 'บัณฑิตติ์', lastNameTh: 'รอดประเสริฐ', nickname: 'แบงค์', role: 'DEVELOPER', department: 'Development', position: 'Lead Backend Developer' },
  { email: 'mint@webagency.co.th', password: 'DevMint@2026!', employeeCode: 'EMP-008', firstName: 'Mintita', lastName: 'Wongsiri', firstNameTh: 'มินทิตา', lastNameTh: 'วงศ์ศิริ', nickname: 'มิ้นท์', role: 'DEVELOPER', department: 'Development', position: 'Frontend Developer' },
  { email: 'top@webagency.co.th', password: 'DevTop@2026!', employeeCode: 'EMP-009', firstName: 'Topkiat', lastName: 'Sangkla', firstNameTh: 'ทพเกียรติ', lastNameTh: 'แสงกล้า', nickname: 'ท็อป', role: 'DEVELOPER', department: 'Development', position: 'Frontend Developer' },
  { email: 'new@webagency.co.th', password: 'DevNew@2026!', employeeCode: 'EMP-010', firstName: 'Newrawit', lastName: 'Jaidee', firstNameTh: 'นิวรวิชญ์', lastNameTh: 'ใจดี', nickname: 'นิว', role: 'DEVELOPER', department: 'Development', position: 'Backend Developer' },
  { email: 'game@webagency.co.th', password: 'DevGame@2026!', employeeCode: 'EMP-011', firstName: 'Gamepol', lastName: 'Kaewprathum', firstNameTh: 'เกมพล', lastNameTh: 'แก้วประทุม', nickname: 'เกม', role: 'DEVELOPER', department: 'Development', position: 'Backend Developer' },
  { email: 'earth@webagency.co.th', password: 'DevEarth@2026!', employeeCode: 'EMP-012', firstName: 'Earthakorn', lastName: 'Suktham', firstNameTh: 'เอิร์ธกร', lastNameTh: 'สุขธรรม', nickname: 'เอิร์ธ', role: 'DEVELOPER', department: 'Development', position: 'Fullstack Developer' },
  { email: 'palm@webagency.co.th', password: 'DevPalm@2026!', employeeCode: 'EMP-013', firstName: 'Palmarin', lastName: 'Narongrit', firstNameTh: 'ปาล์มรินทร์', lastNameTh: 'ณรงค์ฤทธิ์', nickname: 'ปาล์ม', role: 'DEVELOPER', department: 'Development', position: 'Junior Developer' },
  { email: 'ice@webagency.co.th', password: 'DesIce@2026!', employeeCode: 'EMP-014', firstName: 'Icenipa', lastName: 'Artcharoen', firstNameTh: 'ไอซ์นิภา', lastNameTh: 'อาจเจริญ', nickname: 'ไอซ์', role: 'DESIGNER', department: 'Design', position: 'Senior UI/UX Designer' },
  { email: 'bam@webagency.co.th', password: 'DesBam@2026!', employeeCode: 'EMP-015', firstName: 'Bambimol', lastName: 'Paisarn', firstNameTh: 'แบมบิมล', lastNameTh: 'ไพศาล', nickname: 'แบม', role: 'DESIGNER', department: 'Design', position: 'UI/UX Designer' },
  { email: 'gun@webagency.co.th', password: 'DesGun@2026!', employeeCode: 'EMP-016', firstName: 'Gunticha', lastName: 'Lamsam', firstNameTh: 'กัณฐิชา', lastNameTh: 'ล่ำซำ', nickname: 'กัน', role: 'DESIGNER', department: 'Design', position: 'Graphic Designer' },
  { email: 'beam@webagency.co.th', password: 'QaBeam@2026!', employeeCode: 'EMP-017', firstName: 'Beamsin', lastName: 'Pattanawong', firstNameTh: 'บีมสิน', lastNameTh: 'พัฒนวงศ์', nickname: 'บีม', role: 'QA', department: 'Quality Assurance', position: 'QA Lead' },
  { email: 'oat@webagency.co.th', password: 'QaOat@2026!', employeeCode: 'EMP-018', firstName: 'Oatpiya', lastName: 'Rungroj', firstNameTh: 'โอ๊ตปิยะ', lastNameTh: 'รุ่งโรจน์', nickname: 'โอ๊ต', role: 'QA', department: 'Quality Assurance', position: 'QA Tester' },
  { email: 'joy@webagency.co.th', password: 'SalesJoy@2026!', employeeCode: 'EMP-019', firstName: 'Joyrada', lastName: 'Somboon', firstNameTh: 'จอยรดา', lastNameTh: 'สมบูรณ์', nickname: 'จอย', role: 'SALES', department: 'Sales', position: 'Sales & Account Manager' },
  { email: 'nam@webagency.co.th', password: 'FinNam@2026!', employeeCode: 'EMP-020', firstName: 'Namfon', lastName: 'Thaweesuk', firstNameTh: 'น้ำฝน', lastNameTh: 'ทวีสุข', nickname: 'น้ำ', role: 'FINANCE', department: 'Finance & Accounting', position: 'Finance Manager' },
];

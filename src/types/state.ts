import { Course, GeneralInformation, MedicalReport, Participant, ParticipantAttachment, ParticipantDissease, ParticipantHealth, ParticipantMedicine, ParticipantOnCourse, Policy, ReferenceContact, User } from "./prisma";


export type UsersState = {
  users: User[];
  setUsers: (users: User[]) => void;
  getUsers: () => void;
  getUserById: (id: number) => Promise<User | null>;
  getUserByFirstName: (firstname: string) => void;
  postUser: (user: User) => Promise<User | null>;
  putUser: (id: number, user: User) => Promise<User | null>;
  putUserPassword: (id: number, user: User) => void;
  deleteUser: (id: number) => void;
  authenticateUser: (user: User) => void;
};

export type ReferenceContactState = {
  contacts: ReferenceContact[];
  setContacts: (contacts: ReferenceContact[]) => void;
  getContacts: () => void;
  getContactById: (id: number) => void;
  postContact: (contact: ReferenceContact) => void;
  putContact: (id: number, contact: ReferenceContact) => void;
  deleteContact: (id: number) => void;
  searchContact: (searchTerm: string) => void;
};

export type PolicyState = {
  policys: Policy[];
  setPolicys: (policys: Policy[]) => void;
  getPolicys: () => void;
  getPolicyById: (id: number) => void;
  postPolicy: (policy: Policy) => void;
  putPolicy: (id: number, policy: Policy) => void;
  deletePolicy: (id: number) => void;
};

export type ParticipantState = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  getParticipants: () => void;
  getParticipantById: (id: number) => Promise<Participant | null>;
  getParticipantByEmail: (email: string) => void;
  getParticipantByIdentification: (identification: string) => void;
  getParticipantByFirstName: (firstName: string) => void;
  postParticipant: (participant: Participant) => Promise<Participant | null>;
  putParticipant: (id: number, participant: Participant) => Promise<Participant | null>;
  deleteParticipant: (id: number) => void;
};

export type ParticipantOnCourseState = {
  participantsOnCourse: ParticipantOnCourse[];
  setParticipantsOnCourse: (
    participantsOnCourse: ParticipantOnCourse[]
  ) => void;
  getParticipantsOnCourse: () => void;
  getParticipantOnCourseByCourseId: (id: number) => void;
  getParticipantOnCourseByParticipantId: (participantId: number) => void;
  postParticipantOnCourse: (participantOnCourse: ParticipantOnCourse) => void;
};

export type ParticipantMedicineState = {
  participantsMedicine: ParticipantMedicine[];
  setParticipantsMedicine: (
    participantsMedicine: ParticipantMedicine[]
  ) => void;
  getParticipantsMedicine: () => void;
  getParticipantMedicineById: (id: number) => void;
  getParticipantMedicineByMedicine: (medicine: string) => void;
  getParticipantMedicineByParticipantId: (participantId: number) => void;
  postParticipantMedicine: (participantMedicine: ParticipantMedicine) => void;
  putParticipantMedicine: (
    id: number,
    participantMedicine: ParticipantMedicine
  ) => void;
  deleteParticipantMedicine: (id: number) => void;
};

export type ParticipantHealthState = {
  participantsHealth: ParticipantHealth[];
  setParticipantsHealth: (participantsHealth: ParticipantHealth[]) => void;
  getParticipantsHealth: () => void;
  getParticipantHealthById: (id: number) => void;
  getParticipantHealthByBloodType: (bloodType: string) => void;
  getParticipantHealthByParticipantId: (participantId: number) => void;
  postParticipantHealth: (participantHealth: ParticipantHealth) => void;
  putParticipantHealth: (
    id: number,
    participantHealth: ParticipantHealth
  ) => void;
  deleteParticipantHealth: (id: number) => void;
};

export type ParticipantDisseaseState = {
  participantsDisease: ParticipantDissease[];
  setParticipantsDisease: (participantsDisease: ParticipantDissease[]) => void;
  getParticipantsDisease: () => void;
  getParticipantDiseaseById: (id: number) => void;
  getParticipantDiseaseByDisease: (disease: string) => void;
  getParticipantDiseaseByParticipantHealthtId: (
    participantHealthId: number
  ) => void;
  postParticipantDisease: (participantDisease: ParticipantDissease) => void;
  putParticipantDisease: (
    id: number,
    participantDisease: ParticipantDissease
  ) => void;
  deleteParticipantDisease: (id: number) => void;
};

export type ParticipantAttachmentState = {
  participantsAttachment: ParticipantAttachment[];
  setParticipantsAttachment: (
    participantsAttachment: ParticipantAttachment[]
  ) => void;
  getParticipantsAttachment: () => void;
  getParticipantAttachmentById: (id: number) => void;
  getParticipantAttachmentByParticipantId: (participantId: number) => void;
  postParticipantAttachment: (
    participantAttachment: ParticipantAttachment
  ) => void;
  putParticipantAttachment: (
    id: number,
    participantAttachment: ParticipantAttachment
  ) => void;
  deleteParticipantAttachment: (id: number) => void;
};

export type MedicalReportState = {
  reports: MedicalReport[];
  setReports: (reports: MedicalReport[]) => void;
  getMedicalReports: () => void;
  getMedicalReportById: (id: number) => void;
  postMedicalReport: (report: MedicalReport) => void;
  putMedicalReport: (id: number, report: MedicalReport) => void;
  deleteMedicalReport: (id: number) => void;
};

export type GeneralInformationState = {
  information: GeneralInformation[];
  setGeneralInformation: (information: GeneralInformation[]) => void;
  getGeneralInformation: () => void;
  getGeneralInformationById: (id: number) => void;
  postGeneralInformation: (information: GeneralInformation) => void;
  putGeneralInformation: (id: number, information: GeneralInformation) => void;
  deleteGeneralInformation: (id: number) => void;
};

export type CoursesState = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  getCourses: () => void;
  getCourseById: (id: number) => Promise<Course | null>;
  getCourseByCourseNumber: (courseNumber: string) => void;
  getCourseByName: (name: string) => void;
  postCourse: (courses: Course) => Promise<Course | null>;
  putCourse: (id: number, courses: Course) => Promise<Course | null>;
  deleteCourse: (id: number) => void;
};

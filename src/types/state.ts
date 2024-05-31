import { Course, GeneralInformation, Participant, ParticipantAttachment, ParticipantDissease, ParticipantHealth, ParticipantMedicine, ParticipantOnCourse, ReferenceContact, User } from "./prisma";


export type UsersState = {
  users: User[];
  setUsers: (users: User[]) => void;
  getUsers: () => Promise<User[] | null>;
  getUserById: (id: number) => Promise<User | null>;
  // getUserByFirstName: (firstname: string) => Promise<User | null>;
  postUser: (user: User) => Promise<User | null>;
  putUser: (id: number, user: User) => Promise<User | null>;
  // putUserPassword: (id: number, user: User) => void;
  deleteUser: (id: number) => Promise<boolean>;
  authenticateUser: (user: User) => Promise<User | null>;
};

export type ReferenceContactState = {
  contacts: ReferenceContact[];
  setContacts: (contacts: ReferenceContact[]) => void;
  getContacts: () => void;
  getContactById: (id: number) => Promise<ReferenceContact | null>;
  postContact: (contact: ReferenceContact) => Promise<ReferenceContact | null>;
  putContact: (id: number, contact: ReferenceContact) => Promise<ReferenceContact | null>;
  deleteContact: (id: number) => Promise<boolean>;
  searchContact: (searchTerm: string) => void;
};

export type ParticipantState = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  getParticipants: () => void;
  getParticipantById: (id: number) => Promise<Participant | null>;
  // getParticipantByEmail: (email: string) => void;
  // getParticipantByIdentification: (identification: string) => void;
  // getParticipantByFirstName: (firstName: string) => void;
  getParticipantsByCourseId: (id: number) => Promise<Participant[] | null>;
  postParticipant: (participant: Participant) => Promise<Participant | null>;
  putParticipant: (id: number, participant: Participant) => Promise<Participant | null>;
  deleteParticipant: (id: number) => Promise<boolean>;
};

export type ParticipantOnCourseState = {
  participantsOnCourse: ParticipantOnCourse[];
  setParticipantsOnCourse: (participantsOnCourse: ParticipantOnCourse[]) => void;
  getParticipantsOnCourse: () => void;
  // getParticipantOnCourseByCourseId: (id: number) => void;
  // getParticipantOnCourseByParticipantId: (participantId: number) => void;
  postParticipantOnCourse: (participantOnCourse: ParticipantOnCourse) => Promise<ParticipantOnCourse | null>;
};

export type ParticipantMedicineState = {
  participantsMedicine: ParticipantMedicine[];
  setParticipantsMedicine: (participantsMedicine: ParticipantMedicine[]) => void;
  getParticipantsMedicine: () => void;
  getParticipantMedicineById: (id: number) => Promise<ParticipantMedicine | null>;
  // getParticipantMedicineByMedicine: (medicine: string) => void;
  // getParticipantMedicineByParticipantId: (participantId: number) => void;
  postParticipantMedicine: (participantMedicine: ParticipantMedicine) => Promise<ParticipantMedicine | null>;
  putParticipantMedicine: (id: number, participantMedicine: ParticipantMedicine) => Promise<ParticipantMedicine | null>;
  deleteParticipantMedicine: (id: number) => Promise<boolean>;
};

export type ParticipantHealthState = {
  participantsHealth: ParticipantHealth[];
  setParticipantsHealth: (participantsHealth: ParticipantHealth[]) => void;
  getParticipantsHealth: () => void;
  getParticipantHealthById: (id: number) => Promise<ParticipantHealth | null>;
  // getParticipantHealthByBloodType: (bloodType: string) => void;
  // getParticipantHealthByParticipantId: (participantId: number) => void;
  postParticipantHealth: (participantHealth: ParticipantHealth) => Promise<ParticipantHealth | null>;
  putParticipantHealth: (id: number, participantHealth: ParticipantHealth) => Promise<ParticipantHealth | null>;
  deleteParticipantHealth: (id: number) => Promise<boolean>;
};

export type ParticipantDisseaseState = {
  participantsDisease: ParticipantDissease[];
  setParticipantsDisease: (participantsDisease: ParticipantDissease[]) => void;
  getParticipantsDisease: () => void;
  getParticipantDiseaseById: (id: number) => void;
  // getParticipantDiseaseByDisease: (disease: string) => void;
  // getParticipantDiseaseByParticipantHealthtId: (
  //   participantHealthId: number
  // ) => void;
  postParticipantDisease: (participantDisease: ParticipantDissease) => Promise<ParticipantDissease | null>;
  putParticipantDisease: (id: number, participantDisease: ParticipantDissease) => Promise<ParticipantDissease | null>;
  deleteParticipantDisease: (id: number) => Promise<boolean>;
};

export type ParticipantAttachmentState = {
  participantsAttachment: ParticipantAttachment[];
  setParticipantsAttachment: (participantsAttachment: ParticipantAttachment[]) => void;
  getParticipantsAttachment: () => void;
  getParticipantAttachmentById: (id: number) => void;
  // getParticipantAttachmentByParticipantId: (participantId: number) => void;
  postParticipantAttachment: (participantAttachment: ParticipantAttachment) => Promise<ParticipantAttachment | null>;
  putParticipantAttachment: (id: number, participantAttachment: ParticipantAttachment) => Promise<ParticipantAttachment | null>;
  deleteParticipantAttachment: (id: number) => Promise<boolean>;
};

export type GeneralInformationState = {
  information: GeneralInformation[];
  setGeneralInformation: (information: GeneralInformation[]) => void;
  getGeneralInformation: () => void;
  getGeneralInformationById: (id: number) => Promise<GeneralInformation | null>;
  postGeneralInformation: (information: GeneralInformation) => Promise<GeneralInformation | null>;
  putGeneralInformation: (id: number, information: GeneralInformation) => Promise<GeneralInformation | null>;
  deleteGeneralInformation: (id: number) => Promise<boolean>;
};

export type CoursesState = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  getCourses: () => Promise<Course[] | null>;
  getCourseById: (id: number) => Promise<Course | null>;
  // getCourseByCourseNumber: (courseNumber: string) => void;
  // getCourseByName: (name: string) => void;
  postCourse: (courses: Course) => Promise<Course | null>;
  putCourse: (id: number, courses: Course) => Promise<Course | null>;
  deleteCourse: (id: number) => Promise<boolean>;
};

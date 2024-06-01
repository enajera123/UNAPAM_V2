export interface GeneralInformation {
  id?: number;
  name: string;
  vision: string;
  mission: string;
  description: string;
  image: string;
}

export enum State {
  Active,
  Inactive,
}

export interface User {
  id?: number;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
  phoneNumber: string;
  birthDate: string;
  identification: string;
  state: State;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  Admin,
  User,
}

export enum TypeIdentification {
  Nacional,
  DIMEX,
}

export enum Grade {
  Sin_Estudio,
  Primaria_Completa,
  Primaria_Incompleta,
  Secundaria_Completa,
  Secundaria_Incompleta,
  Universidad_Incompleta,
  Universidad_Completa,
}

export interface Participant {
  id?: number;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  identification: string;
  hasWhatsApp: YesOrNo;
  photo?: string;
  grade: Grade;
  expirationDateMedicalReport?: string;
  expirationDateMedicalInsurance?: string;
  // medicalReport?: MedicalReport;
  referenceContacts?: ReferenceContact[];
  participantAttachments?: ParticipantAttachment[];
  typeIdentification: TypeIdentification;
  participantHealths?: ParticipantHealth;
  participantsOnCourses?: ParticipantOnCourse[];
}

// export interface MedicalReport {
//     id?: number;
//     expirationDate: string;
//     participant?: Participant;
// }

// export interface Policy {
//     id?: number;
//     expirationDate: string;
//     participant?: Participant;
// }

export interface ParticipantAttachment {
  id?: number;
  name: string;
  attachmentFile: Uint8Array;
  participantId: number;
  participant?: Participant;
}

export enum StateParticipantOnCourse {
  Retired,
  Registered,
  Finished,
}

export interface ParticipantOnCourse {
  participantId: number;
  courseId: number;
  state: StateParticipantOnCourse;
  participants?: Participant;
  courses?: Course;
}

export interface ReferenceContact {
  id?: number;
  firstName: string;
  firstSurname: string;
  secondSurname: string;
  phoneNumber: string;
  relationship: string;
  participantId: number;
  participant?: Participant;
}

export interface ParticipantHealth {
  id?: number;
  bloodType: string;
  participantDisseases?: ParticipantDissease[];
  participantMedicines?: ParticipantMedicine[];
  participantId: number;
  participant?: Participant;
}

export interface ParticipantDissease {
  id?: number;
  disease: string;
  description?: string;
  participantHealth?: ParticipantHealth;
  participantHealthId: number;
}

export interface ParticipantMedicine {
  id?: number;
  medicine: string;
  description?: string;
  participantHealth?: ParticipantHealth;
  participantHealthId: number;
}

export enum YesOrNo {
  Yes,
  No,
}

export interface Course {
  id?: number;
  courseNumber: string;
  initialDate: string;
  finalDate: string;
  name: string;
  location?: string;
  professor: string;
  quota: number;
  description?: string;
  state: State;
  needMedicalReport: YesOrNo;
  participantsOnCourses?: ParticipantOnCourse[];
}

export interface image_format {
  image_name?: string;
  image_file?: string;
  image_extension?: string;
  image_path?: string | null;
  image_url?: string;
  image_type?: string;
}

export const defaultImage: image_format = {
  image_url: "/images/default.png",
  image_file: "",
  image_extension: "",
  image_name: "",
  image_path: null,
};

import { User } from "@prisma/client";
import { Course, GeneralInformation, Participant, ParticipantAttachment, ParticipantDissease, ParticipantHealth, ParticipantMedicine, ParticipantOnCourse, ReferenceContact} from "./prisma";




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

export type ParticipantOnCourseState = {
  participantsOnCourse: ParticipantOnCourse[];
  setParticipantsOnCourse: (participantsOnCourse: ParticipantOnCourse[]) => void;
  getParticipantsOnCourse: () => void;
  postParticipantOnCourse: (participantOnCourse: ParticipantOnCourse) => Promise<ParticipantOnCourse | null>;
  putParticipantOnCourse: (participantOnCourse: ParticipantOnCourse) => Promise<ParticipantOnCourse | null>;
};

export type ParticipantMedicineState = {
  participantsMedicine: ParticipantMedicine[];
  setParticipantsMedicine: (participantsMedicine: ParticipantMedicine[]) => void;
  getParticipantsMedicine: () => void;
  getParticipantMedicineById: (id: number) => Promise<ParticipantMedicine | null>;
  postParticipantMedicine: (participantMedicine: ParticipantMedicine) => Promise<ParticipantMedicine | null>;
  putParticipantMedicine: (id: number, participantMedicine: ParticipantMedicine) => Promise<ParticipantMedicine | null>;
  deleteParticipantMedicine: (id: number) => Promise<boolean>;
};


export type ParticipantDisseaseState = {
  participantsDisease: ParticipantDissease[];
  setParticipantsDisease: (participantsDisease: ParticipantDissease[]) => void;
  getParticipantsDisease: () => void;
  getParticipantDiseaseById: (id: number) => void;
  postParticipantDisease: (participantDisease: ParticipantDissease) => Promise<ParticipantDissease | null>;
  putParticipantDisease: (id: number, participantDisease: ParticipantDissease) => Promise<ParticipantDissease | null>;
  deleteParticipantDisease: (id: number) => Promise<boolean>;
};

export type ParticipantAttachmentState = {
  participantsAttachment: ParticipantAttachment[];
  setParticipantsAttachment: (participantsAttachment: ParticipantAttachment[]) => void;
  getParticipantsAttachment: () => void;
  getParticipantAttachmentById: (id: number) => void;
  getParticipantAttachmentByParticipantId: (participantId: number) => void;
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

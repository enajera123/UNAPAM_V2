export interface GeneralInformation {
    id: number;
    name: string;
    vision: string;
    mission: string;
    description: string;
    image: string;
};

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
};

export enum Role {
    Admin,
    User,
}

export enum typeIdentification {
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
    photo?: string | null;
    grade: Grade;
    Policy?: Policy | null;
    MedicalReport?: MedicalReport | null;
    ReferenceContacts?: ReferenceContact[];
    ParticipantAttachments?: ParticipantAttachment[];
    typeIdentification?: typeIdentification;
    ParticipantHealths?: ParticipantHealth | null;
    ParticipantsOnCourses?: ParticipantOnCourse[];
};

export interface MedicalReport {
    id: number;
    expirationDate: string;
    participant: Participant;
};

export interface Policy {
    id?: number;
    expirationDate: string;
    participant?: Participant;
};

export interface ParticipantAttachment {
    id: number;
    name: string;
    attachmentUrl: string;
    participantId: number;
    Participant: Participant;
};

export enum StateParticipantOnCourse {
    Retired,
    Registered,
    Finished,
}

export interface ParticipantOnCourse {
    participantId: number;
    courseId: number;
    state: StateParticipantOnCourse;
    Participants: Participant;
    Courses: Course;
};

export interface ReferenceContact {
    id: number;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    phoneNumber: string;
    relationship: string;
    participantId: number;
    Participant: Participant;
};

export interface ParticipantHealth {
    id: number;
    bloodType: string;
    ParticipantDisseases: ParticipantDissease[];
    ParticipantMedicines: ParticipantMedicine[];
    participantId: number;
    Participant: Participant;
};

export interface ParticipantDissease {
    id: number;
    disease: string;
    description: string | null;
    ParticipantHealth: ParticipantHealth;
    participantHealthId: number;
};

export interface ParticipantMedicine {
    id: number;
    medicine: string;
    description: string | null;
    ParticipantHealth: ParticipantHealth;
    participantHealthId: number;
};

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
    location: string | null;
    professor: string;
    quota: number;
    description: string | null;
    state: State;
    needMedicalReport: YesOrNo;
    ParticipantsOnCourses?: ParticipantOnCourse[];
};
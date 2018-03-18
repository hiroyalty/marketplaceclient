export interface Comment {
    _id: string;
    userId: string;
    username: string;
    userpix: string;
    message: string;
    messageTime: Date;
    projectId: string;
    projectTitle: string;
}
export interface AppUser {
    _id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    //skillset: {
         bigdataNoSQL: string,
         mysql: string, 
         oracle: string, 
         sqlserver: string, 
         postgresql: string, 
         sqlite: string,        
         java: string, 
         python: string, 
         csharp: string, 
         cplusplus: string, 
         c: string, 
         php: string,
         javascript: string, 
         html5: string, 
         networking: string,
         linux: string, 
         windows: string, 
         cloudcomputing: string, 
         devices: string,
         games: string, 
         android: string,
         ios: string, 
         windowsphone: string,
    //},
    cv: string;
    cvicon: string;
    status: string; 
    interestedproject: Array<string>; 
    completedproject: Array<string>;
    numberofongoingproject: number;
    address: {
         street: string,
         city: string,
         region: string,
         zip: string,
    },
    phonenumber: string; 
    coverletter: string;
    coverlettericon: string;
    url: string; 
    bio: string;
    role: string; 
    picture: string; 
    company: string; 
    companyIDNumber: string;
    companycertificate: string;
    companycertificateicon: string;
    
}
/*
export interface AppUser {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
}
*/
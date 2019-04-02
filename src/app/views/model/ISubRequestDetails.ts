export class ISubRequestDetails {
	classGrade: string;
	subject: string;
	timePeriod: string;

    constructor(classGrade: string, subject: string, timePeriod: string) {
       this.classGrade=classGrade;
       this.subject=subject;
       this.timePeriod=timePeriod;
    }

}
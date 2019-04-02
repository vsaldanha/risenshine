import { ISubRequestDetails } from './ISubRequestDetails';

export class IRequestDetails {
	schoolName: string;
	eventType: string;
	eventDate: string;

	subRequestDetails: ISubRequestDetails[];

}
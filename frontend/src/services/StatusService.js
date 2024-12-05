export default class StatusService {
    constructor(statusModel) {
        this.statusModel = statusModel;
        // code here
    }

    async handleGetStatusList() {
        try {
            const statusList = await this.statusModel.getStatusList();
            return statusList;  
        } catch(error) {
            throw new Error('Failed to get status list!');
        }
    }
}
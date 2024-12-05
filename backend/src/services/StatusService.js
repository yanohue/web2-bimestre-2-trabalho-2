export default class StatusService {
    constructor(statusRepository) {
        this.statusRepository = statusRepository
    }

    async getStatusList() {
        const statusList = await this.statusRepository.getStatusList(); 
        return statusList;
    }
}

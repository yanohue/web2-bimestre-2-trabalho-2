export default class StatusRepository {
    constructor(Status) {
        this.Status = Status;
    }

/*////////////////////////////////////////////////////////////////////////////
                    QUERIES
*/////////////////////////////////////////////////////////////////////////////

    async getStatusList() {
        try {
            const statusList = await this.Status.findAll();
            return statusList;
        } catch(error) {
            throw new Error('Failed to retrieve status from database!');
        }
    }
}
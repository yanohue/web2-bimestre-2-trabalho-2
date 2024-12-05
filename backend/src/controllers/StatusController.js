export default class StatusController {
    constructor(app, authControl, statusService) {
        this.app = app;
        this.authControl = authControl;
        this.statusService = statusService;
    }

/*////////////////////////////////////////////////////////////////////////////
                    ENDPOINTS
*/////////////////////////////////////////////////////////////////////////////
    async start() {
        this.app.get('/status', this.authControl.authToken, this.getStatusList.bind(this));
    }

    async getStatusList(req, res) {
        try {
            const statusList = await this.statusService.getStatusList();
            res.status(200).send(statusList);
        } catch(error) {
            res.status(500).send('Failed to retrieve status!');
        }
    }
}


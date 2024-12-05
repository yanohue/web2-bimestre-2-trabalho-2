export default class StatusModel {
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }

    async getStatusList() {
        const token = localStorage.getItem('token');

        if(!token) {
            throw new Error('Token not found!');
        }

        const header = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const response =  await fetch('http://localhost:3000/status', header);
        if(!response.ok) {
            throw new Error('Failed to fetch status list!');
        }
        const statusList = await response.json();
        return statusList;
    }
}
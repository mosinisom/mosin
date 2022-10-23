class Server {
    constructor() {
        this.token;
    }

    async send(params = {}) {
        const query = Object.keys(params)
            .map(key => `${key}=${params[key]}`).join('&');
        const result = await fetch(`api/?${query}`);
        const answer = await result.json();
        return (answer.result === 'ok') ? answer.data : null;
    }

    async login(login, password) {
        if (login && password) {
            const data = await this.send({ method: 'login', login, password });
            this.token = data.token;
            delete data.token;
            return data;
        }
        return null;
    }

    convert(value, systemFrom, systemTo) {
        if (this.token && value && systemFrom && systemTo) {
            return this.send({ 
                method: 'convert', 
                value, 
                systemFrom, 
                systemTo, 
                token: this.token 
            });
        }
        return null;
    }
}
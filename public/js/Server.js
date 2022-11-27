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
            const data = await this.send({ 
            method: 'login', login, password });
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

    async register(login, password, name) {
        if (login && name && password) {
            return await this.send({ 
                method: 'register', 
                login, 
                password, 
                name 
            });
        }
        return null;
    }

    async logout() {
        if (this.token) {
            return await this.send({ 
                method: 'logout', 
                token: this.token 
            });
        }
        return null;
    }

    async sendMail(email, theme, text) {
        if (email && theme && text) {
            return await this.send({ 
                method: 'sendMail', 
                email, 
                theme, 
                text,
                token: this.token,
            });
        }
        return null;
    }

    async checkToken(token) {
        if (token) {
            return await this.send({ 
                method: 'checkToken', 
                token 
            });
        }
        return null;
    }

    async addGameRecord(game, token, score) {
        console.log(game, token, score);
        if (game && token && score) {
            return await this.send({ 
                method: 'addGameRecord', 
                game,
                token,
                score,
            });
        }
        return 'error';
    }

}
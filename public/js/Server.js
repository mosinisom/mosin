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
    
    setToken(token) {
        this.token = token;
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
            const data = await this.send({ 
                method: 'checkToken', 
                token 
            });
            return data;
        }
        return null;
    }

    async addGameRecord(game, token, score) {
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

    async getMails(currentPage) {
        if (currentPage) {
            return await this.send({ 
                method: 'getMails', 
                token: this.token,
                currentPage,
            });
        }
        return 'get mails error';
    }

    async getSentMails(currentPage) {
        if (currentPage) {
            return await this.send({ 
                method: 'getSentMails', 
                token: this.token,
                currentPage,
            });
        }
        return 'error';
    }

    async readMails(){
        return await this.send({ 
            method: 'readMails',
            token: this.token
    });
    }

    async getRecords(gamename, order) {
        if (gamename) {
            return await this.send({ 
                method: 'getRecords', 
                gamename,
                order,
            });
        }
        return 'records error'; 
    }

    async getGamesList() {
        return await this.send({ 
            method: 'getGamesList', 
        });
    }

    async changeGameStatus(game){
        console.log(this.token);
        if (game) {
            return await this.send({ 
                method: 'changeGameStatus', 
                token: this.token,
                game
            });
        }
        return 'error';
    }

}
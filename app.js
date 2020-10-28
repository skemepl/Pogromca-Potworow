function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            zdrowieG: 100,
            zdrowieP: 100,
            runda: 0,
            zwyciezca: null,
            logiWiadomosci: [],
        };
    },
    watch: { // Lepsze jest Śledzenie czegoś niż robienie czegoś w odpowidzi na to.
        zdrowieG(value) {
            if(value <= 0 && this.zdrowieP <= 0) {
                // Remis
                this.zwyciezca = 'remis';
            } else if (value <= 0) {
                // Przegrana gracza
                this.zwyciezca = 'przegrana';
            }
        },
        zdrowieP(value) {
            if(value <= 0 && this.zdrowieG <= 0){
                // Remis
                this.zwyciezca = 'remis';
            } else if (value <= 0) {
                // Wygrana gracza
                this.zwyciezca = 'wygrana';
            }
        }
    },
    
    computed: {
        pasekP() {
            if (this.zdrowieP < 0) {
                return {width: '0%'}
            }
            return {width: this.zdrowieP + '%'}; 
        },
        pasekG() {
            if(this.zdrowieG < 0) {
                return {width: '0%'};
            }
            return {width: this.zdrowieG + '%'};
        },
        przyciskStop() {
           return this.runda % 3 !== 0;
        },
    },

    methods: {
        resetGry() {
            this.zdrowieG = 100;
            this.zdrowieP = 100;
            this.zwyciezca = null;
            this.runda = 0;
            this.logiWiadomosci = [];
        },

        atakP() {
            this.runda++;
            const wartoscAtaku = getRandomValue(1, 8);
            this.zdrowieP = this.zdrowieP - wartoscAtaku;
            this.logi('gracz', 'atak', wartoscAtaku)
            this.atakG();
        },
        atakG() {
            const wartoscAtaku = getRandomValue(7, 12);
            this.zdrowieG -= wartoscAtaku;
            this.logi('potwor', 'atak', wartoscAtaku)
        },
        atakSpecjalny() {
            this.runda++;
            const wartoscAtaku = getRandomValue(12, 30);
            this.zdrowieP -= wartoscAtaku;
            this.logi('gracz', 'atak', wartoscAtaku)
            this.atakG();
        },
        leczenieG() {
            this.runda++;
            const wartoscLeczenie = getRandomValue(7, 20);
            if(this.zdrowieG + wartoscLeczenie > 100) {
                this.zdrowieG = 100;
            } else {
                this.zdrowieG += wartoscLeczenie;
            }
            this.logi('gracz', 'leczenie', wartoscLeczenie);
            this.atakG();
        },
        poddanie() {
            this.zwyciezca = 'przegrana';
        },
        logi(kto, co, ile) {
            this.logiWiadomosci.unshift({       // push dodaje coś na końcu tablicy, unshift dodaje coś na początku tablicy.
                akcja1: kto,
                akcja2: co,
                akcja3: ile,
            }); 
        }
    }
});

app.mount('#game');
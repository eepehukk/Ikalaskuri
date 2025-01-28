const Henkilotunnus = require('./script'); // Viittaa script.js-tiedostoon

describe("Henkilotunnus-luokka", () => {
    test("Henkilötunnuksen validointi onnistuu oikeilla tiedoilla", () => {
        const hetu = new Henkilotunnus("010101-123A");
        expect(() => hetu.validoi()).not.toThrow();
    });

    test("Henkilötunnus heittää virheen väärällä pituudella", () => {
        const hetu = new Henkilotunnus("010101123");
        expect(() => hetu.validoi()).toThrow("Henkilötunnuksessa pitää olla 11 merkkiä!");
    });

    test("Henkilötunnus heittää virheen, kun ensimmäiset 6 merkkiä eivät ole numeroita", () => {
        const hetu = new Henkilotunnus("ABCDE1-123A");
        expect(() => hetu.validoi()).toThrow("Henkilötunnuksen ensimmäiset kuusi merkkiä eivät ole numeroita!");
    });

    test("Henkilötunnus laskee syntymäajan oikein", () => {
        const hetu = new Henkilotunnus("010101-123A");
        const syntymaAika = hetu.laskeSyntymaAika();
        expect(syntymaAika.getFullYear()).toBe(1901);
        expect(syntymaAika.getMonth()).toBe(0); // Tammikuu on 0-indeksoitu
        expect(syntymaAika.getDate()).toBe(1);
    });

    test("Henkilötunnus laskee iän oikein", () => {
        const hetu = new Henkilotunnus("010101-123A");
        const ika = hetu.laskeIka();

        // Manuaalisesti laske nykyisen päivän perusteella ikä
        const nyt = new Date();
        const oletettuVuodet = nyt.getFullYear() - 1901; // Vuosi 1901 (syntymävuosi)
        expect(ika.vuodet).toBe(oletettuVuodet);
    });
});

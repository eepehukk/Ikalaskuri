const Henkilotunnus = require('./script'); // Viittaa script.js-tiedostoon

describe("Henkilotunnus-luokka", () => {
    test("Henkilötunnuksen tarkistus ei onnistu väärällä tarkistusmerkillä", () => {
        const hetu = new Henkilotunnus("010101-123A");
        expect(() => hetu.tarkistaHetu()).toThrow("Henkilötunnuksen tarkistusmerkki (11. merkki) on virheellinen!");
    });

    test("Henkilötunnus heittää virheen väärällä pituudella", () => {
        const hetu = new Henkilotunnus("010101123");
        expect(() => hetu.tarkistaHetu()).toThrow("Henkilötunnuksessa pitää olla 11 merkkiä!");
    });

    test("Henkilötunnus heittää virheen, kun ensimmäiset 6 merkkiä eivät ole numeroita", () => {
        const hetu = new Henkilotunnus("ABCDE1-123A");
        expect(() => hetu.tarkistaHetu()).toThrow("Henkilötunnuksen ensimmäiset kuusi merkkiä eivät ole numeroita!");
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

        // Manuaalisesti laskee nykyisen päivän perusteella iän
        const nyt = new Date();
        const oletettuVuodet = nyt.getFullYear() - 1901; // Vuosi 1901 (syntymävuosi)
        expect(ika.vuodet).toBe(oletettuVuodet);
    });

    test("Henkilötunnuksen kokeilu oikealla hetulla", () => {
        const hetu = new Henkilotunnus("010107A9596");
        expect(() => hetu.tarkistaHetu()).not.toThrow();
    });
});

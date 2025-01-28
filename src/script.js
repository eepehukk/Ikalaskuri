// Luokka, joka käsittelee henkilötunnukseen liittyvät toiminnot
class Henkilotunnus {
    // Constructor-metodi luokan olion alustamiseen
    constructor(hetu) {
        // Tallennetaan henkilötunnus, poistetaan mahdolliset ylimääräiset välilyönnit
        this.hetu = hetu.trim();
    }

    // Tarkistetaan, onko henkilötunnus muodollisesti oikein.
    validoi() {
        // Tarkistetaan, että henkilötunnus on oikean pituinen (11 merkkiä)
        if (this.hetu.length !== 11) {
            throw Error("Henkilötunnuksessa pitää olla 11 merkkiä!");
        }

        // Tarkistetaan, että henkilötunnuksen ensimmäiset kuusi merkkiä ovat numeroita
        const syntymaosa = this.hetu.slice(0, 6);
        if (!/^\d{6}$/.test(syntymaosa)) {
            throw Error("Henkilötunnuksen ensimmäiset kuusi merkkiä eivät ole numeroita!");
        }

        // Tarkistetaan, että henkilötunnuksen 7. merkki (vuosisatamerkki) on sallittu
        const vuosisataMerkki = this.hetu[6];
        if (!"+-YWXVUABCDEF".includes(vuosisataMerkki)) { 
            throw Error("Henkilötunnuksen 7. merkki on virheellinen!"); // Sallittujen merkkien lähteenä Wikipedia
        }
    }

    // Lasketaan henkilön henkilötunnuksesta syntymäaika
    laskeSyntymaAika() {
        // Otetaan talteen henkilötunnuksen ensimmäiset kuusi merkkiä (syntymäpäivä, kuukausi ja vuosi)
        const syntymaosa = this.hetu.slice(0, 6);
        const vuosisataMerkki = this.hetu[6];

        // Muodostetaan hetun pohjalta syntymäpäivän, -kuukauden ja -vuoden numeroarvot.
        const paiva = parseInt(syntymaosa.slice(0, 2), 10);
        const kuukausi = parseInt(syntymaosa.slice(2, 4), 10);
        const vuosi = parseInt(syntymaosa.slice(4, 6), 10);

        // Määritetään vuosituhat 7. merkin perusteella
        let vuosisata;
        if (vuosisataMerkki === '+') {
            vuosisata = 1800; // 1800-luku
        } else if ("-YWXVU".includes(vuosisataMerkki)) {
            vuosisata = 1900; // 1900-luku
        } else if ("ABCDEF".includes(vuosisataMerkki)) {
            vuosisata = 2000; // 2000-luku
        }

        /* Rakennetaan syntymäajasta Date-olio
        HUOM! Kuukaudet ovat nollapohjaisia, joten vähennetään yksi kuukausi Olion rakentamiseksi, mutta tarkistimessa lisätään yksi kuukausi.
        */
        const syntymaAika = new Date(vuosisata + vuosi, kuukausi - 1, paiva);

        // Tarkistetaan, että syntymäaika on todellinen (esim. 32.01.1987 ei ole kelvollinen päivämäärä)
        if (
            syntymaAika.getDate() !== paiva ||
            syntymaAika.getMonth() + 1 !== kuukausi ||
            syntymaAika.getFullYear() !== vuosisata + vuosi
        ) {
            throw Error("Henkilötunnuksen päivämäärä on virheellinen!");
        }

        return syntymaAika;
    }

    // Lasketaan henkilön ikä syntymäajan perusteella
    laskeIka() {
        // Haetaan syntymäaika
        const syntymaAika = this.laskeSyntymaAika();
        const nyt = new Date(); // Nykyinen päivämäärä

        // Lasketaan vuodet, kuukaudet ja päivät
        let vuodet = nyt.getFullYear() - syntymaAika.getFullYear();
        let kuukaudet = nyt.getMonth() - syntymaAika.getMonth();
        let paivat = nyt.getDate() - syntymaAika.getDate();

        // Käsitellään tilanteet, joissa kuukausi tai päivä on "velkaa"
        if (paivat < 0) {
            kuukaudet--;
            // Lasketaan edellisen kuukauden päivien määrä
            const edellinenKuukausi = new Date(nyt.getFullYear(), nyt.getMonth(), 0);
            paivat += edellinenKuukausi.getDate();
        }
        if (kuukaudet < 0) {
            vuodet--;
            kuukaudet += 12;
        }

        // Palautetaan ikä oliona
        return { vuodet, kuukaudet, paivat };
    }
}

// Käyttöliittymän hallinta
function laskeIka() {
    const hetuInput = document.getElementById("hetu"); // Kenttä, johon syötetään henkilötunnus
    const result = document.getElementById("result"); // Kenttä tuloksen näyttämiseen
    const error = document.getElementById("error"); // Kenttä virheviestin näyttämiseen
    result.textContent = "";
    error.textContent = "";

    try {
        // Luodaan uusi Henkilotunnus-olio ja tarkistetaan henkilötunnus
        const hetu = new Henkilotunnus(hetuInput.value);
        hetu.validoi();

        // Lasketaan ikä ja näytetään tulos
        const ika = hetu.laskeIka();
        result.textContent = `Ikä: ${ika.vuodet} vuotta, ${ika.kuukaudet} kuukautta, ${ika.paivat} päivää.`;
    // Virheiden käsittely, jos niitä ilmenee validoinnin tai iän laskun (Syntymäajan )aikana.
    } catch (e) {
        // Näytetään mahdollinen virheviesti
        error.textContent = `Virhe: ${e.message}`;
    }
}

/* Viedään Henkilotunnus-luokka testien käytettäväksi
HUOM!!! Tekoäly kehitti ja opasti testien tekemisessä, mutta päävastuun kannoin itse!!!
*/
module.exports = Henkilotunnus;
# Ikälaskuri

Ikälaskuri on selainpohjainen sovellus, joka laskee käyttäjän iän henkilötunnuksen perusteella. Se tarkistaa syötetyn henkilötunnuksen oikeellisuuden, laskee syntymäajan ja näyttää tuloksena syntymäpäivän ja ikävuodet.

## Asennus ja käyttö

### 1. Lataa tai kloonaa projekti
Lataa tämä projekti haluamallasi tavalla (JOS TÄMÄ TULEE JULKISEKSI).

### 2. Avaa projekti selaimessa
#### Projektin käyttöliittymä on HTML-pohjainen, joten voit avata sen suoraan selaimessa:
1. Avaa src/index.html tiedosto selaimessa esimerkiksi palvelulla "Local host".
2. Syötä henkilötunnus kenttään (esim. 010187-123K).
3. Klikkaa "Laske ikä" -painiketta.
4. Näet syntymäajan ja ikävuodet tuloksena.


### 3. Testaus
Projekti sisältää yksikkötestit, jotka on kirjoitettu Jest -testikirjastolla.

  #### Testien suorittaminen
  ##### 1. Asenna tarvittavat riippuvuudet:
    npm install --save-dev jest
  ##### 2. Siirry kansiorakenteessa src.
  ##### 3. Suorita testit:
    npm test

  #### Testit tarkistavat seuraavat toiminnot:
  - Henkilötunnuksen validointi
  - Syntymäajan laskeminen
  - Iän laskeminen

### Käytetyt teknologiat
- HTML: Käyttöliittymän rakenne, src/index.html.
- CSS: Ulkoasun muotoilu, src/styles.css.
- JavaScript: Sovelluksen logiikka, src/script.js.
- Jest: Yksikkötestaus, src/script.test.js.
- Node.js: testien ajamiseen

### Tulevaisuus
- Tarkoitus oli luoda backend käyttäen rubyä, mutta kaatui siihen, etten ollut tarpeeksi varma latamaan koneelle liikaa tavaraa testatakseni tätä.

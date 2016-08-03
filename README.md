# VampireQuest

Game development crash course peli

## Git ohjeita

### Aloittaminen

Kloonaa tämä projekti omalle koneelle käyttäen komentoa 

``git clone https://github.com/matiasturunen/VampireQuest.git``

Avaa syntynyt `VampireQuest` kansio Unityllä olemassa olevana projektina ja aloita työt

### Muutosten tallentaminen Githubiin

Kun olet muuttanut koodia tai lisännyt uusia tiedostoja, niin tilanteen voi tarkastaa `git status` komennolla. Se näytää muutetut tiedostot ja sen, onko niitä jo lisätty seuraavaan commitiin vai ei.

Lisää haluamasi tiedostot commitoitavaksi komenolla `git add <tiedostonimi>`. Tämä ei vielä siirrä muutoksia palvelimelle.
Kun olet lisännyt kaikki yhteen commitiin tulevat tiedostot, niin tehdään varsinainen commit ja siihen sopiva viesti komenolla `git commit -m '<kuvaava-viesti-tähän>'`. Tämäkään ei vielä siirrä muutoksia palvelimelle, vaan ne menevät paikalliseen repositoryyn. Voit tehdä useita commiteja ennen muutoksien siirtua palvelimelle, jos haluat. Esimerkiksi jos olet muuttanut kolmea tiedostoa niin voit laittaa tiedostot 1 ja 2 ensimmäiseen commitiin ja tiedoston 3 toiseen commitiin.

Seuraavaksi kun muutokset on cimmitoitu paikalliseen repositoryyn, niin on hyvä vielä tarkistaa komenolla `git status` ettei mitään oleellista unohtunut ja pushata muutokset palvelimelle komennolla `git push origin <branch>` jossa <branch> on pushattavan haaran nimi. Haaroista myönemmin lisää.

### Haarat eli branchit

#### Haarojen nimeäminen

Uudelle haaralle on hyvä antaa kuvaava nimi. Eli nimestä pitäisi siis pystyä jotenkin ymmärtämään mitä uusia ominaisuuksia haarassa tehdään. Lisäksi haaralle on hyvä antaa etuliite, josta selviää minkä tyyppisiä muutoksia tehdään. Esimerkkejä:

- feature/enemy-ai <-- ominaisuus, joka tuo vihollisen tekoälyn peliin
- bugfix/player-movement <-- bugikorjaus joka liittyy pelaajan liikkumiseen

#### Haarojen käyttö

Git mahdollistaa erilaisten ominaisuuksien kehittämisen erillään master haarasta sekä muista haaroista. Tämä mahdollistaa sen, että jokainen voi tehdä töitä omassa haarassaan välittämättä siitä että muokkaisivat vaikkapa samaa tiedostoa.
Ennen uuden haaran luontia tarkista että olet varmasti `master` haarassa (tämä helpottaa myöhempää työskentelyä kun haara valmistuu). Uusi haara luodaan komenolla `git branch <haaran-nimi>` ja sinne siirrytään komennolla `git checkout <haaran-nimi>`.

Haarassa voi tehdä muutoksia ja commiteja samalla tavalla kuin masterissa (joka on myöskin haara!), mutta pushatessa muutoksia palvelimelle tulee muistaa pushata ne oikeaan haaraan. Tämä tehdään komennolla `git push origin <haaran-nimi>`. Jos palvelimella ei vielä ole kyseisen nimistä haaraa, niin se luodaan automaattisesti.

Kun haarassa tehty ominaisuus valmistuu, se voidaan yhdistää masteriin. Tämä kannattaa tehdä githubin web-käyttöliittymästä siirtymällä haaraan joka halutaan yhdistää ja painetaan `New pull request` nappia. Kun pullrequest(PR) on tehty, muut voivat kommentoida sitä ja pyytää tarvittaessa tekemään muutoksia. PR yhdistetään masteriin painamalla `merge`-nappia.

### Muutosten lataaminen palvelimelta omalle koneelle

Muuttuneet tiedostot saa ladattua palvelimelta komennolla `git pull`

## Työskentelyohjeita

Masteriin EI pushata suoraan, eli tavoitteena pitää masterissa sellainen versio joka toimii varmasti

Kielenä JavaScript (unityscript), tai sitten jokin muu tilanteeseen sopiva.



a

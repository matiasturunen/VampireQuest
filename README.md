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


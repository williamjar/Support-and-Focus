**Miniprosjekt:** *"Support with Tickets"*
___

Fagkode: TDAT2003

Navn: William Jarbeaux
___
![image showing the functions of the system](https://i.imgur.com/lXMLnjT.png)

**Beskrivelse**

React.js og Node.js-basert "Ticket"-system til å organisere kundebehandling for bedrifter. Hver sak registreres som en "ticket" som kan løses av kundebehandleren. Kundebehandleren kan fokusere ulike "tickets", disse vil da bli lagret i denne posisjonen. 
Ved at "tickets" endrer prioritet, vil man alltid kunne se hvilken kundebehandler som harplukket hvilken sak ut av køen nederst på siden. 
Det er også mulig å kommentere "tickets" og deretter legge dem tilbake i køen. Da kan en annen kundebehandler ta tak i saken og fortsette. 

**Hva er med i dette prosjektet**
* Statisk typesjekking med Flow, på Klient
* React med service-klasser
* Node.js og REST-backend
* Funskjonelle algoritmer i Javascript(feks. .map for at det skal være mulig å lage nok div-objekter til å vise det vi vil fra databasen)
* Tester og CI med GitLab
* Enkel LiveFeed som henter de 5 siste artiklene uavhengig av prioritet ut av databasen hvert 5 sekund
___

![showing single ticket](https://i.imgur.com/JDksOzV.png) 

*Picture: showing single focused (expanded) ticket.*

![ticket showing comments](https://i.imgur.com/qnDrQBa.png)

*Picture showing comments on a focused (expanded) ticket*
___
**Kravliste**

*Da jeg har valgt en litt annen vri på oppgaven, bekrefter jeg at jeg har med kravene som skal til.*

**Ticket** sine attributter:
* Overskrift (headline/ordrenummer)
* Innhold (content)
* Tidspunkt (post_date, lagres i databasen med nøyaktighet, men vises kun med minutt på nettsiden)
* Bilde (picture)
* Kategori (group, brukes til å gruppere tickets)
* Viktighet (priority, brukes til å trekke "tickets" ut av jobbkøen)

Annet:
Kategorier(groups) lagres i databasen.
LiveFeed er med.
Kommentarer for "tickets" er med. Har med andre funksjoner som et "ticket"-system krever å ha med. Fokus på å lage et godt grunnlag for videre utvidelser.
___
**Installation guide**

### Server
```
cd server
npm install
npm test
npm start
```
### Client
```
cd client/react-api
npm install
npm test
npm start
```
###Flow

*Flow has been ran locally in both directories mentioned above.*


# App link: [fiipractic-alextoderica.web.app](https://fiipractic-alextoderica.web.app/)

## Pagini

*Pentru accesarea paginilor utilizatorul trebuie să fie autentificat. La înregistrare, atât numele de utilizator, cât și emailul nu trebuie să existe deja.*

* **Home** - Afișează postările tuturor persoanelor pe care utilizatorul autentificat le urmărește și postările proprii. Dacă utilizatorul nu urmărește nicio persoană, va afișa postările tuturor persoanelor înregistrate. Dacă pagina este deschisă pe un desktop, în partea dreaptă a imaginii apar ultimii 5 utilizatori activi care nu sunt urmăriți de utilizatorul autentificat (sugestii).

* **Direct** *(„Instagram Direct” / „Direct Messages”)* - Afișează conversațiile utilizatorului și mesajele din aceasta, după ce este selectată. Utilizatorul autentificat poate crea o conversație cu orice altă persoană.

* **Explore** *(„Find People”)* - Afișează o grilă cu postările tuturor persoanelor înregistrate.

* **Profile** - Afișează profilul unui utilizator, pagina fiind accesibilă fie din bara de navigare, fie la interacționarea cu numele de utilizator al oricărei persoane. Utilizatorul poate vedea profilul oricui. În profil sunt afișate:
  * Imaginea de profil;
  * Numele de utilizator;
  * Unul din butoanele *„Follow”*, *„Unfollow”* sau *„Edit profile”*;
  * Numărul de postări, persoane care urmăresc persoana sau persoanele urmărite de acea persoană;
  * Numele întreg;
  * Descrierea *(„bio”)*;
  * Postările persoanei, în grilă, asemănător paginii *„Explore”*.

## Diverse funcționalități implementate

* La orice postare/apreciere/comentariu/mesaj se stochează ID-ul unic al utilizatorului și nu numele de utilizator și fotografia de profil din acel moment. Astfel, utilizatorul își poate schimba numele de utilizator și fotografia de profil în orice moment, iar schimbarea va fi reflectată peste tot.

* Am încercat să fac aplicația să fie cât mai asemănătoare cu site-ul [instagram.com](https://instagram.com/); până la urmă aplicația se numește *„instagram-clone”* pentru un motiv.

* Aplicația este responsive.

* A fost implementat un sistem de mesagerie, inspirat din *„Instagram Direct”*. Utilizatorul autentificat poate crea o conversație cu oricine.

* Utilizatorul poate vedea când au fost ultima oară active în aplicație persoanele cu care conversează, în pagina *„Direct”*.

* Utilizatorul își poate schimba din propriul profil imaginea de profil, numele de utilizator, numele întreg și descrierea. Modificările se vor reflecta în întreaga aplicație.

* În pagina principală, utilizatorul vede postările doar de la persoanele urmărite de acesta, dar poate descoperi persoane noi din partea dreaptă a paginii, unde îî sunt sugerate 5 persoane; în acest moment acestea sunt ordonate descrescător după timpul în care au fost ultima oară activi.

* La grila cu postări din paginile *„Explore”* și *„Profile”*, la aducerea cursorului deasupra unei postări, sunt afișate numărul de aprecieri și de comentarii, comportament asemănător și site-ului [instagram.com](https://instagram.com/).

* La interacțiunea cu una din postările din paginile *„Explore”* și *„Profile”*, sau la interacțiunea cu butonul ce indică momentul postării (în pagina *„Home”*), utilizatorul va vedea postarea într-o pagină separată.

* Este restricționată atât crearea sau modificarea de conturi cu un nume de utilizator deja existent atât la pagina de înregistrare, cât și la pagina *„Profile”*.

Deployed app: https://fiipractic-instagram-clo-35289.web.app/signup
----------------------------------
Features:
----------------------------------
-----Profile Page----- 
        -- route '/profile/<userid>' sau '/myprofile' pentru profil propriu
        -- optiune 'profile' din dropdownul de pe numele utilizator din header
        -- click pe numele utilizatorilor = redirect catre pagina lor (posts/comments/likes/follow lists)

-Follow/Unfollow sau Edit Profile (in cazul in care ne aflam pe propriul nostru profil)
-Numar posts
-Numar followers, following -> click followers/following = open modal cu persoanele care ne urmaresc/sunt urmarite de noi
-Description
-Posts Render

---Edit Profile 
    - deschide modal care ne lasa sa ne editam datele despre profil (poza, nume, descriere)
---Posts: 
    -vizualizare numar likes/comments 
    -posibilitate de vizualizat persoanele care au commentat/au dat like prin click pe icons.
    -posibilitate delete post (click pe coș), in cazul in care suntem pe profilul nostru.
----------------------------------
----------------------------------
-----Home Page-----
        -- route '/home'
        -- icon 'home' de pe header

-Postari ale persoanelor pe care le urmarim, ordine descrescatoare.
-In cazul in care nu urmarim nicio persoana sau nicio persoana urmarita nu are posts avem un mesaj cu instructiuni
----------------------------------
----------------------------------
-----News Feed Page-----
        -- route '/feed'
        -- icon 'feed' de pe header

-Postarile tuturor utilizatorilor din sistem in ordine descrescatoare.
----------------------------------
----------------------------------
-----Private messages Page-----
        -- route '/pm'
        -- icon 'inbox' de pe header

--Lista cu utlizatori
--Search User Bar
--Conversatia cu un utilizator selectat
--Un utilizator apare in lista daca este urmarit si te urmareste.
----------------------------------
-> Alte mentiuni:
-- Un comentariu poate fi sters daca esti creatorul comentariului sau detinatorul postarii la care s-a facut acel comentariu.
-->Posibil sa dureze cateva secunde (5-10) pana se actualizeaza iconitele de profil in listele de likes/comments/followers/followings
----------------------------------

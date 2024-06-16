# 1. Identyfikacja zagadnienia biznesowego
    Celem projektu jest stworzenie aplikacji, która umożliwi użytkownikom łatwe i intuicyjne tworzenie oraz zarządzanie spersonalizowanymi katalogami filmów. Aplikacja pozwala na tworzenie, modyfikowanie i usuwanie katalogów filmów wewnątrz jego biblioteki, a także na zarządzanie poszczególnymi filmami poprzez dodawanie, usuwanie i zmianę ich nazw. Wszystkie operacje są realizowane za pośrednictwem serwisu bunny.net, wiodącego dostawcy usług CDN (Content Delivery Network). Dodatkowo, aplikacja umożliwia autoryzację i powiązanie konta użytkownika z serwisem bunny.net bezpośrednio z poziomu aplikacji. Aplikacja ma przyciągać użytkowników swoją prostotą i wygodą w zarządzaniu katalogami ulubionych filmów, wzorując się na popularności i funkcjonalności aplikacji do strumieniowania muzyki, które umożliwiają łatwe tworzenie playlist jako kluczową cechę. Sprecyzowane cele i potrzeby są w pełni zrealizowane w aplikacji będącej produktem projektu. Możliwe rozszerzenia funkcjonalności obejmują wprowadzenie systemu rekomendacji bazującego na upodobaniach użytkownika oraz tematyce poszczególnych katalogów filmów, a także utworzenie systemu automatycznego tworzenia tematycznych katalogów filmowych.

# 2. Wymagania systemowe i funkcjonalne
    Projekt zbudowany jest według reguł architektury MVC oraz dzieli się na dwie części: serwerową oraz kliencką. Komunikacja między tymi częściami odbywa się asynchronicznie z wykorzystaniem REST API. 

    Część serwerowa wykorzystuje środowisko uruchomieniowe Node.js oraz framework Express, korzysta ona z relacyjnej bazy danych SQLite przy wykorzystaniu Sequalize, który pełni tutaj role ORM'a (Object-Relational Mapping). Serwer posługuje się również otwartym standardem przemysłowy JWT (JSON Web Token). Pozyskiwanie informacji oraz filmów odbywa się przy pomocy API serwisu bunny.net na którym bazuje cała aplikacja. W celu zapewnienia bezpieczeństwa wykorzystywana jest również biblioteka Bycrypt.

    Część kliencka opiera się na wykorzystaniu biblioteki React.

    Funkcjonalności aplikacji:

    Zarządzanie katalogami filmów:
    - Utworzenie nowego katalogu
    - Zmiana nazwy katalogu
    - Usunięcie katalogu
    - Dodanie filmu do katalogu
    - Usunięcie filmu z katalogu
    
    Zarządzanie filmami:
    - Dodanie filmu
    - Zmiana nazwy filmu
    - Usunięcie filmu
    - Podgląd filmu

# 3. Analiza zagadnienia i jego modelowanie
    Baza danych:
    
    ![database](doc_images/database.png)

    id: numer porządkowy użytkownika
    username: nazwa wybrana przez użytkownika
    email: adres email użytkownika
    password: hasło użytkownika
    apiKey: klucz API slużący do powiązania konta z bunny.net
    libraryID: numer porządkowy biblioteki w której przetrzymujemy katalogi z filmami

    Przepływ danych z API bunny.net

    Endpointy:

# 4. Implementacja






# 5. Podsumowanie
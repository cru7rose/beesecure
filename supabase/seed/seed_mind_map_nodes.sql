-- Seed mapy myśli BeeSecure (tabela mind_map_nodes)
-- Uruchom po migracji: psql $DATABASE_URL -f supabase/seed/seed_mind_map_nodes.sql
-- lub przez Supabase Dashboard SQL Editor

insert into public.mind_map_nodes (id, parent_id, label, description, icon, branch, "order") values
('root', null, 'BeeSecure', 'Zespół projektowy specjalizujący się w rozwiązaniach IoT, automatyce budynkowej oraz systemach kontroli dostępu. Łączymy kompetencje z zakresu elektroniki, komunikacji bezprzewodowej ZigBee oraz tworzenia bezpiecznego oprogramowania webowego.', '🐝', 'root', 0),
('o-nas', 'root', 'O nas', 'Kompetencje: elektronika, komunikacja ZigBee, bezpieczne oprogramowanie webowe. IoT, automatyka budynkowa, kontrola dostępu.', '👥', 'o-nas', 1),
('klient', 'root', 'Klient & grupa docelowa', 'Przedsiębiorcy i firmy zarządzające najmem krótkoterminowym – apartamenty, mieszkania, obiekty noclegowe (Booking, Airbnb).', '🎯', 'klient', 2),
('architektura', 'root', 'Architektura systemu', 'Trzy filary: zamek elektroniczny, gateway (urządzenie komunikacyjne), aplikacja webowa.', '🏗️', 'architektura', 3),
('geneza', 'root', 'Geneza problemu', 'Rynek najmu krótkoterminowego rośnie, a tradycyjny model z fizycznymi kluczami jest nieefektywny ekonomicznie i operacyjnie.', '💡', 'geneza', 4),
('klient-uzytkownicy', 'klient', 'Użytkownicy systemu', 'Właściciele nieruchomości, operatorzy, firmy serwisowe, goście w wieku 18–65 lat.', '👤', 'klient', 0),
('zamek', 'architektura', 'Zamek elektroniczny', 'Zintegrowany pinpad, moduł ZigBee, kody czasowe, zasilanie bateryjne, awaryjny klucz fizyczny.', '🔐', 'architektura', 0),
('gateway', 'architektura', 'Gateway', 'Urządzenie komunikacyjne: komunikacja serwer–urządzenie, integracja z siecią ZigBee, lokalna sieć domowa.', '📡', 'architektura', 1),
('aplikacja', 'architektura', 'Aplikacja webowa', 'Generowanie kodów dostępu, definiowanie doby hotelowej, zarządzanie serwisantami, zdalne administrowanie.', '🌐', 'architektura', 2),
('geneza-bariery', 'geneza', 'Bariery rynkowe', 'Nieregularne godziny przyjazdu, koszty personelu, konieczność obecności, zagubione klucze, brak kontroli dostępu, zdalne zarządzanie.', '⚠️', 'geneza', 0),
('zamek-pinpad', 'zamek', 'Zintegrowany pinpad', 'Wprowadzanie kodów dostępu bezpośrednio na zamku.', '⌨️', 'architektura', 0),
('zamek-zigbee', 'zamek', 'Moduł ZigBee', 'Komunikacja bezprzewodowa z gateway.', '📶', 'architektura', 1),
('zamek-kody', 'zamek', 'Kody czasowe', 'Kody ważne w określonym przedziale czasowym (np. doba hotelowa).', '⏱️', 'architektura', 2),
('zamek-bateria', 'zamek', 'Zasilanie bateryjne', 'Działanie bez stałego przyłącza elektrycznego.', '🔋', 'architektura', 3),
('zamek-klucz', 'zamek', 'Awaryjny klucz fizyczny', 'Dostęp awaryjny przy braku zasilania lub awarii.', '🔑', 'architektura', 4),
('gw-sync', 'gateway', 'Komunikacja serwer–urządzenie', 'Synchronizacja kodów i zdalne zarządzanie.', '🔄', 'architektura', 0),
('gw-zigbee', 'gateway', 'Integracja ZigBee', 'Połączenie z zamkami w sieci ZigBee.', '📡', 'architektura', 1),
('gw-lan', 'gateway', 'Lokalna sieć domowa', 'Gateway w sieci WiFi/LAN obiektu.', '🏠', 'architektura', 2),
('app-kody', 'aplikacja', 'Generowanie kodów dostępu', 'Tworzenie i przypisywanie kodów gościom i serwisantom.', '🔢', 'architektura', 0),
('app-doba', 'aplikacja', 'Definiowanie doby hotelowej', 'Ustawienie godzin zameldowania/wymeldowania.', '📅', 'architektura', 1),
('app-serwis', 'aplikacja', 'Zarządzanie serwisantami', 'Kody czasowe dla pracowników technicznych.', '🔧', 'architektura', 2),
('app-admin', 'aplikacja', 'Zdalne administrowanie', 'Pełna kontrola z dowolnej lokalizacji.', '🖥️', 'architektura', 3),
('gen-noc', 'geneza-bariery', 'Nocne zameldowania', 'Nieregularne godziny przyjazdu gości.', '🌙', 'geneza', 0),
('gen-koszty', 'geneza-bariery', 'Koszty personelu', 'Wysokie koszty zatrudnienia do przekazywania kluczy.', '💰', 'geneza', 1),
('gen-obecnosc', 'geneza-bariery', 'Konieczność obecności', 'Osobista obecność właściciela lub recepcjonisty.', '📍', 'geneza', 2),
('gen-zagubione', 'geneza-bariery', 'Zagubione klucze', 'Kosztowna wymiana wkładek zamkowych.', '❌', 'geneza', 3),
('gen-kontrola', 'geneza-bariery', 'Brak kontroli nad dostępem', 'Trudna kontrola dostępu pracowników technicznych.', '🔒', 'geneza', 4),
('gen-zdalnie', 'geneza-bariery', 'Zdalne zarządzanie', 'Zarządzanie nieruchomościami z innej lokalizacji.', '🌍', 'geneza', 5)
on conflict (id) do update set
  parent_id = excluded.parent_id,
  label = excluded.label,
  description = excluded.description,
  icon = excluded.icon,
  branch = excluded.branch,
  "order" = excluded."order",
  updated_at = now();

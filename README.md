# tcp-sockets-js
A university project implementing TCP socket communication in JavaScript (Node.js).

## Përshkrim

Ky projekt implementon një sistem client-server duke përdorur **TCP sockets dhe HTTP server** në Node.js.  <br>
Sistemi menaxhon klientë të shumtë, komanda për file system dhe monitorim në kohë reale përmes endpoint-it `/stats`.  <br>
Përdor koncepte si **socket programming, file handling dhe role-based access (admin/user)**.<br>

## Qëllimi

Qëllimi i këtij projekti është:  <br>
- të kuptohen konceptet e **network programming**
- të implementohet një sistem real client-server
- të demonstrohet menaxhimi i klientëve, file-ve dhe monitorimi i serverit

Ky projekt zgjidh problemin e: <br>
- menaxhimit të shumë klientëve
- kontrollit të aksesit (admin vs user)
- monitorimit të aktivitetit në server

##  Project Structure
project/<br>
      server/ → logjika kryesore e serverit<br>
      data/ → ruajtja e të dhënave (JSON)<br>
      client/ → klienti që lidhet me serverin<br>


- `server/` → përmban TCP dhe HTTP server + module<br>
- `data/` → ruan users, logs dhe messages<br>
- `client/` → programi që përdor klienti për t’u lidhur<br>

## Si Funsksionon

1. Klienti (`client.js`) lidhet me TCP server <br>
2. Dërgon kredenciale dhe komanda  <br>
3. `auth.js` verifikon përdoruesin përmes `users.json`  <br>
4. `tcp_server.js` vendos çfar komandë të ekzekutojë  <br>
5. `file_manager.js` kryen operacionet mbi file  <br>
6. `logger.js` ruan aktivitetin në `logs.json` dhe `messages.json`  <br>
7. `connection_manager.js` menaxhon lidhjet aktive  <br>
8. Në paralel, `http_server.js` ofron `/stats`<br>  
9. `stats_manager.js` lexon logs dhe kthen statistika  <br>

## Permbledhja e Moduleve

### Core (Server)

- `tcp_server.js` → menaxhon klientët dhe komandat  
- `http_server.js` → jep statistika (/stats)  
- `config.js` → konfigurimet globale  
- `connection_manager.js` → menaxhon lidhjet aktive  

### Data & Logic

- `users.js` → lexon/shkruan users.json  
- `auth.js` → autentikim dhe role  
- `logger.js` → ruan logs dhe mesazhe  
- `stats_manager.js` → përgatit statistikat  
- `file_manager.js` → operacione me file  

### Optional

- `math_engine.js` → funksionalitete shtesë (opsionale)  

### Client

- `client.js` → lidhet me TCP server dhe dërgon komanda  

import socket
import threading
import gzip

lock = threading.Lock()
cerere_number_global = 1


def get_content_type(extension):
    if extension == 'html':
        return "text/html"
    elif extension == 'css':
        return "text/css"
    elif extension == 'js':
        return "application/js"
    elif extension == 'png':
        return "text/png"
    elif extension == 'jpg' or extension == 'jpeg':
        return "text/jpeg"
    elif extension == 'gif':
        return "text/gif"
    elif extension == 'ico':
        return "image/x-icon"
    elif extension == 'xml':
        return "application/xml"
    elif extension == 'json':
        return 'application/json'


def http_builder(data, filename=None, compress=False, status='200 OK'):
    html_response = "HTTP/1.1 {}\r\n".format(status)
    html_response += "Content-Length: " + str(len(data)) + "\r\n"
    if filename:
        html_response += "Content-Type: {}\r\n".format(get_content_type(filename.split('.')[-1]))
    else:
        html_response += "Content-Type: text/html\r\n"
    if compress:
        html_response += "Content-Encoding: gzip\r\n"
    html_response += "Server: server_web.py\r\n\r\n"
    return html_response


def treat_client(clientsocket, address):
    global cerere_number_global, lock
    cerere_number = cerere_number_global
    lock.acquire()
    cerere_number_global += 1
    lock.release()

    print('S-a conectat un client. [Index cerere = {}][Start Thread]'.format(cerere_number))
    cerere = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if pozitie > -1:
            linie_de_start = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linie_de_start + ' #####')

            need_compression = False
            pozitie_gzip = cerere.find('gzip')
            if pozitie_gzip > -1:
                print("Encoding accepted")
                need_compression = True

            linie_de_start_splitter = linie_de_start.split()
            method = linie_de_start_splitter[0]
            print("Method : {}".format(method))
            if method == 'GET':
                filename = (linie_de_start_splitter[1] if linie_de_start_splitter[1] != "/" else "/index.html")
                filename = filename.replace("/", "")
                print(filename)
                try:
                    file = open(filename, "rb")
                    data = file.read()
                    if need_compression:
                        data = gzip.compress(data)
                    html_response = http_builder(data, filename=filename, compress=need_compression)
                    print("\n\n-------Sending html response------------\n{}\n\n".format(html_response))
                    clientsocket.sendall(html_response.encode(encoding='UTF-8') + data)
                    break
                except FileNotFoundError:
                    data = "Pagina {} ceruta nu exista".format(linie_de_start.split()[1])
                    if need_compression:
                        data = gzip.compress(data.encode())
                    html_response = http_builder(data, compress=need_compression, status='404 Not found')
                    print("\n\n-------Sending html response------------\n{}\n\n".format(html_response))
                    clientsocket.sendall(html_response.encode(encoding='UTF-8') + data)
                    break
        else:
            break
    print('S-a terminat citirea.')
    clientsocket.close()
    print('S-a terminat comunicarea cu clientul cu cererea {}.[Stop Thread]'.format(cerere_number))


def main():
    serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    serversocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    serversocket.bind(('', 1000))
    serversocket.listen(3)
    threads = []
    try:
        while True:
            print('#########################################################################')
            print('Serverul asculta potentiali clienti.')
            (clientsocket, address) = serversocket.accept()
            t = threading.Thread(target=treat_client, args=(clientsocket, address))
            t.start()
            threads.append(t)
    finally:
        for thread in threads:
            thread.join()


if __name__ == '__main__':
    main()
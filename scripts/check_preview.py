"""Exercise cache policy and same-timestamp rebuilds over real local HTTP."""
from functools import partial
from http.client import HTTPConnection
from http.server import ThreadingHTTPServer
from pathlib import Path
from tempfile import TemporaryDirectory
from threading import Thread
import os

from serve_site import PreviewHandler


class QuietHandler(PreviewHandler):
    def log_message(self, *args):
        pass


with TemporaryDirectory() as directory:
    root = Path(directory)
    (root / 'index.html').write_text('old home')
    (root / 'assets').mkdir()
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=directory))
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()

    def request(path, headers=None, method='GET'):
        connection = HTTPConnection('127.0.0.1', server.server_port)
        connection.request(method, path, headers=headers or {})
        response = connection.getresponse()
        result = response.status, dict(response.getheaders()), response.read()
        connection.close()
        assert result[1]['Cache-Control'] == 'no-store', result
        return result

    try:
        status, headers, body = request('/')
        assert status == 200 and body == b'old home'
        timestamp = (root / 'index.html').stat().st_mtime
        (root / 'index.html').write_text('new home')
        os.utime(root / 'index.html', (timestamp, timestamp))
        for path in ['/', '/index.html', '/index.html?v=old']:
            status, _, body = request(path, {'If-Modified-Since': headers['Last-Modified']})
            assert status == 200 and body == b'new home', (path, status, body)
        assert request('/index.html', {'If-None-Match': 'old'})[0] == 200
        assert request('/index.html', method='HEAD')[0] == 200
        assert request('/assets')[0] == 301
        assert request('/missing.html')[0] == 404
        print('PASS: no-store responses; fresh Home bytes despite unchanged timestamps; root/index, conditional requests, redirects, HEAD and errors.')
    finally:
        server.shutdown()
        server.server_close()
        thread.join()

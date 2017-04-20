
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var express = require('express');

var basePath = path.resolve();
console.log(basePath);

var app = express();
app.set('port', 8080);
app.use('/node_modules', express.static(path.join(basePath, '/node_modules')));

var reloadify = require('./lib/reloadify');
reloadify(app, __dirname + '/src');


app.all('*', function(req, res) {

	let pathname = url.parse(req.url).path;
    if (pathname === '/') {
        pathname = '/index.html';
    } else if (pathname === '/favicon.ico') {
		res.end();
	}

    var stream = fs.createReadStream(path.join(basePath, '/src', pathname));

    stream.on('readable', function() {
		stream.pipe(res);
	});
	stream.on('end', function() {
    	res.end();
	});

});

var server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log('Server running on port ' + app.get('port'));
});



















// "build:watch": "watch-run -p 'src/**' npm run serve",
// "start": "concurrently \"npm run build:watch \" \"npm run serve\""



// http.createServer(function (req, res) {
//     let pathname = url.parse(req.url).path;
//     if (pathname === '/') {
//         pathname = '/index.html';
//     } else if (pathname === '/favicon.ico') {
// 		res.end();
// 	}

//     var stream = fs.createReadStream(path.join(basePath, '/src', pathname));

//     stream.on('readable', function() {
// 		stream.pipe(res);
// 	});
// 	stream.on('end', function() {
//     	res.end();
// 	});

// }).listen(8080);







/*
let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

let basePath = path.resolve('task011/my_site');
console.log(basePath);

let mimeTypes = {
	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif'
};

http.createServer(function (req, res) {
    let pathname = url.parse(req.url).path;
	if (pathname == '/') {
		pathname = '/index.html';
	}
    let extname = path.extname(pathname);
	console.log(extname);
    let mimeType = mimeTypes[path.extname(pathname)];
	pathname = pathname.substring(1, pathname.length);


	if ((extname == ".gif") || (extname == ".jpeg")) {
        let img = fs.readFileSync(basePath + "/" + pathname);
		res.writeHead(200, {'Content-Type': mimeType});
		res.end(img);
	}
	else if (extname == ".ico") {
		res.end();
	}
	else {
		// fs.readFile(basePath + '/' + pathname, 'utf-8', function(err, data) {
		// 	if (err) {
		// 		console.log('Could not find or open file ' + pathname + ' for reading\n');
		// 	} else {
		// 		console.log(pathname + " " + mimeType);
		// 		res.writeHead(200, {'Content-Type': mimeType});
		// 		res.end(data);
		// 	}
		// })
		var stream = fs.createReadStream(basePath + '/' + pathname, {encoding: 'utf8'});

		stream.on('readable', function() {
            // let data = stream.read();
            // if (data) {
            //     res.write(data);
            // }
            stream.pipe(res);
        });
		stream.on('end', function() {
		    res.end();
        });
	}
}).listen(8080);

console.log('Server running on 8080');
*/
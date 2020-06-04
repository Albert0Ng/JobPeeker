/*
//---> Simple node.js script to serve and handle files, css, html and javascript <---\\
*/

// Required Functions / settings
// Add your database or other req. variables here

const http = require('http');
const hostname = 'localhost';
const port = 3000;
const file = require('fs');
const path = require('path');


//these are the only file types we will support for now
extensions = {
	".html" : "text/html",
	".css" : "text/css",
	".js" : "application/javascript",
	".png" : "image/png",
	".gif" : "image/gif",
	".jpg" : "image/jpeg"
};

//helper function handles file verification
function getFile(filePath,res,page404,mimeType){
	//does the requested file exist?
	file.exists(filePath,function(exists){
		//if it does...
		if(exists){
			//read the file, run the anonymous function
			file.readFile(filePath,function(err,contents){
				if(!err){
					//if there was no error
					//send the contents with the default 200/ok header
					res.writeHead(200,{
						"Content-type" : mimeType,
						"Content-Length" : contents.length
					});
					res.end(contents);
				} else {
					//for our own troubleshooting
					console.dir(err);
				};
			});
		} else {
			//if the requested file was not found
			//serve-up our custom 404 page
			file.readFile(page404,function(err,contents){
				//if there was no error
				if(!err){
					//send the contents with a 404/not found header 
					res.writeHead(404, {'Content-Type': 'text/html'});
					res.end(contents);
				} else {
					//for our own troubleshooting
					console.dir(err);
				};
			});
		};
	});
};

//a helper function to handle HTTP requests 
//*** This is where you can change/add your .html home (login) page ***
function requestHandler(req, res) {
	var
	fileName = path.basename(req.url) || 'Dashboard.html',
	ext = path.extname(fileName),
	localFolder = __dirname + '/public/',
	page404 = localFolder + '404.html';
 
	//do we support the requested file type?
	if(!extensions[ext]){
		//for now just send a 404 and a short message
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
	};
 
	//call our helper function
	//pass in the path to the file we want,
	//the response object, and the 404 page path
	//in case the requestd file is not found
	getFile((localFolder + fileName),res,page404,extensions[ext]);
};
 
// create the server and confirm connection in the console
const server = http.createServer(requestHandler)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

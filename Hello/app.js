var http = require('http');
var fs = require('fs');

// local var http is used to instantiate the http.createServer function
http.createServer(function(req,res){

    var name = require('url').parse(req.url,true).query.name;

    if(name===undefined){
        name = 'world';
    };

    if(name=='burningbird'){
        var file = 'burningbird.jpg';

        fs.stat(file,function(err,stat){
            if(err){
                console.log(err);
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end("Sorry, bird not found\n");
            }else{
                // fs.readFile(file,function(err,data){
                //     res.contentType = 'image/png';
                //     res.contentLength = stat.size;
                //     res.end(data,'binary');
                // });
                var img = fs.readFileSync(file);
                res.contentType = 'image/jpg';
                res.contentLength = stat.size;
                res.end(img,'binary');
            }
        });
    }
    else{
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end('Hello there '+name+'\n');
    };



}).listen(8124);

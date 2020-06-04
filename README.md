# JobPeeker

For educational purposes.  

Always good to put some info in the readme about installing / dependencies or purpose of project.

Application will be running on an Ubuntu 18.04 Web Server.  To deploy.  Follow these instructions.

This walkthrough assumes your are using an ubuntu 18.04 server, nginx, node.js, html5, css, but the instructions/processes are similar for windows or mac and other languages or frameworks.

TODO: Add dependencies here

_______________________________________________________________________

Start...
_______________________________________________________________________


Install node.js using curl with these two commands. One after the other.

    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

    sudo apt-get install -y nodejs

Check versions of node and npm with these commands one after the other if you like:

    node -v

    npm -v

That's it for node.

_______________________________________________________________________

Networking with nginx:

Install nginx to manage your server and routing:

    sudo apt-get install nginx

THERE IS NO FIREWALL ON YOUR SERVER: You can check firewall status with this command:

    sudo ufw status

and should see something like this in the output: 

    Status: inactive

... or this if you have setup Firewall and specifically allowed Nginx:

    Nginx HTTP (v6) ALLOW   Anywhere (v6)

... or maybe even this:

    Output
    Status: active

    To                         Action      From
    --                         ------      ----
    OpenSSH                    ALLOW       Anywhere                  
    Nginx HTTP                 ALLOW       Anywhere                  
    OpenSSH (v6)               ALLOW       Anywhere (v6)             
    Nginx HTTP (v6)            ALLOW       Anywhere (v6)


You can now navigate your IP ADDRESS (ie: http://142.93.243.149 but replace the numbers with your server) and should see the welcome to NGINX Page or an error page that says NGINX on it somewhere.

Congratulations!  You have laid the groundwork for your server.

Useful nginx commands and further information about extra things you could do with nginx for this project can be found in the following link or in the official documentation: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04

Most notably useful nginx commands for your project that need no explanation:

    sudo systemctl stop nginx
    sudo systemctl start nginx
    sudo systemctl restart nginx
    sudo systemctl reload nginx

To check your nginx file for syntax errors use this (little more cryptic) rather useful command:

    sudo nginx -t


_______________________________________________________________________

Clone the repository, project or branch you are working with.  

You can copy and paste the code or rebuild step by step if you prefer.

From here, it is assumed you are working in a project folder called JobPeeker

_______________________________________________________________________

Your directory structure could end up looking something like this:

    JobPeeker
    |   |
    |   public
    |        |
    |         404.html
    |         Dashboard.html
    |         Function.js
    |         Login.html
    |         Style.css
    |
    app.js
    README.md
    package.json

_______________________________________________________________________

OK...

Now we're going to edit your default nginx configuration file so that it works for our project.

To edit your DEFAULT nginx config file using nano or vim from console (below) or use your IDE if you've connected to VSCode to your server via SSH:

    sudo nano /etc/nginx/sites-available/default

...or find this file in your IDE on your server and change it:

    /etc/nginx/sites-available/default

For now you'll want to change your nginx default code to something like this (change any PORTS / LOCATIONS to match your project):

    server {
        listen 80 default_server;
        listen [::]:3000;
        listen [::]:80 default_server;

        root /var/www/html;

        location / {
                default_type application/octet-stream;
                include /etc/nginx/mime.types;
                proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        }
    }

Save your code. (and close the file if in console mode)

Check your nginx for syntax errors in the console:

    sudo nginx -t

If there are no syntax errors then restart nginx in the console to enable your changes:

    sudo systemctl restart nginx

Later you can setup multiple locations for different ports or applications if you want: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04 - or check the official documentation

_______________________________________________________________________

If everything is setup correctly, you should now be able to run:

    sudo node app.js

Check your site for site for success by entering your IP address in a web browser or refreshing your existing browser.  






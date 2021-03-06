

# AWS setup
## Basics

### create EC2 instance (ubuntu)
### install nginx
`sudo apt-get install nginx`

on AWS, add rule to allow http/s traffic

### install git
`sudo apt-get install git`

### install mysql, if you need it
`sudo apt-get install mysql-server`
`/usr/bin/mysql_secure_installation`

`sudo service mysql start`

to launch at reboot
`sudo /usr/sbin/update-rc.d mysql defaults`

run mysql shell
`/usr/bin/mysql -u root -p`

create some database
`CREATE DATABASE someDB;`
create some user
`CREATE USER 'someusername'@'%' IDENTIFIED BY 'some_pass';`

`GRANT ALL PRIVILEGES ON somedbname.* TO 'someuser'@'%'`

## configure http and https
lets say your domain name is mydomain

on your DNS, set A record to point to the EC2 instance for www and for @
the update will get some time to get through

verify that this has happened by starting nginx `sudo service nginx start` and connecting to EC2 from browser to mydomain.com

install letsencrypt
`sudo apt-get install letsencrypt`

A [letsencrypt instructions] [https://certbot.eff.org/#ubuntuxenial-nginx]

[https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04]


replace the folder and certificate names. this is for nginx

letsencrypt certonly --webroot -w /var/www/mydomain -d mydomain.com -d www.mydomain.com -w /var/www/myotherdomain -d myotherdomain.is -d m.myotherdomain.is

in sites-available/default, edit the root to point to /var/www/jointresearch
then add
location ~ /.well-known {
        allow all;
}
then run  

https://certbot.eff.org/#ubuntuxenial-nginx

`sudo letsencrypt certonly --webroot -w /var/www/jointresearch -d jointresearch.net -d www.jointresearch.net`

configure nginx
https://www.linode.com/docs/websites/nginx/how-to-configure-nginx


# Folder setup
create your main directory for the project <proj_main>

`mkdir proj_main`

create a folder for secret stuff
~~~~
cd proj
mkdir secret
~~~~

create the repository that will be under source control, or simply clone itfrom a git

`git clone xxx\proj`

`cd proj`

now we create the folder for server, web and mobile client

for server we simply do

~~~~
mkdir server
cd server
npm init
~~~~

for the web client (cd back to the proj_main folder):

~~~~
cd ..
create-react-app client

~~~~


and for the native apps:
`react-native init native`

after you do all this, your folder structure should look like this:
~~~~
README.md
client
native
server
.gitignore
~~~~

# Configuring gitignore

# managing cors
~~~~
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
~~~~

https://github.com/expressjs/cors

and remember to include credentials when using fetch
fetch('/api/v2/user/me', {
  method: "GET",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache': 'no-cache'
  },
  credentials: 'include'
})



# setup for production

set up certificate autorenewal
https://certbot.eff.org/#ubuntuxenial-nginx
run letsencrypt renew --dry-run --agree-tos
then add letsencrypt renew to a cron


A [setting up for prod instructuions] [https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04]

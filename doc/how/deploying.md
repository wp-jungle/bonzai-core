Deploying
=========

Your website files deployment are managed by [Shipit](https://github.com/shipitjs/grunt-shipit).

`grunt publish:<stage>` and `grunt undo-publish:<stage>` are the two main tasks used for publishing your site on your
staging or production environment.

When you start deploying, a new copy of your site will be cloned in the `tmp/workspace/` folder. Everything will be
build in this folder like normally, composer dependencies will be installed, your repository will be updated and the
versions of your application bumped ; and then, all the files in this folder, except thoses ignored in the shipit
config, will be copied via SSH/Rsync protocol.

Deployment pre-requisites
-------------------------

1. Your repository need a develop and master branch. Please always initiate a git flow before deploying.

2. You need a remote server where you added your public RSA key. We recommend a Plesk VPS.


Deploying files
---------------

1. Make sure your repository include a develop and a master branch, and checkout the develop branch to deploy.

2. Copy the file `bonzai/src/grunt/actions/shipit.js` to `config/bonzai/grunt/actions/shipit.js` and edit it
   according to your server configuration. Also make sure that the `ignore` array is properly configured : this is the
   file that should not be copied remotely.

3. Manually copy your `.env` file to your remote server into `shared/` folder in your `deploy_to` path (for each
   environment) (ex: `/srv/www/example.com/shared/.env` and `/srv/www/staging.example.com/shared/.env`).
   Remotely, you should remove all variables that start by `BONZAI_`.

4. Open PUTTY and create and save a new session for your VM (as host, you can use `localhost` and port 2222 and use this
   for all your VMs created via puphpet, or you can use the IP address you entered during the `construct` task).

5. Connect to the VM through PUTTY and navigate to your site using `cd /var/www`.

6. An important step to check before the first deploy is to add all the hosts your are going to use as known_hosts, or
   the first deploy will simply fail. `bitbucket.com` and `github.com` are already added by default in
   `puphpet/files/exec-once-unprivileged/git-config.sh`, but you should also add your others or custom hosts, like
   `git.yourdomain.com`.
   To do that, run the command: `ssh-keyscan git.yourdomain.com >> ~/.ssh/known_hosts`
   You should also make sure you can ssh to your remote: `ssh yourdomain.com`. It shouldn't ask you for a password,
   you have to use RSA_Keys instead !

7. Run the normal deploy command: `grunt publish:<stage>`.

8. Follow the prompts, specify versions to bump, edit the automatically changelog on the file, and more...

9. Enjoy one-command deploys!

Deploying database
------------------

There is actually no way to push your database on your remote because it useless to do a such thing. In practice, you
will only need to push your database live once. Then, the next times, you will just push the updated files, and keep
the database unchanged. So, if you really need to push a database from your local environment, I suggest you to buy
WP Migrate DB Pro plugin which do the job really well, with a great designed GUI.
However, Bonzai is already using WPMDB to pull the database from a remote to your local environment during the
`grunt construct task` so it allows you to pull in one single command an existing live project to get it locally
without doing anything. Alternatively, you can also pull the DB at any time by using the task `grunt wpmdb:pull`.

Running additional scripts on the remote server
-----------------------------------------------

You can run an sh script using a shell script that will be copied to your server and executed after the deployment has
been succesfully executed. This script has to be located in `config/bonzai/shell/post-deploy.sh`.


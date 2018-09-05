Getting started
===============

Fork Bonzai to a new project
-----------------------------

## Prepare your repository

1. Clone/Fork repo.

   `git clone --recursive git@github.com:wp-jungle/bonzai.git example.test`
   
   > Do not forget the `recursive` tag or sub-modules won't be initialised

2. Change origin remote.

   `git remote set-url origin https://github.com/USERNAME/YOURREPOSITORY.git`
   
3. Initiate a git flow.

4. Push to your repository the actual files from both branch.

5. If you have PHPStorm installed on your computer, you should now create a new project from files and select your
   project folder.


## Build / Construct Steps

1. Make sure you have all the [requirements](documentations/requirements.md) installed.

2. Copy your previously generated keys (`id_rsa.ppk`, `id_rsa`, `id_rsa.pub`) to `puphpet/files/dot/ssh/`
   inside your project folder (you may create the folders as they do not exist yet).

3. Run `npm install` to install Node dependencies.

4. Run `grunt construct` to build the site.
   > This task is a WP Site Wizard Installer that will guide you through the installation steps.
   > The first time you run `grunt construct`, you will be redirected to the `grunt construct:fork` task that will
   > prepare a configure all the directory structure to make your site work. If it's not the first time, i mean, if the
   > repository already contain a bonzai forked application, you will be redirected to the `grunt construct:local`
   > task that will just build the site locally, using the configuration set while forking.
   > The application is considered as not forked yet if the package name is `wp-bonzai` (in `package.json`).

5. Follow all the instructions to configure the VM and your Wordpress installation.

6. Once the installation started, you should take a cup of coffee or something. Everything, including your VM will be
   installed. It can take a while ...

7. Access your VM at `http://vm.{project slug}.test/`, and your site at `http://{project slug}.test/`
   `{project slug}` is the name of the domain/project you entered while forking.
   
8. Follow the instructions given on this page, and add the VM IP to your hosts file.

Build and construct a project already initiated from Bonzai
------------------------------------------------------------

Follow theses steps if you or someone else already initiated the project from a Bonzai Fork. This is usefull when you
are working as a team. Someone can create a project from Bonzai, put it online, deploy it to a webserver, and then give
the access to the repository to someone, and the site can be up locally in on single command, including the site files,
the database, and the media upload files. Awesome huh ? Okay, let's start !

1. Clone your repository
   `git clone --recursive git@github.com/USERNAME/YOURREPOSITORY.git`
   
2. This will normally check out the develop branch. Make sure you have both the develop and master branch or create it.

3. Open PHPStorm and create a project from PHP files, and select the folder where you cloned the project. You can
   exclude puphpet and database directories to get your computer a bit less laggy.
   
4. Copy your previously generated keys (`id_rsa.ppk`, `id_rsa`, `id_rsa.pub`) to `puphpet/files/dot/ssh/`
   inside your project folder.
   
5. Run `npm install`.

6. Run `grun construct` and follow the steps.

7. Note that if your teammate already deployed the site on staging environment, you can directly enter WPMDB datas to
   pull the database and images. Please, report to WPMDB-cli help or check your staging site WPMDB settings to get
   the correct URLs. Check the next section for more details on this step.
   
8. Open standard note block with UAC rights, then navigate to `C:\Windows\System32\drivers\etc` and open the `hosts`
   file. Make sure the IP is added for both `yourdomain.test` and `www.yourdomain.test`.


Pull database and medias files from the online project
------------------------------------------------------

> Note : Seems to be not working if you actviated on your remote an htpsswd authentication.

Follow theses steps if you already cloned your project and if you have a remote server with the project already deployed
to and active.

1. Go to your staging site -> admin -> tools -> WP Migrate DB Pro and make sure your Licence is active. Then, click the
   settings tab, and make sure pulling is activated.

2. Run `grunt wpmdb:pull`, and follow the steps.

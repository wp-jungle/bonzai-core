Grunt
=====

Using grunt tasks
-----------------

[Grunt](http://gruntjs.com/) is used to fire some task lists and commands.

You can find below the main tasks to use.

### Building site

#### `grunt construct`

> Should be called from host computer

This task will completely build your website on your local environment. The first time your run it from a fresh Bonzai
cloned repository, it will initate the `grunt construct:fork` task that will manage to initiate your site for the
first time. Then, when your site be installed, and everything pushed to your repository, another developer can pull the
site, and initiate an already pre-configured project. In this case, the `grunt construct:local` task will be called.
Because this task is a builder, it should be executed not more than one time per computer.

#### `grunt wpmdb:pull`

> Should be called from host computer

This task will automatize the process of installing WPMDB using your licence key, and will then lett you pull your
database and medias files from your site using WPMDB-cli and https protocol. Note that this task is integrated to
`grunt construct`, but it can also but called directly after your site is running if you did not installed it during
the construct task.

### Developing themes

#### `grunt themes-libs`

> Should be called from host computer

This task will compile all the bonzai-compatibles themes librairies.

#### `grunt themes-assets`

> Should be called from host computer

This task will compile all the bonzai-compatibles themes assets.

### Deploying online

#### `grunt publish:<stage>`

> Should be called from the VM, connected trough PUTTY, while in the `/var/www` folder

This task will completely deploy (or re-deploy) your website on the selected stage.

#### `grunt undo-publish:<stage>`

> Should be called from the VM, connected trough PUTTY, while in the `/var/www` folder

This task will rollback the last deployment for the selected stage.

Editing Grunt tasks
-------------------

As you can see in the main grunt file, Bonzai is using [load-grunt-config](https://github.com/firstandthird/load-grunt-config).
All the necessary tasks are included in the `bonzai/src/grunt` folder. If any case you wan't to modify or add some
new custom tasks, do not edit the bonzai folder ! You should instead simply copy the task you want to edit from
`bonzai/src/grunt/actions/copy.js` to `config/bonzai/grunt/actions/copy.js`. By default, both files will be merged
into one single array. You can change the merging behavior by using another merge processor in your load-grunt-config
array : `mergeFunction: require('recursive-merge')` (see load-grunt-config doc for more information).
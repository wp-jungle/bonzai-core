Vagrant
=======

Bonzai is using [Puphpet](https://puphpet.com/) and is already bundling all the necessary files to install it.
The virtual machine will be provisioned for the first time during the `grunt construct` task. Puphpet does not
actually allow us to include the package files as a git submodule, so we try to keep the files bundled in Bonzai as
the last Puphpet version.

Using Puphpet
-------------

Like any VM, just use those commands to use the VM :

+ `vagrant up`
+ `vagrant halt`
+ `vagrant destroy`

Custom local configuration
--------------------------

You need to know that the main Puphpet config file is located in `puphpet/config.yaml`. If you need to add a change
for your VM that concern your project and that should be changed for each developer, you should do it directly in
this file. But if you need for example to change a specific setting that concern only yourself, and not the others
developers, like changing the allowed memory used by the VM, you should do it in `config/puphpet/condig-override.yaml`.
Both files will be merged and you can adjust configs for your own use case without modifying the project (because the
file `config-override.yaml` is gitignored)

Updating Puphpet
----------------

Once you forked Puphpet for the first time, if required, you will need to update it by your own. Basically, it's really
simple, just follow thoses steps :

+ Make sure your VM if not running
+ Copy the content of the file `puphpet/config.yaml` and paste it on the [puphpet.com](https://puphpet.com/) page
+ Regenerate and download the archive
+ Delete the puphpet folder except what you eventually modified in it. You should also do not delete theses files :
  - `puphpet/files/dot/ssh/id_rsa`
  - `puphpet/files/dot/ssh/id_rsa.pub`
  - every file located in `puphpet/files/[exec-* | startup-*]`
* Extract all the others files from the puphpet archive
* In the archive, you will also find some files at the root, like `Vagrantfile`, `.gitignore`, `.gitattributes`. Make
  sure that anything changed in thoses files, or manually add the changes.
* Run `vagrant up --provision`

Requirements
============

This stack include a Vagrant Box, so most of the tools are already included, but you can find there a short list of what
you will need and the versions we tested. Make sure you have everything installed and up to date.

* [Windows 10 tools](#windows-10-tools)
  - [Putty](#putty)
  - [Git](#git)
  - [SourceTree](#sourcetree)
  - [PHPStorm](#phpstorm)
* [Ruby](#ruby) 2.2.5
* [VirtualBox](#virtualBox) 5.1.0
* [Vagrant and plugins](#Vagrant) 1.8.6
* [NodeJS](#NodeJS) 5.11.0
  - [Grunt-Cli](#Grunt) 1.2.0
* [Ubuntu/Debian server](#Live-Server)

Windows 10 tools
----------------

Developing on Windows can be a bit hard, but not when you know which bunch of tools you have to use.

> This WP-Stack is untested on others OS, but it should work. Let us know if you can perform some tests on others
> OS (MAC, LINUX).

### Putty

#### Download Putty

Check the [Putty download page](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) and download the
following tools in your home folder, eg. `C:\Users\Username\Apps\Putty\`

- PuTTY
- Plink
- Pageant
- PuTTYgen

#### Generate your RSA Key

- Execute `puttygen.exe`
- Click `generate`
- Move your mouse quickly in the blank area
- Enter a key comment (your main email or something to recognize the key)
- Enter a key passphrase (remind the password in your head only, this is really private key that belongs to you only)
- Confirm the passphrase
- Click on `Save private key` and save it to `C:\Users\Username\.ssh\id_rsa.ppk`
- Click on `conversions` top menu, then `export OpenSSH key` and save id to `C:\Users\Username\.ssh\id_rsa`
- You can also copy the `public key for pasting into OpenSSh authorize_keys file` into the file
  `C:\Users\Username\.ssh\id_rsa.pub`, this is the only file that you should share or add to Github, or to your live
  server.

#### Configure Plink

Press your keyboard Windows button and type `environment` and click on `edit environment variables for your account`.
Add a variable `GIT_SSH` with the value `C:\Users\Username\Apps\Putty\plink.exe`

#### Configure Pageant

You certainly wan't your key to be loaded on each Windows startup.

Press your keyboard Windows button and type `execute` and click on the shown link, then enter `shell:startup` and click
`OK`. In the window that just showed up, `right click -> new -> shortcut`. In the target field, enter
`C:\Users\Username\Apps\Putty\pageant.exe C:\Users\Username\.ssh\id_rsa.ppk`.

### Git

Git installation instructions for UNIX OS can already be found everywhere on the web. We will just add there quick notes
for Windows users.

- Download and execute [Msysgit](https://git-for-windows.github.io/)
- During installation, make sure that on the step `choosing SSH executable`, you select your `plink.exe` executable,
  like showed in [this thread](http://stackoverflow.com/questions/2985074/configure-git-to-use-plink).

> You should give main executable UAC rights (`C:\Program Files\Git\bin\sh.exe`)

### SourceTree

We also recommend free [SourceTree](http://www.sourcetreeapp.com/) for managing your repositories.

### PHPStorm

We also recommend premium [PHPStorm](https://www.jetbrains.com/phpstorm/) to manage your projects.
Once installed, go to `file -> Settings -> Tools -> Terminal` and in the `shell path` field, enter the path where
you installed git. It should looks like `C:\Program Files\Git\bin\sh.exe`

> You should give main executable UAC rights

Ruby
----

Follow the installation procedure depending on your OS:

- [Ruby for UNIX](https://www.ruby-lang.org/en/downloads/)
- [Ruby for windows](http://rubyinstaller.org/)

You also need to install RubyGems:

- [RubyGems for UNIX](https://rubygems.org/pages/download)
- RubyGems for Windows
  - Check your ruby version: `Start -> Run` and type in cmd to open a windows console as administrator
  - Type in `ruby -v`
  - You will get something like that: `ruby 2.x.x (xxxx-xx-xx) [i386-mingw32]` depending on the version you
    installed
  - Download and install DevelopmentKit from the same download page as Ruby Installer. Choose an ?exe file corresponding
    to your environment (32 bits or 64 bits and working with your version of Ruby).
  - Follow the [installation instructions for DevelopmentKit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
    Adapt it for Windows.
  - After installing DevelopmentKit you can install all needed gems by just running from the command prompt (windows
  console or terminal): gem install {gem name}. For example, to install rails, just run gem install rails.

VirtualBox
----------

Check the [VirtualBox download page](https://www.virtualbox.org/wiki/Downloads) and download and install the main
software and the related extension pack. A reboot is required after installation.

> You should give main executable UAC rights

Vagrant
-------

Check the installation procedure on the [Vagrant](http://www.vagrantup.com/) site and reboot after installation.
Then, open a command prompt as administrator, and type the two following commands :
```
$ vagrant plugin install vagrant-hostmanager
$ vagrant plugin install vagrant-triggers
$ vagrant plugin install vagrant-bindfs
```

NodeJS
------

[NodeJS](http://nodejs.org/) isn't hard to install too. Just visit their website, download and install.

### Grunt

And last but not least, Grunt. Like bower it is installed with `npm`. It's all done with this command:
`npm install -g grunt-cli`.

Live Server
-----------

You must own a dedicated server, a VPS, or a host that allow you to communicate through `SSH` and `Rsync` protocols.